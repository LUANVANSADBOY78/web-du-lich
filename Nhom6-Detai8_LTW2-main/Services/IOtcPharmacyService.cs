using StudentManagement.DTOs;
using StudentManagement.Models;

namespace StudentManagement.Services;

public interface IOtcPharmacyService
{
    Task<List<OtcProductDto>> GetProductsAsync(string? category = null, string? search = null);
    Task<OtcProductDto?> GetProductByIdAsync(int id);
    Task<OtcOrderResponseDto> CreateOrderAsync(CreateOtcOrderDto dto, int? userId = null);
    Task<List<OtcOrderResponseDto>> GetMyOrdersAsync(int userId);
    Task<List<OtcOrderResponseDto>> GetAllOrdersAsync();
}

