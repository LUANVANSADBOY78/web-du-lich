using Microsoft.AspNetCore.Http;
using StudentManagement.Models;
using StudentManagement.Repositories;
using static StudentManagement.DTOs.FileUploadDbDto;

namespace StudentManagement.Services;

public class FileService : IFileService
{
    private readonly IFileRepository _fileRepository;
    private const long MaxFileSizeInBytes = 1 * 1024 * 1024; // 1 MB = 1,048,576 bytes

    public FileService(IFileRepository fileRepository)
    {
        _fileRepository = fileRepository;
    }

    public async Task<FileResponseDto> UploadFileAsync(IFormFile file)
    {
        if (file == null || file.Length == 0)
            throw new ArgumentException("File không hợp lệ.");

        if (file.Length > MaxFileSizeInBytes)
            throw new ArgumentException("Dung lượng file vượt quá giới hạn cho phép (tối đa 1MB).");

        var fileName = Path.GetFileName(file.FileName);

        // 1. Kiểm tra trùng tên file đã có trong hệ thống
        if (await _fileRepository.ExistsByNameAsync(fileName))
            throw new InvalidOperationException($"File '{fileName}' đã tồn tại trong hệ thống. Vui lòng đổi tên file hoặc kiểm tra lại.");

        using var memoryStream = new MemoryStream();
        await file.CopyToAsync(memoryStream);
        var fileContent = memoryStream.ToArray();

        // 2. Kiểm tra trùng nội dung file (dữ liệu nhị phân)
        if (await _fileRepository.ExistsByContentAsync(file.Length, fileContent))
            throw new InvalidOperationException("Nội dung file này đã tồn tại trên hệ thống (file trùng lặp).");

        var storedFile = new StoredFile
        {
            FileName = fileName,
            ContentType = file.ContentType,
            Content = fileContent,
            Length = file.Length
        };

        var createdFile = await _fileRepository.AddAsync(storedFile);

        return new FileResponseDto
        {
            Id = createdFile.Id,
            FileName = createdFile.FileName,
            Size = createdFile.Length,
            UploadedAt = createdFile.UploadedAt
        };
    }

    public async Task<FileDownloadDto?> GetFileForDownloadAsync(int id)
    {
        var file = await _fileRepository.GetByIdAsync(id);
        if (file == null) return null;

        return new FileDownloadDto
        {
            Content = file.Content,
            ContentType = file.ContentType,
            FileName = file.FileName
        };
    }
}
