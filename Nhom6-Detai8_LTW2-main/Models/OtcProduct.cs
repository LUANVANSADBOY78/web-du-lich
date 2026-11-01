namespace StudentManagement.Models;

public class OtcProduct
{
    public int Id { get; set; }
    public string Name { get; set; } = string.Empty;
    public string Category { get; set; } = string.Empty; // "Giảm đau - Hạ sốt", "Tiêu hóa", "Tai Mũi Họng", "Vitamin", v.v.
    public decimal Price { get; set; }
    public string Unit { get; set; } = "Hộp";
    public string Description { get; set; } = string.Empty;
    public string Usage { get; set; } = string.Empty;
    public string Manufacturer { get; set; } = string.Empty;
    public int Stock { get; set; } = 100;
    public bool IsActive { get; set; } = true;
    public bool IsOtcOnly { get; set; } = true; // Thuốc không kê đơn (OTC)
    public string ImageUrl { get; set; } = string.Empty;
}

