using Microsoft.EntityFrameworkCore;
using StudentManagement.Data;
using StudentManagement.DTOs;
using StudentManagement.Models;

namespace StudentManagement.Services;

public class OtcPharmacyService : IOtcPharmacyService
{
    private readonly AppDbContext context;
    private readonly IAuditLogService auditLogService;

    public OtcPharmacyService(AppDbContext context, IAuditLogService auditLogService)
    {
        this.context = context;
        this.auditLogService = auditLogService;
    }

    public async Task<List<OtcProductDto>> GetProductsAsync(string? category = null, string? search = null)
    {
        var query = context.OtcProducts.AsNoTracking().Where(p => p.IsActive);

        if (!string.IsNullOrWhiteSpace(category))
        {
            var cat = category.Trim().ToLower();
            query = query.Where(p => p.Category.ToLower().Contains(cat));
        }

        if (!string.IsNullOrWhiteSpace(search))
        {
            var s = search.Trim().ToLower();
            query = query.Where(p => p.Name.ToLower().Contains(s) || p.Description.ToLower().Contains(s));
        }

        var products = await query.OrderBy(p => p.Category).ThenBy(p => p.Name).ToListAsync();
        return products.Select(ToDto).ToList();
    }

    public async Task<OtcProductDto?> GetProductByIdAsync(int id)
    {
        var product = await context.OtcProducts.AsNoTracking().FirstOrDefaultAsync(p => p.Id == id && p.IsActive);
        return product == null ? null : ToDto(product);
    }

    public async Task<OtcOrderResponseDto> CreateOrderAsync(CreateOtcOrderDto dto, int? userId = null)
    {
        if (dto.Items == null || dto.Items.Count == 0)
            throw new ArgumentException("Đơn hàng phải có ít nhất một sản phẩm.");

        var productIds = dto.Items.Select(i => i.ProductId).Distinct().ToList();
        var products = await context.OtcProducts.Where(p => productIds.Contains(p.Id) && p.IsActive).ToListAsync();

        if (products.Count != productIds.Count)
            throw new ArgumentException("Một số sản phẩm không tồn tại hoặc đã ngừng kinh doanh.");

        // Kiểm tra tồn kho và tính tổng
        decimal subTotal = 0;
        var orderItems = new List<OtcOrderItem>();

        foreach (var item in dto.Items)
        {
            var prod = products.First(p => p.Id == item.ProductId);
            if (prod.Stock < item.Quantity)
                throw new InvalidOperationException($"Sản phẩm '{prod.Name}' chỉ còn {prod.Stock} trong kho.");

            prod.Stock -= item.Quantity; // Trừ kho
            var itemTotal = prod.Price * item.Quantity;
            subTotal += itemTotal;

            orderItems.Add(new OtcOrderItem
            {
                OtcProductId = prod.Id,
                ProductName = prod.Name,
                Quantity = item.Quantity,
                UnitPrice = prod.Price,
                TotalPrice = itemTotal
            });
        }

        // Xử lý điểm thưởng (Loyalty Points)
        int pointsUsed = 0;
        decimal discountAmount = 0;
        User? user = null;
        Patient? patient = null;

        if (userId.HasValue && userId.Value > 0)
        {
            user = await context.Users.FindAsync(userId.Value);
            patient = await context.Patients.FirstOrDefaultAsync(p => p.UserId == userId.Value);

            if (dto.PointsToUse > 0 && user != null)
            {
                // Mỗi 1 điểm = 1.000 VNĐ giảm giá
                var maxPointsCanUse = Math.Min(user.RewardPoints, (int)(subTotal / 1000m));
                pointsUsed = Math.Min(dto.PointsToUse, maxPointsCanUse);
                discountAmount = pointsUsed * 1000m;

                user.RewardPoints -= pointsUsed;
                if (patient != null) patient.RewardPoints = user.RewardPoints;
            }
        }

        decimal finalAmount = Math.Max(0, subTotal - discountAmount);

        // Quy tắc: Cứ thanh toán 100.000 VNĐ tự động cộng 1 điểm tích lũy
        int pointsEarned = (int)(finalAmount / 100000m);
        if (pointsEarned > 0 && user != null)
        {
            user.RewardPoints += pointsEarned;
            if (patient != null) patient.RewardPoints = user.RewardPoints;
        }

        var order = new OtcOrder
        {
            UserId = userId,
            CustomerName = dto.CustomerName.Trim(),
            CustomerPhone = dto.CustomerPhone.Trim(),
            DeliveryAddress = dto.DeliveryAddress.Trim(),
            SubTotal = subTotal,
            PointsUsed = pointsUsed,
            DiscountAmount = discountAmount,
            TotalAmount = finalAmount,
            PointsEarned = pointsEarned,
            PaymentMethod = string.IsNullOrWhiteSpace(dto.PaymentMethod) ? "COD" : dto.PaymentMethod.Trim(),
            Status = "Paid",
            CreatedAt = DateTime.Now,
            Items = orderItems
        };

        context.OtcOrders.Add(order);
        await context.SaveChangesAsync();

        await auditLogService.LogAsync(
            "CREATE_OTC_ORDER",
            user?.Username ?? dto.CustomerName,
            user?.Role ?? "Guest",
            $"Tạo đơn thuốc OTC #{order.Id}, Tổng tiền: {finalAmount:N0} VNĐ, Điểm dùng: {pointsUsed}, Điểm tích: +{pointsEarned}");

        return ToOrderResponse(order);
    }

    public async Task<List<OtcOrderResponseDto>> GetMyOrdersAsync(int userId)
    {
        var orders = await context.OtcOrders
            .Include(o => o.Items)
            .Where(o => o.UserId == userId)
            .OrderByDescending(o => o.CreatedAt)
            .ToListAsync();

        return orders.Select(ToOrderResponse).ToList();
    }

    public async Task<List<OtcOrderResponseDto>> GetAllOrdersAsync()
    {
        var orders = await context.OtcOrders
            .Include(o => o.Items)
            .OrderByDescending(o => o.CreatedAt)
            .ToListAsync();

        return orders.Select(ToOrderResponse).ToList();
    }

    private static OtcProductDto ToDto(OtcProduct p) => new()
    {
        Id = p.Id,
        Name = p.Name,
        Category = p.Category,
        Price = p.Price,
        Unit = p.Unit,
        Description = p.Description,
        Usage = p.Usage,
        Manufacturer = p.Manufacturer,
        Stock = p.Stock,
        IsActive = p.IsActive,
        ImageUrl = p.ImageUrl
    };

    private static OtcOrderResponseDto ToOrderResponse(OtcOrder o) => new()
    {
        Id = o.Id,
        UserId = o.UserId,
        CustomerName = o.CustomerName,
        CustomerPhone = o.CustomerPhone,
        DeliveryAddress = o.DeliveryAddress,
        SubTotal = o.SubTotal,
        PointsUsed = o.PointsUsed,
        DiscountAmount = o.DiscountAmount,
        TotalAmount = o.TotalAmount,
        PointsEarned = o.PointsEarned,
        PaymentMethod = o.PaymentMethod,
        Status = o.Status,
        CreatedAt = o.CreatedAt,
        Items = o.Items.Select(i => new OtcOrderItemDto
        {
            Id = i.Id,
            OtcProductId = i.OtcProductId,
            ProductName = i.ProductName,
            Quantity = i.Quantity,
            UnitPrice = i.UnitPrice,
            TotalPrice = i.TotalPrice
        }).ToList()
    };
}

