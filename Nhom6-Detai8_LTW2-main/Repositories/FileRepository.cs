using Microsoft.EntityFrameworkCore;
using StudentManagement.Data;
using StudentManagement.Models;

namespace StudentManagement.Repositories;

public class FileRepository : IFileRepository
{
    private readonly AppDbContext _context;

    public FileRepository(AppDbContext context)
    {
        _context = context;
    }

    public async Task<StoredFile> AddAsync(StoredFile file)
    {
        await _context.StoredFiles.AddAsync(file);
        await _context.SaveChangesAsync();
        return file;
    }

    public async Task<StoredFile?> GetByIdAsync(int id)
    {
        return await _context.StoredFiles.FindAsync(id);
    }

    public async Task<bool> ExistsByNameAsync(string fileName)
    {
        return await _context.StoredFiles.AnyAsync(f => f.FileName.ToLower() == fileName.ToLower());
    }

    public async Task<bool> ExistsByContentAsync(long length, byte[] content)
    {
        // Kiểm tra xem đã có file nào trùng kích thước và trùng toàn bộ nội dung nhị phân chưa
        return await _context.StoredFiles.AnyAsync(f => f.Length == length && f.Content == content);
    }
}
