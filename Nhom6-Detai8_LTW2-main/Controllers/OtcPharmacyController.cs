using System.Security.Claims;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using StudentManagement.DTOs;
using StudentManagement.Services;

namespace StudentManagement.Controllers;

[ApiController]
[Route("api/otc")]
public class OtcPharmacyController : ControllerBase
{
    private readonly IOtcPharmacyService pharmacyService;

    public OtcPharmacyController(IOtcPharmacyService pharmacyService)
    {
        this.pharmacyService = pharmacyService;
    }

    /// <summary>
    /// Lấy danh mục thuốc không kê đơn (OTC).
    /// </summary>
    [HttpGet("products")]
    [AllowAnonymous]
    public async Task<ActionResult<List<OtcProductDto>>> GetProducts([FromQuery] string? category = null, [FromQuery] string? search = null)
    {
        var products = await pharmacyService.GetProductsAsync(category, search);
        return Ok(products);
    }

    /// <summary>
    /// Lấy thông tin chi tiết một sản phẩm thuốc OTC.
    /// </summary>
    [HttpGet("products/{id:int}")]
    [AllowAnonymous]
    public async Task<ActionResult<OtcProductDto>> GetProductById(int id)
    {
        var product = await pharmacyService.GetProductByIdAsync(id);
        if (product == null) return NotFound(new { message = $"Không tìm thấy sản phẩm OTC có mã #{id}." });
        return Ok(product);
    }

    /// <summary>
    /// Đặt mua thuốc không kê đơn OTC (Có áp dụng điểm thưởng RewardPoints).
    /// </summary>
    [HttpPost("orders")]
    [AllowAnonymous]
    public async Task<ActionResult<OtcOrderResponseDto>> CreateOrder([FromBody] CreateOtcOrderDto dto)
    {
        try
        {
            int? userId = null;
            if (User?.Identity?.IsAuthenticated == true && int.TryParse(User.FindFirstValue(ClaimTypes.NameIdentifier), out var uid))
            {
                userId = uid;
            }

            var order = await pharmacyService.CreateOrderAsync(dto, userId);
            return Ok(order);
        }
        catch (ArgumentException ex) { return BadRequest(new { message = ex.Message }); }
        catch (InvalidOperationException ex) { return Conflict(new { message = ex.Message }); }
    }

    /// <summary>
    /// Bệnh nhân xem lịch sử đơn thuốc OTC của chính mình.
    /// </summary>
    [HttpGet("orders/my")]
    [Authorize]
    public async Task<ActionResult<List<OtcOrderResponseDto>>> GetMyOrders()
    {
        var userId = int.Parse(User.FindFirstValue(ClaimTypes.NameIdentifier)!);
        var orders = await pharmacyService.GetMyOrdersAsync(userId);
        return Ok(orders);
    }

    /// <summary>
    /// Quản trị viên / Lễ tân xem toàn bộ đơn thuốc OTC.
    /// </summary>
    [HttpGet("orders")]
    [Authorize(Roles = "Admin,Receptionist")]
    public async Task<ActionResult<List<OtcOrderResponseDto>>> GetAllOrders()
    {
        var orders = await pharmacyService.GetAllOrdersAsync();
        return Ok(orders);
    }
}

