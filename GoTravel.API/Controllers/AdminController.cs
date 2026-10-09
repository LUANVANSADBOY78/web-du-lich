using GoTravel.API.Data;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace GoTravel.API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AdminController : ControllerBase
    {
        private readonly GoTravelDbContext _context;

        public AdminController(GoTravelDbContext context)
        {
            _context = context;
        }

        [HttpGet("dashboard/summary")]
        public async Task<IActionResult> GetDashboardSummary()
        {
            // Real data from existing tables
            var totalTours = await _context.Tours.CountAsync();
            var totalUsers = await _context.Users.CountAsync();
            var totalDestinations = await _context.Destinations.CountAsync();
            var totalAiChats = await _context.ChatConversations.CountAsync();

            // Mock data for tables we haven't created EF models for yet (to satisfy the complex dashboard UI)
            var summary = new
            {
                revenue = new
                {
                    today = 45500000,
                    month = 1250000000,
                    year = 15400000000
                },
                bookings = new
                {
                    today = 24,
                    month = 850
                },
                inventory = new
                {
                    activeTours = totalTours > 0 ? totalTours : 45,
                    soldOutTours = 3,
                    upcomingTours = 12,
                    ticketsSold = 1250,
                    hotelRoomsAvailable = 450
                },
                customers = new
                {
                    total = totalUsers > 0 ? totalUsers : 15200,
                    newToday = 15,
                    returning = 45
                },
                ai = new
                {
                    totalConversations = totalAiChats
                },
                alerts = new[]
                {
                    new { id = 1, type = "warning", message = "Tour Phú Quốc 4N3Đ ngày 20/10 sắp hết chỗ (còn 2 chỗ)" },
                    new { id = 2, type = "error", message = "Có 3 giao dịch thanh toán thất bại cần kiểm tra" },
                    new { id = 3, type = "info", message = "Có 5 yêu cầu hoàn tiền (Refund) mới chờ duyệt" }
                },
                revenueChart = new[]
                {
                    new { name = "T1", value = 800 },
                    new { name = "T2", value = 900 },
                    new { name = "T3", value = 1100 },
                    new { name = "T4", value = 1400 },
                    new { name = "T5", value = 1800 },
                    new { name = "T6", value = 2200 },
                    new { name = "T7", value = 2500 },
                    new { name = "T8", value = 2100 },
                    new { name = "T9", value = 1500 },
                    new { name = "T10", value = 1250 },
                    new { name = "T11", value = 1000 },
                    new { name = "T12", value = 1600 }
                }
            };

            return Ok(summary);
        }
    }
}
