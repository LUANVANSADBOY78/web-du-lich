using StudentManagement.Models;

namespace StudentManagement.Repositories;

public interface IFileRepository
{
    Task<StoredFile> AddAsync(StoredFile file);
    Task<StoredFile?> GetByIdAsync(int id);
    Task<bool> ExistsByNameAsync(string fileName);
    Task<bool> ExistsByContentAsync(long length, byte[] content);
}
