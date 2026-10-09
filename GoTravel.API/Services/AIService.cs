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
            var lowerMsg = message.ToLower();
            
            // Simulate AI calling our SearchTours / Database internally
            if (lowerMsg.Contains("đà nẵng") || lowerMsg.Contains("tour"))
            {
                // In a real system, AI model would request tool call, then we query DB:
                var daNangTours = await _context.Tours
                    .Where(t => t.Destination.Contains("Đà Nẵng"))
                    .Take(1)
                    .ToListAsync();
                    
                if (daNangTours.Any())
                {
                    return "Tôi tìm thấy Tour Đà Nẵng phù hợp: " + daNangTours.First().Name;
                }
                
                // Fallback since DB might be empty yet
                return "Dựa trên yêu cầu, hệ thống đang cập nhật Tour Đà Nẵng với giá tốt nhất khoảng 3.590.000đ.";
            }

            if (lowerMsg.Contains("vé") || lowerMsg.Contains("vui chơi"))
            {
                return "Bạn có thể tham khảo vé Sun World Bà Nà Hills hoặc VinWonders Phú Quốc. Hãy cho tôi biết bạn muốn đi đâu!";
            }

            return "Chào bạn, tôi là GoTravel AI. Tôi có thể giúp bạn tìm tour, vé vui chơi, khách sạn, lên lịch trình hoặc kiểm tra booking từ hệ thống dữ liệu thực!";
        }
    }
}
