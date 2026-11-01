using System.Text.Json.Serialization;

namespace StudentManagement.Models;

public class OtcOrder
{
    public int Id { get; set; }
    public int? UserId { get; set; }
    public string CustomerName { get; set; } = string.Empty;
    public string CustomerPhone { get; set; } = string.Empty;
    public string DeliveryAddress { get; set; } = string.Empty;
    public decimal SubTotal { get; set; }
    public int PointsUsed { get; set; } = 0;
    public decimal DiscountAmount { get; set; } = 0;
    public decimal TotalAmount { get; set; }
    public int PointsEarned { get; set; } = 0;
    public string PaymentMethod { get; set; } = "COD"; // COD, Transfer, Cash
    public string Status { get; set; } = "Paid"; // Paid, Pending, Cancelled
    public DateTime CreatedAt { get; set; } = DateTime.Now;

    public List<OtcOrderItem> Items { get; set; } = new();

    [JsonIgnore]
    public User? User { get; set; }
}

public class OtcOrderItem
{
    public int Id { get; set; }
    public int OtcOrderId { get; set; }
    public int OtcProductId { get; set; }
    public string ProductName { get; set; } = string.Empty;
    public int Quantity { get; set; }
    public decimal UnitPrice { get; set; }
    public decimal TotalPrice { get; set; }

    [JsonIgnore]
    public OtcOrder? Order { get; set; }

    [JsonIgnore]
    public OtcProduct? Product { get; set; }
}

