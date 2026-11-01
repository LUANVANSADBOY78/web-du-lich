using System.ComponentModel.DataAnnotations;

namespace StudentManagement.DTOs;

public class OtcProductDto
{
    public int Id { get; set; }
    public string Name { get; set; } = string.Empty;
    public string Category { get; set; } = string.Empty;
    public decimal Price { get; set; }
    public string Unit { get; set; } = "Hộp";
    public string Description { get; set; } = string.Empty;
    public string Usage { get; set; } = string.Empty;
    public string Manufacturer { get; set; } = string.Empty;
    public int Stock { get; set; } = 100;
    public bool IsActive { get; set; } = true;
    public string ImageUrl { get; set; } = string.Empty;
}

public class CreateOtcOrderItemDto
{
    [Range(1, int.MaxValue)]
    public int ProductId { get; set; }

    [Range(1, 100)]
    public int Quantity { get; set; }
}

public class CreateOtcOrderDto
{
    [Required, StringLength(120)]
    public string CustomerName { get; set; } = string.Empty;

    [Required, Phone]
    public string CustomerPhone { get; set; } = string.Empty;

    [Required, StringLength(250)]
    public string DeliveryAddress { get; set; } = string.Empty;

    public string PaymentMethod { get; set; } = "COD"; // "COD", "Transfer", "Cash"

    public int PointsToUse { get; set; } = 0;

    [Required, MinLength(1)]
    public List<CreateOtcOrderItemDto> Items { get; set; } = new();
}

public class OtcOrderResponseDto
{
    public int Id { get; set; }
    public int? UserId { get; set; }
    public string CustomerName { get; set; } = string.Empty;
    public string CustomerPhone { get; set; } = string.Empty;
    public string DeliveryAddress { get; set; } = string.Empty;
    public decimal SubTotal { get; set; }
    public int PointsUsed { get; set; }
    public decimal DiscountAmount { get; set; }
    public decimal TotalAmount { get; set; }
    public int PointsEarned { get; set; }
    public string PaymentMethod { get; set; } = string.Empty;
    public string Status { get; set; } = string.Empty;
    public DateTime CreatedAt { get; set; }
    public List<OtcOrderItemDto> Items { get; set; } = new();
}

public class OtcOrderItemDto
{
    public int Id { get; set; }
    public int OtcProductId { get; set; }
    public string ProductName { get; set; } = string.Empty;
    public int Quantity { get; set; }
    public decimal UnitPrice { get; set; }
    public decimal TotalPrice { get; set; }
}

