using GoTravel.API.Data;
using GoTravel.API.Entities;
using Microsoft.EntityFrameworkCore;
using System.Text.Json;

namespace GoTravel.API.Services
{
    public class AIService : IAIService
    {
        private readonly GoTravelDbContext _context;
        private readonly IConfiguration _configuration;
        private readonly ILogger<AIService> _logger;
        private readonly string _apiKey;

        public AIService(GoTravelDbContext context, IConfiguration configuration, ILogger<AIService> logger)
        {
            _context = context;
            _configuration = configuration;
            _logger = logger;
            
            // Get from environment or appsettings safely
            _apiKey = _configuration["AI:ApiKey"] ?? Environment.GetEnvironmentVariable("AI_API_KEY") ?? "";
            
            if (string.IsNullOrEmpty(_apiKey))
            {
                _logger.LogWarning("AI_API_KEY is not configured.");
            }
        }

        public async Task<string> GetChatResponseAsync(string message, int conversationId)
        {
            var trimmed = message.Trim();
            var lowerMsg = trimmed.ToLower();

            // 1. Math solver (e.g., 1+1, 2*5, 100/4)
            var mathMatch = System.Text.RegularExpressions.Regex.Match(trimmed, @"^(\d+(\.\d+)?)\s*([\+\-\*\/xX÷])\s*(\d+(\.\d+)?)\s*(\?|bằng mấy|bằng bao nhiêu)?$");
            if (mathMatch.Success)
            {
                double n1 = double.Parse(mathMatch.Groups[1].Value);
                string op = mathMatch.Groups[3].Value;
                double n2 = double.Parse(mathMatch.Groups[4].Value);
                double res = 0;
                if (op == "+" || op == "cộng") res = n1 + n2;
                else if (op == "-" || op == "trừ") res = n1 - n2;
                else if (op == "*" || op == "x" || op == "X" || op == "nhân") res = n1 * n2;
                else if (op == "/" || op == "÷" || op == "chia") res = n2 != 0 ? n1 / n2 : 0;

                return $"Dạ, kết quả của phép tính {n1} {op} {n2} = **{res}** bạn nhé! 😊 Ngoài tính toán, tôi là Trợ lý AI Du lịch GoTravel, có thể tư vấn chi phí tour, vé máy bay và lịch trình trọn gói cho bạn!";
            }

            if (lowerMsg.Contains("1+1") || lowerMsg.Contains("1 + 1"))
            {
                return "Dạ, **1 + 1 = 2** bạn nhé! 😄 Bạn có muốn mình tính toán chi phí tour hoặc tư vấn chuyến đi nào cho 2 người (1+1) không ạ?";
            }

            // 2. Greetings
            if (System.Text.RegularExpressions.Regex.IsMatch(lowerMsg, @"^(xin chào|chào|hello|hi|alo|chào bạn|chào ad)"))
            {
                return "Xin chào quý khách! Tôi là AI Travel Assistant từ GoTravel. Tôi có thể hỗ trợ bạn tìm Tour du lịch, tra cứu vé vui chơi (Bà Nà, VinWonders), tính toán chi phí chuyến đi và đọc các bài cẩm nang du lịch hữu ích!";
            }

            // 3. Guides & Articles (iVIVU style)
            if (lowerMsg.Contains("cẩm nang") || lowerMsg.Contains("bài viết") || lowerMsg.Contains("đánh giá") || lowerMsg.Contains("kinh nghiệm") || lowerMsg.Contains("ivivu"))
            {
                return "GoTravel có chuyên mục Cẩm Nang Du Lịch & Đánh Giá Thực Tế (tương tự cẩm nang iVIVU) tổng hợp review 5 sao từ du khách, kinh nghiệm ăn chơi và lịch trình check-in từ A-Z. Bạn có thể bấm vào mục 'Cẩm Nang' trên thanh điều hướng để xem chi tiết nhé!";
            }

            // 4. Tour search in DB
            if (lowerMsg.Contains("đà nẵng") || lowerMsg.Contains("bà nà") || lowerMsg.Contains("hội an"))
            {
                var daNangTours = await _context.Tours
                    .Where(t => t.Name.Contains("Đà Nẵng") || t.Name.Contains("Bà Nà"))
                    .Take(2)
                    .ToListAsync();
                    
                if (daNangTours.Any())
                {
                    return $"Tôi tìm thấy Tour phù hợp: **{daNangTours.First().Name}** với giá ưu đãi chỉ từ {daNangTours.First().AdultPrice:N0} VNĐ. Tour bao gồm vé cáp treo Bà Nà Hills và buffet ẩm thực.";
                }
                
                return "GoTravel hiện có chùm Tour Đà Nẵng - Hội An - Bà Nà Hills 4N3Đ trọn gói với giá 4.990.000đ, tặng kèm vé cáp treo Cầu Vàng.";
            }

            if (lowerMsg.Contains("phú quốc") || lowerMsg.Contains("hòn thơm"))
            {
                return "Tour Phú Quốc 3N2Đ Cano 4 Đảo & Cáp Treo Hòn Thơm hiện có giá chỉ 3.890.000đ/khách, đã bao gồm khách sạn 4 sao gần biển và bữa trưa hải sản tươi sống.";
            }

            if (lowerMsg.Contains("hàn quốc") || lowerMsg.Contains("nhật"))
            {
                return "GoTravel đang triển khai tour Đông Bắc Á mùa thu lá đỏ:\n• **Tour Hàn Quốc 5N4Đ (Seoul - Nami - Everland)**: 15.890.000đ\n• **Tour Nhật Bản 6N5Đ Cung Đường Vàng (Tokyo - Phú Sĩ - Kyoto - Osaka)**: 34.900.000đ bay Vietnam Airlines.";
            }

            if (lowerMsg.Contains("vé") || lowerMsg.Contains("vui chơi") || lowerMsg.Contains("cáp treo"))
            {
                return "Bạn có thể tham khảo vé điện tử chính hãng quét mã QR tức thì:\n• **Vé Sun World Bà Nà Hills**: từ 900.000đ (Tặng Buffet)\n• **Vé VinWonders & Safari Phú Quốc**: từ 650.000đ\n• **Vé Cáp Treo Fansipan Legend**: từ 820.000đ.";
            }

            return $"Tôi đã tiếp nhận câu hỏi của bạn về: \"{trimmed}\". Tôi là trợ lý du lịch ảo thông minh của GoTravel, có thể giúp bạn giải đáp thắc mắc, gợi ý tour hợp ngân sách, đặt vé vui chơi hoặc hỗ trợ đổi trả vé 24/7. Bạn cần tôi hỗ trợ thêm thông tin gì nhé?";
        }
    }
}
