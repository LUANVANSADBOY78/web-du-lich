using Microsoft.AspNetCore.Mvc;
using StudentManagement.Services;
using static StudentManagement.DTOs.FileUploadDbDto;

namespace StudentManagement.Controllers;

[Route("api/[controller]")]
[ApiController]
public class FilesController : ControllerBase
{
    private readonly IFileService _fileService;

    public FilesController(IFileService fileService)
    {
        _fileService = fileService;
    }

    [HttpPost("upload")]
    [Consumes("multipart/form-data")]
    public async Task<IActionResult> Upload([FromForm] UploadFileDto dto)
    {
        try
        {
            var result = await _fileService.UploadFileAsync(dto.File);
            return Ok(result);
        }
        catch (ArgumentException ex)
        {
            return BadRequest(ex.Message);
        }
        catch (InvalidOperationException ex)
        {
            return BadRequest(ex.Message);
        }
    }

    [HttpGet("{id}")]
    [Produces("application/octet-stream", "image/png", "image/jpeg", "application/pdf")]
    public async Task<IActionResult> Download(string id)
    {
        if (string.IsNullOrWhiteSpace(id) || !int.TryParse(id.Trim(), out var fileId))
            return BadRequest("Mã file (id) phải là số nguyên hợp lệ.");

        var fileDto = await _fileService.GetFileForDownloadAsync(fileId);

        if (fileDto == null)
            return NotFound("Không tìm thấy file yêu cầu.");

        // Luôn trả về kèm fileDto.FileName để trình duyệt và Swagger UI kích hoạt chế độ tải file xuống (Download file)
        return File(fileDto.Content, fileDto.ContentType, fileDto.FileName);
    }
}
