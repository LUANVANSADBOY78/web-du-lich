using GoTravel.API.Data;
using GoTravel.API.Entities;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace GoTravel.API.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class DestinationsController : ControllerBase
    {
        private readonly GoTravelDbContext _context;

        public DestinationsController(GoTravelDbContext context)
        {
            _context = context;
        }

        // GET /api/destinations OR /api/destinations?region=bac&search=sapa
        [HttpGet]
        public async Task<IActionResult> GetAll(
            [FromQuery] string? region = null,
            [FromQuery] string? search = null,
            [FromQuery] string? type = null,
            [FromQuery] int page = 1,
            [FromQuery] int pageSize = 100)
        {
            // First check if DB has destinations
            var query = _context.Destinations.AsQueryable();

            if (!string.IsNullOrWhiteSpace(region) && region != "all")
            {
                query = query.Where(d => d.Region.ToLower() == region.ToLower());
            }

            if (!string.IsNullOrWhiteSpace(search))
            {
                var s = search.Trim().ToLower();
                query = query.Where(d => d.Name.ToLower().Contains(s) || d.Province.ToLower().Contains(s));
            }

            var dbItems = await query.ToListAsync();

            // If DB is populated, return DB items; otherwise return 63 curated destinations
            if (dbItems.Any())
            {
                var total = dbItems.Count;
                var paged = dbItems
                    .Skip((page - 1) * pageSize)
                    .Take(pageSize)
                    .ToList();

                return Ok(new
                {
                    total,
                    page,
                    pageSize,
                    items = paged
                });
            }

            // Return curated Vietnam 63 provinces data
            var allCurated = GetCurated63Destinations();
            var filtered = allCurated.AsEnumerable();

            if (!string.IsNullOrWhiteSpace(region) && region != "all")
            {
                filtered = filtered.Where(d => d.Region.Equals(region, StringComparison.OrdinalIgnoreCase));
            }

            if (!string.IsNullOrWhiteSpace(type) && type != "all")
            {
                filtered = filtered.Where(d => d.Type.Equals(type, StringComparison.OrdinalIgnoreCase));
            }

            if (!string.IsNullOrWhiteSpace(search))
            {
                var s = search.Trim().ToLower();
                filtered = filtered.Where(d => d.Name.ToLower().Contains(s) || d.Province.ToLower().Contains(s));
            }

            var resultList = filtered.ToList();
            var pagedCurated = resultList
                .Skip((page - 1) * pageSize)
                .Take(pageSize)
                .ToList();

            return Ok(new
            {
                total = resultList.Count,
                page,
                pageSize,
                items = pagedCurated
            });
        }

        // GET /api/destinations/{id}
        [HttpGet("{id:int}")]
        public async Task<IActionResult> GetById(int id)
        {
            var dbItem = await _context.Destinations
                .Include(d => d.TourDestinations)
                .ThenInclude(td => td.Tour)
                .FirstOrDefaultAsync(d => d.Id == id);

            if (dbItem != null) return Ok(dbItem);

            var curated = GetCurated63Destinations().FirstOrDefault(d => d.Id == id);
            if (curated != null) return Ok(curated);

            return NotFound(new { message = "Không tìm thấy điểm đến" });
        }

        // GET /api/destinations/slug/{slug}
        [HttpGet("slug/{slug}")]
        public async Task<IActionResult> GetBySlug(string slug)
        {
            var dbItem = await _context.Destinations.FirstOrDefaultAsync(d => d.Slug == slug);
            if (dbItem != null) return Ok(dbItem);

            var curated = GetCurated63Destinations().FirstOrDefault(d => d.Slug.Equals(slug, StringComparison.OrdinalIgnoreCase));
            if (curated != null) return Ok(curated);

            return NotFound(new { message = "Không tìm thấy điểm đến" });
        }

        // GET /api/destinations/stats
        [HttpGet("stats")]
        public IActionResult GetStats()
        {
            var list = GetCurated63Destinations();
            var total = list.Count;
            var bac = list.Count(d => d.Region == "bac");
            var trung = list.Count(d => d.Region == "trung");
            var nam = list.Count(d => d.Region == "nam");
            var totalTours = list.Sum(d => d.Tours);
            var totalTickets = list.Sum(d => d.Tickets);

            return Ok(new
            {
                totalProvinces = total,
                regionNorth = bac,
                regionCentral = trung,
                regionSouth = nam,
                totalTours,
                totalTickets
            });
        }

        // POST /api/destinations/seed
        [HttpPost("seed")]
        public async Task<IActionResult> SeedDatabase()
        {
            var existingCount = await _context.Destinations.CountAsync();
            if (existingCount >= 63)
            {
                return Ok(new { message = $"Cơ sở dữ liệu đã có {existingCount} điểm đến, không cần khởi tạo lại." });
            }

            var curatedList = GetCurated63Destinations();
            int addedCount = 0;

            foreach (var item in curatedList)
            {
                var exists = await _context.Destinations.AnyAsync(d => d.Slug == item.Slug || d.Province == item.Province);
                if (!exists)
                {
                    _context.Destinations.Add(new Destination
                    {
                        Name = item.Name,
                        Slug = item.Slug,
                        Province = item.Province,
                        Region = item.Region,
                        Description = item.Description,
                        Latitude = item.Lat,
                        Longitude = item.Lng,
                        MapZoom = 12,
                        MainImage = item.Img,
                        Rating = item.Rating,
                        Featured = item.Rating >= 4.8,
                        Status = "Active"
                    });
                    addedCount++;
                }
            }

            await _context.SaveChangesAsync();
            return Ok(new { message = $"Đã thêm thành công {addedCount} điểm đến vào cơ sở dữ liệu." });
        }

        // Danh sách toàn diện 63 tỉnh thành Việt Nam
        public class DestinationDto
        {
            public int Id { get; set; }
            public string Name { get; set; } = string.Empty;
            public string Slug { get; set; } = string.Empty;
            public string Province { get; set; } = string.Empty;
            public string Region { get; set; } = string.Empty;
            public string Type { get; set; } = string.Empty;
            public double Lat { get; set; }
            public double Lng { get; set; }
            public double Rating { get; set; }
            public string Reviews { get; set; } = string.Empty;
            public string Img { get; set; } = string.Empty;
            public int Tours { get; set; }
            public int Tickets { get; set; }
            public decimal Price { get; set; }
            public string PriceFormatted { get; set; } = string.Empty;
            public string Description { get; set; } = string.Empty;
        }

        public static List<DestinationDto> GetCurated63Destinations()
        {
            return new List<DestinationDto>
            {
                // ==================== MIỀN BẮC (25 TỈNH THÀNH) ====================
                new() {
                    Id = 1, Name = "Hồ Hoàn Kiếm & Phố Cổ Hà Nội", Slug = "ha-noi", Province = "Hà Nội", Region = "bac", Type = "Văn hóa",
                    Lat = 21.0285, Lng = 105.8542, Rating = 4.8, Reviews = "5.8K",
                    Img = "https://images.unsplash.com/photo-1509030450996-dd1a26dda07a?auto=format&fit=crop&q=80&w=600",
                    Tours = 24, Tickets = 9, Price = 350000, PriceFormatted = "350k",
                    Description = "Trái tim của thủ đô ngàn năm văn hiến với 36 phố phường rêu phong, ẩm thực tinh hoa và các di tích lịch sử linh thiêng."
                },
                new() {
                    Id = 2, Name = "Fansipan & Thung Lũng Sapa", Slug = "sapa-lao-cai", Province = "Lào Cai", Region = "bac", Type = "Núi",
                    Lat = 22.3364, Lng = 103.8438, Rating = 4.9, Reviews = "4.2K",
                    Img = "https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&q=80&w=600",
                    Tours = 19, Tickets = 4, Price = 850000, PriceFormatted = "850k",
                    Description = "Chinh phục nóc nhà Đông Dương Fansipan huyền thoại, chiêm ngưỡng biển mây bồng bềnh và các bản làng mộc mạc người Mông, Dao."
                },
                new() {
                    Id = 3, Name = "Kỳ Quan Thiên Nhiên Vịnh Hạ Long", Slug = "ha-long-quang-ninh", Province = "Quảng Ninh", Region = "bac", Type = "Biển",
                    Lat = 20.9101, Lng = 107.1839, Rating = 4.9, Reviews = "8.2K",
                    Img = "https://images.unsplash.com/photo-1528127269322-539801943592?auto=format&fit=crop&q=80&w=600",
                    Tours = 28, Tickets = 11, Price = 1200000, PriceFormatted = "1.2tr",
                    Description = "Di sản thiên nhiên thế giới UNESCO với hàng nghìn đảo đá vôi kỳ vĩ nhô lên giữa làn nước xanh ngọc lục bảo."
                },
                new() {
                    Id = 4, Name = "Quần Đảo Cát Bà & Vịnh Lan Hạ", Slug = "cat-ba-hai-phong", Province = "Hải Phòng", Region = "bac", Type = "Biển",
                    Lat = 20.8000, Lng = 106.9997, Rating = 4.7, Reviews = "3.1K",
                    Img = "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&q=80&w=600",
                    Tours = 15, Tickets = 6, Price = 650000, PriceFormatted = "650k",
                    Description = "Hòn ngọc vùng vịnh Bắc Bộ với Vịnh Lan Hạ hoang sơ, rừng nguyên sinh Vườn Quốc Gia và các bãi tắm nước trong vắt."
                },
                new() {
                    Id = 5, Name = "Cột Cờ Lũng Cú & Đèo Mã Pí Lèng", Slug = "ha-giang", Province = "Hà Giang", Region = "bac", Type = "Núi",
                    Lat = 23.2833, Lng = 105.3667, Rating = 4.9, Reviews = "6.5K",
                    Img = "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&q=80&w=600",
                    Tours = 22, Tickets = 3, Price = 1450000, PriceFormatted = "1.45tr",
                    Description = "Cực Bắc thiêng liêng của Tổ quốc, Công viên địa chất toàn cầu Cao nguyên đá Đồng Văn và hẻm vực Tu Sản sâu nhất Đông Nam Á."
                },
                new() {
                    Id = 6, Name = "Thác Bản Giốc & Động Ngườm Ngao", Slug = "thac-ban-gioc-cao-bang", Province = "Cao Bằng", Region = "bac", Type = "Sinh thái",
                    Lat = 22.8542, Lng = 106.7236, Rating = 4.8, Reviews = "3.8K",
                    Img = "https://images.unsplash.com/photo-1432405972618-c60b0225b8f9?auto=format&fit=crop&q=80&w=600",
                    Tours = 12, Tickets = 2, Price = 1350000, PriceFormatted = "1.35tr",
                    Description = "Thác nước tự nhiên lớn thứ tư thế giới trên đường biên giới, dòng nước đổ cuồn cuộn giữa non xanh nước biếc biên cương."
                },
                new() {
                    Id = 7, Name = "Quần Thể Danh Thắng Tràng An", Slug = "trang-an-ninh-binh", Province = "Ninh Bình", Region = "bac", Type = "Văn hóa",
                    Lat = 20.2506, Lng = 105.9745, Rating = 4.9, Reviews = "7.1K",
                    Img = "https://images.unsplash.com/photo-1578632767115-351597cf2477?auto=format&fit=crop&q=80&w=600",
                    Tours = 20, Tickets = 8, Price = 490000, PriceFormatted = "490k",
                    Description = "Di sản hỗn hợp thế giới đầu tiên của Đông Nam Á với hệ thống hang động xuyên thủy, núi non trùng điệp và chùa Bái Đính."
                },
                new() {
                    Id = 8, Name = "Thung Lũng Mai Châu & Hồ Hòa Bình", Slug = "mai-chau-hoa-binh", Province = "Hòa Bình", Region = "bac", Type = "Sinh thái",
                    Lat = 20.6692, Lng = 105.0847, Rating = 4.7, Reviews = "2.9K",
                    Img = "https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&q=80&w=600",
                    Tours = 14, Tickets = 3, Price = 590000, PriceFormatted = "590k",
                    Description = "Bức tranh thung lũng êm đềm với những nếp nhà sàn của đồng bào Thái, cánh đồng lúa xanh mướt và lòng hồ Hòa Bình rộng lớn."
                },
                new() {
                    Id = 9, Name = "Cao Nguyên Mộc Châu & Đồi Chè", Slug = "moc-chau-son-la", Province = "Sơn La", Region = "bac", Type = "Núi",
                    Lat = 20.8436, Lng = 104.6472, Rating = 4.8, Reviews = "4.3K",
                    Img = "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&q=80&w=600",
                    Tours = 16, Tickets = 4, Price = 750000, PriceFormatted = "750k",
                    Description = "Xứ sở sương mù của Tây Bắc nổi tiếng với đồi chè Trái Tim, thung lũng mận Nà Ka nở trắng xóa và Thác Dải Yếm thơ mộng."
                },
                new() {
                    Id = 10, Name = "Chiến Trường Lịch Sử Điện Biên Phủ", Slug = "dien-bien-phu", Province = "Điện Biên", Region = "bac", Type = "Văn hóa",
                    Lat = 21.3869, Lng = 103.0188, Rating = 4.8, Reviews = "2.4K",
                    Img = "https://images.unsplash.com/photo-1509030450996-dd1a26dda07a?auto=format&fit=crop&q=80&w=600",
                    Tours = 9, Tickets = 2, Price = 1290000, PriceFormatted = "1.29tr",
                    Description = "Mảnh đất lịch sử hào hùng 'lừng lẫy năm châu, chấn động địa cầu' với đồi A1, Hầm Đờ Cát và Đèo Pha Đin huyền thoại."
                },
                new() {
                    Id = 11, Name = "Đèo Ô Quy Hồ & Cầu Kính Rồng Mây", Slug = "o-quy-ho-lai-chau", Province = "Lai Châu", Region = "bac", Type = "Núi",
                    Lat = 22.3964, Lng = 103.4589, Rating = 4.8, Reviews = "2.1K",
                    Img = "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&q=80&w=600",
                    Tours = 8, Tickets = 3, Price = 890000, PriceFormatted = "890k",
                    Description = "Vua đèo hiểm trở bậc nhất miền Bắc, ngắm hoàng hôn đỏ rực buông xuống biển mây và trải nghiệm cầu kính trên vách núi dựng đứng."
                },
                new() {
                    Id = 12, Name = "Ruộng Bậc Thang Mù Cang Chải", Slug = "mu-cang-chai-yen-bai", Province = "Yên Bái", Region = "bac", Type = "Núi",
                    Lat = 21.8492, Lng = 104.0911, Rating = 4.9, Reviews = "5.1K",
                    Img = "https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&q=80&w=600",
                    Tours = 15, Tickets = 2, Price = 1150000, PriceFormatted = "1.15tr",
                    Description = "Di tích quốc gia đặc biệt với những sóng lúa vàng óng ả uốn lượn quanh sườn núi, đèo Khau Phạ săn mây và bay dù lượn."
                },
                new() {
                    Id = 13, Name = "Vườn Quốc Gia & Hồ Ba Bể", Slug = "ho-ba-be-bac-kan", Province = "Bắc Kạn", Region = "bac", Type = "Sinh thái",
                    Lat = 22.4047, Lng = 105.6264, Rating = 4.7, Reviews = "1.8K",
                    Img = "https://images.unsplash.com/photo-1432405972618-c60b0225b8f9?auto=format&fit=crop&q=80&w=600",
                    Tours = 7, Tickets = 2, Price = 950000, PriceFormatted = "950k",
                    Description = "Hồ nước ngọt tự nhiên trên núi đá vôi lớn nhất Việt Nam, được bao bọc bởi rừng nhiệt đới nguyên sinh và thác Đầu Đẳng."
                },
                new() {
                    Id = 14, Name = "Đỉnh Mẫu Sơn & Ải Chi Lăng", Slug = "mau-son-lang-son", Province = "Lạng Sơn", Region = "bac", Type = "Văn hóa",
                    Lat = 21.8536, Lng = 106.7622, Rating = 4.6, Reviews = "1.9K",
                    Img = "https://images.unsplash.com/photo-1509030450996-dd1a26dda07a?auto=format&fit=crop&q=80&w=600",
                    Tours = 8, Tickets = 2, Price = 790000, PriceFormatted = "790k",
                    Description = "Đỉnh núi mây mù xứ Lạng có tuyết rơi vào mùa đông, các biệt thự cổ Pháp và di tích lịch sử Chi Lăng kiêu hùng."
                },
                new() {
                    Id = 15, Name = "Khu Di Tích Lịch Sử Tân Trào & Hồ Na Hang", Slug = "tan-trao-tuyen-quang", Province = "Tuyên Quang", Region = "bac", Type = "Sinh thái",
                    Lat = 21.8236, Lng = 105.2158, Rating = 4.7, Reviews = "1.6K",
                    Img = "https://images.unsplash.com/photo-1432405972618-c60b0225b8f9?auto=format&fit=crop&q=80&w=600",
                    Tours = 6, Tickets = 1, Price = 690000, PriceFormatted = "690k",
                    Description = "Thủ đô kháng chiến cách mạng, cây đa Tân Trào thiêng liêng cùng vẻ đẹp huyền ảo của lòng hồ Na Hang sơn thủy hữu tình."
                },
                new() {
                    Id = 16, Name = "Hồ Núi Cốc & Đồi Chè Tân Cương", Slug = "ho-nui-coc-thai-nguyen", Province = "Thái Nguyên", Region = "bac", Type = "Sinh thái",
                    Lat = 21.5928, Lng = 105.8442, Rating = 4.6, Reviews = "2.3K",
                    Img = "https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&q=80&w=600",
                    Tours = 7, Tickets = 3, Price = 450000, PriceFormatted = "450k",
                    Description = "Thủ phủ trà xứ Bắc với những nương chè bát ngát, huyền thoại tình yêu nàng Công chàng Cốc bên lòng hồ rộng lớn."
                },
                new() {
                    Id = 17, Name = "Đền Hùng - Đất Tổ Cội Nguồn Dân Tộc", Slug = "den-hung-phu-tho", Province = "Phú Thọ", Region = "bac", Type = "Văn hóa",
                    Lat = 21.3989, Lng = 105.3267, Rating = 4.9, Reviews = "6.2K",
                    Img = "https://images.unsplash.com/photo-1509030450996-dd1a26dda07a?auto=format&fit=crop&q=80&w=600",
                    Tours = 11, Tickets = 2, Price = 390000, PriceFormatted = "390k",
                    Description = "Nơi hội tụ cội nguồn tâm linh của con Lạc cháu Hồng, Tín ngưỡng thờ cúng Hùng Vương được UNESCO công nhận là di sản văn hóa phi vật thể."
                },
                new() {
                    Id = 18, Name = "Thị Trấn Trong Mây Tam Đảo & Tây Thiên", Slug = "tam-dao-vinh-phuc", Province = "Vĩnh Phúc", Region = "bac", Type = "Núi",
                    Lat = 21.4583, Lng = 105.6444, Rating = 4.7, Reviews = "4.5K",
                    Img = "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&q=80&w=600",
                    Tours = 12, Tickets = 3, Price = 490000, PriceFormatted = "490k",
                    Description = "Đà Lạt thu nhỏ của miền Bắc với khí hậu bốn mùa trong một ngày, cầu mây thơ mộng, lâu đài Tam Đảo nguy nga và chốn thiền tự Tây Thiên."
                },
                new() {
                    Id = 19, Name = "Chùa Vĩnh Nghiêm & Cao Nguyên Đồng Cao", Slug = "dong-cao-bac-giang", Province = "Bắc Giang", Region = "bac", Type = "Sinh thái",
                    Lat = 21.2731, Lng = 106.1947, Rating = 4.6, Reviews = "1.5K",
                    Img = "https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&q=80&w=600",
                    Tours = 5, Tickets = 1, Price = 420000, PriceFormatted = "420k",
                    Description = "Kho tàng Mộc bản kinh Phật chùa Vĩnh Nghiêm và thảo nguyên Đồng Cao xanh mướt là điểm cắm trại lý tưởng."
                },
                new() {
                    Id = 20, Name = "Làng Tranh Đông Hồ & Đền Đô Lý Triều", Slug = "den-do-bac-ninh", Province = "Bắc Ninh", Region = "bac", Type = "Văn hóa",
                    Lat = 21.1861, Lng = 106.0764, Rating = 4.8, Reviews = "3.2K",
                    Img = "https://images.unsplash.com/photo-1509030450996-dd1a26dda07a?auto=format&fit=crop&q=80&w=600",
                    Tours = 8, Tickets = 2, Price = 320000, PriceFormatted = "320k",
                    Description = "Vùng đất Kinh Bắc vang danh với những làn điệu Dân ca Quan họ ngọt ngào, nơi phát tích vương triều nhà Lý hưng thịnh."
                },
                new() {
                    Id = 21, Name = "Quần Thể Danh Thắng Côn Sơn - Kiếp Bạc", Slug = "con-son-kiep-bac-hai-duong", Province = "Hải Dương", Region = "bac", Type = "Văn hóa",
                    Lat = 21.1333, Lng = 106.3167, Rating = 4.7, Reviews = "2.8K",
                    Img = "https://images.unsplash.com/photo-1509030450996-dd1a26dda07a?auto=format&fit=crop&q=80&w=600",
                    Tours = 6, Tickets = 2, Price = 350000, PriceFormatted = "350k",
                    Description = "Mảnh đất địa linh nhân kiệt gắn liền với tên tuổi người anh hùng Trần Hưng Đạo và Danh nhân văn hóa thế giới Nguyễn Trãi."
                },
                new() {
                    Id = 22, Name = "Phố Hiến Cổ Kính & Đền Chử Đồng Tử", Slug = "pho-hien-hung-yen", Province = "Hưng Yên", Region = "bac", Type = "Văn hóa",
                    Lat = 20.6500, Lng = 106.0500, Rating = 4.6, Reviews = "1.7K",
                    Img = "https://images.unsplash.com/photo-1509030450996-dd1a26dda07a?auto=format&fit=crop&q=80&w=600",
                    Tours = 5, Tickets = 1, Price = 290000, PriceFormatted = "290k",
                    Description = "Thương cảng sầm uất lừng danh xưa 'Thứ nhất Kinh Kỳ, thứ nhì Phố Hiến' cùng vị ngọt đậm đà của đặc sản nhãn lồng tiến vua."
                },
                new() {
                    Id = 23, Name = "Chùa Tam Chúc Lớn Nhất Thế Giới", Slug = "chua-tam-chuc-ha-nam", Province = "Hà Nam", Region = "bac", Type = "Văn hóa",
                    Lat = 20.5369, Lng = 105.8672, Rating = 4.8, Reviews = "5.3K",
                    Img = "https://images.unsplash.com/photo-1578632767115-351597cf2477?auto=format&fit=crop&q=80&w=600",
                    Tours = 14, Tickets = 4, Price = 450000, PriceFormatted = "450k",
                    Description = "Quần thể tâm linh tựa non nước hữu tình với Điện Tam Thế, hồ Lục Nhạc và cảnh quan non nước kỳ vĩ như chốn bồng lai."
                },
                new() {
                    Id = 24, Name = "Đền Trần Hào Khí Đông A & Biển Quất Lâm", Slug = "den-tran-nam-dinh", Province = "Nam Định", Region = "bac", Type = "Văn hóa",
                    Lat = 20.4344, Lng = 106.1772, Rating = 4.7, Reviews = "2.9K",
                    Img = "https://images.unsplash.com/photo-1509030450996-dd1a26dda07a?auto=format&fit=crop&q=80&w=600",
                    Tours = 7, Tickets = 1, Price = 380000, PriceFormatted = "380k",
                    Description = "Vùng đất văn hiến của các vua Trần với lễ hội khai ấn Đền Trần rộn ràng, cùng những ngôi giáo đường kiến trúc Gothic tuyệt mỹ."
                },
                new() {
                    Id = 25, Name = "Chùa Keo Cổ Tự & Biển Đồng Châu", Slug = "chua-keo-thai-binh", Province = "Thái Bình", Region = "bac", Type = "Văn hóa",
                    Lat = 20.4464, Lng = 106.3364, Rating = 4.6, Reviews = "1.8K",
                    Img = "https://images.unsplash.com/photo-1509030450996-dd1a26dda07a?auto=format&fit=crop&q=80&w=600",
                    Tours = 5, Tickets = 1, Price = 320000, PriceFormatted = "320k",
                    Description = "Kiệt tác kiến trúc gỗ gần 400 năm tuổi với gác chuông ba tầng mái cong vút, cùng bãi đồng ngao Đồng Châu bạt ngàn gió lộng."
                },

                // ==================== MIỀN TRUNG (19 TỈNH THÀNH) ====================
                new() {
                    Id = 26, Name = "Biển Sầm Sơn Sôi Động & Pù Luông", Slug = "sam-son-pu-luong-thanh-hoa", Province = "Thanh Hóa", Region = "trung", Type = "Biển",
                    Lat = 19.8078, Lng = 105.7764, Rating = 4.7, Reviews = "4.9K",
                    Img = "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&q=80&w=600",
                    Tours = 14, Tickets = 5, Price = 690000, PriceFormatted = "690k",
                    Description = "Thành phố biển du lịch nhộn nhịp, Thành Nhà Hồ di sản UNESCO và thung lũng sinh thái Pù Luông hoang sơ mây giăng."
                },
                new() {
                    Id = 27, Name = "Bãi Biển Cửa Lò & Quê Bác Làng Sen", Slug = "cua-lo-lang-sen-nghe-an", Province = "Nghệ An", Region = "trung", Type = "Văn hóa",
                    Lat = 18.6739, Lng = 105.6814, Rating = 4.7, Reviews = "4.2K",
                    Img = "https://images.unsplash.com/photo-1509030450996-dd1a26dda07a?auto=format&fit=crop&q=80&w=600",
                    Tours = 11, Tickets = 3, Price = 550000, PriceFormatted = "550k",
                    Description = "Về thăm mái nhà tranh bình dị nơi sinh ra Chủ tịch Hồ Chí Minh, hòa mình vào sóng biển Cửa Lò và ốc đảo chè Thanh Chương."
                },
                new() {
                    Id = 28, Name = "Biển Thiên Cầm & Ngã Ba Đồng Lộc", Slug = "thien-cam-ha-tinh", Province = "Hà Tĩnh", Region = "trung", Type = "Văn hóa",
                    Lat = 18.3428, Lng = 105.9058, Rating = 4.6, Reviews = "2.1K",
                    Img = "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&q=80&w=600",
                    Tours = 7, Tickets = 2, Price = 490000, PriceFormatted = "490k",
                    Description = "Cung đàn biển Thiên Cầm êm đềm với bờ cát trắng thoai thoải và khu di tích Ngã ba Đồng Lộc linh thiêng, bất tử."
                },
                new() {
                    Id = 29, Name = "Vườn Quốc Gia Phong Nha - Kẻ Bàng & Sơn Đoòng", Slug = "phong-nha-ke-bang-quang-binh", Province = "Quảng Bình", Region = "trung", Type = "Sinh thái",
                    Lat = 17.5381, Lng = 106.2842, Rating = 4.9, Reviews = "7.8K",
                    Img = "https://images.unsplash.com/photo-1578632767115-351597cf2477?auto=format&fit=crop&q=80&w=600",
                    Tours = 21, Tickets = 8, Price = 950000, PriceFormatted = "950k",
                    Description = "Vương quốc hang động thế giới với Động Phong Nha, Động Thiên Đường lộng lẫy và Sơn Đoòng - hang động tự nhiên lớn nhất hành tinh."
                },
                new() {
                    Id = 30, Name = "Đôi Bờ Hiền Lương & Địa Đạo Vịnh Mốc", Slug = "dia-dao-vinh-moc-quang-tri", Province = "Quảng Trị", Region = "trung", Type = "Văn hóa",
                    Lat = 16.8528, Lng = 107.1039, Rating = 4.7, Reviews = "2.6K",
                    Img = "https://images.unsplash.com/photo-1509030450996-dd1a26dda07a?auto=format&fit=crop&q=80&w=600",
                    Tours = 8, Tickets = 2, Price = 620000, PriceFormatted = "620k",
                    Description = "Chứng nhân lịch sử về khát vọng hòa bình thống nhất bên dòng sông Bến Hải, Thành Cổ Quảng Trị và làng địa đạo trong lòng đất."
                },
                new() {
                    Id = 31, Name = "Cố Đô Huế & Quần Thể Lăng Tẩm Hoàng Gia", Slug = "co-do-hue", Province = "Thừa Thiên Huế", Region = "trung", Type = "Văn hóa",
                    Lat = 16.4637, Lng = 107.5909, Rating = 4.9, Reviews = "6.9K",
                    Img = "https://images.unsplash.com/photo-1569154941061-e231b4725ef1?auto=format&fit=crop&q=80&w=600",
                    Tours = 23, Tickets = 9, Price = 550000, PriceFormatted = "550k",
                    Description = "Kinh thành triều Nguyễn uy nghiêm, nghe ca Huế trên dòng Sông Hương thơ mộng và thưởng thức ẩm thực cung đình độc đáo."
                },
                new() {
                    Id = 32, Name = "Bà Nà Hills & Cầu Vàng Đà Nẵng", Slug = "ba-na-hills-da-nang", Province = "Đà Nẵng", Region = "trung", Type = "Vui chơi",
                    Lat = 15.9988, Lng = 108.0019, Rating = 4.9, Reviews = "9.5K",
                    Img = "https://images.unsplash.com/photo-1559592413-7cec4d0cae2b?auto=format&fit=crop&q=80&w=600",
                    Tours = 32, Tickets = 15, Price = 850000, PriceFormatted = "850k",
                    Description = "Thành phố đáng sống bậc nhất với Cầu Vàng hai bàn tay khổng lồ, biển Mỹ Khê cát trắng và bán đảo Sơn Trà hoang dã."
                },
                new() {
                    Id = 33, Name = "Phố Cổ Hội An & Thánh Địa Mỹ Sơn", Slug = "pho-co-hoi-an-quang-nam", Province = "Quảng Nam", Region = "trung", Type = "Văn hóa",
                    Lat = 15.8801, Lng = 108.3380, Rating = 4.9, Reviews = "8.8K",
                    Img = "https://images.unsplash.com/photo-1555939594-58d7cb561ad1?auto=format&fit=crop&q=80&w=600",
                    Tours = 26, Tickets = 10, Price = 450000, PriceFormatted = "450k",
                    Description = "Phố đèn lồng lung linh bên bờ sông Hoài, những dãy nhà tường vàng cổ kính và quần thể tháp Chăm Mỹ Sơn kỳ bí."
                },
                new() {
                    Id = 34, Name = "Đảo Núi Lửa Lý Sơn - Vương Quốc Tỏi", Slug = "dao-ly-son-quang-ngai", Province = "Quảng Ngãi", Region = "trung", Type = "Biển",
                    Lat = 15.3789, Lng = 109.1172, Rating = 4.8, Reviews = "3.9K",
                    Img = "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&q=80&w=600",
                    Tours = 11, Tickets = 3, Price = 1250000, PriceFormatted = "1.25tr",
                    Description = "Thiên đường biển đảo được kiến tạo từ miệng núi lửa hàng triệu năm trước với Cổng Tò Vò huyền ảo và nước biển trong vắt thấu đáy."
                },
                new() {
                    Id = 35, Name = "Kỳ Co - Eo Gió Quy Nhơn", Slug = "ky-co-eo-gio-binh-dinh", Province = "Bình Định", Region = "trung", Type = "Biển",
                    Lat = 13.7820, Lng = 109.2194, Rating = 4.8, Reviews = "5.4K",
                    Img = "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&q=80&w=600",
                    Tours = 18, Tickets = 6, Price = 780000, PriceFormatted = "780k",
                    Description = "Maldives của Việt Nam với bờ biển cong hình lưỡi liềm, con đường ven biển Eo Gió ngắm hoàng hôn đẹp nhất Việt Nam."
                },
                new() {
                    Id = 36, Name = "Gành Đá Đĩa & Bãi Xép Hoa Vàng Cỏ Xanh", Slug = "ganh-da-dia-phu-yen", Province = "Phú Yên", Region = "trung", Type = "Biển",
                    Lat = 13.3644, Lng = 109.2944, Rating = 4.8, Reviews = "4.6K",
                    Img = "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&q=80&w=600",
                    Tours = 14, Tickets = 4, Price = 690000, PriceFormatted = "690k",
                    Description = "Tuyệt tác địa chất tự nhiên với các cột đá bazan hình lục giác xếp chồng độc đáo, bờ biển Bãi Xép lãng mạn và Mũi Điện đón ánh bình minh đầu tiên."
                },
                new() {
                    Id = 37, Name = "Vịnh Biển Thiên Đường Nha Trang & VinWonders", Slug = "nha-trang-khanh-hoa", Province = "Khánh Hòa", Region = "trung", Type = "Biển",
                    Lat = 12.2388, Lng = 109.1967, Rating = 4.9, Reviews = "8.7K",
                    Img = "https://images.unsplash.com/photo-1513889961551-628c1e5e2ee9?auto=format&fit=crop&q=80&w=600",
                    Tours = 27, Tickets = 12, Price = 790000, PriceFormatted = "790k",
                    Description = "Một trong những vịnh biển đẹp nhất hành tinh với tour lặn ngắm san hô, quần thể giải trí VinWonders Hòn Tre và Tháp Bà Ponagar."
                },
                new() {
                    Id = 38, Name = "Vịnh Vĩnh Hy & Đồi Cát Nam Cương", Slug = "vinh-hy-ninh-thuan", Province = "Ninh Thuận", Region = "trung", Type = "Biển",
                    Lat = 11.7208, Lng = 109.1950, Rating = 4.7, Reviews = "3.2K",
                    Img = "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&q=80&w=600",
                    Tours = 10, Tickets = 3, Price = 650000, PriceFormatted = "650k",
                    Description = "Vịnh biển nguyên sơ phẳng lặng nằm nép mình bên Vườn Quốc Gia Núi Chúa, các vườn nho trĩu quả và tháp Chăm Po Klong Garai."
                },
                new() {
                    Id = 39, Name = "Mũi Né Đồi Cát Bay & Đảo Phú Quý", Slug = "mui-ne-binh-thuan", Province = "Bình Thuận", Region = "trung", Type = "Biển",
                    Lat = 10.9333, Lng = 108.2833, Rating = 4.8, Reviews = "5.6K",
                    Img = "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&q=80&w=600",
                    Tours = 17, Tickets = 5, Price = 590000, PriceFormatted = "590k",
                    Description = "Thủ phủ resort với những đồi cát bay vàng rực rỡ, xe jeep vượt sa mạc cát Bàu Trắng và hòn đảo ngọc Phú Quý thơ mộng."
                },
                new() {
                    Id = 40, Name = "Măng Đen Mờ Sương & Nhà Thờ Gỗ Kon Tum", Slug = "mang-den-kon-tum", Province = "Kon Tum", Region = "trung", Type = "Núi",
                    Lat = 14.6000, Lng = 108.2833, Rating = 4.8, Reviews = "3.5K",
                    Img = "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&q=80&w=600",
                    Tours = 11, Tickets = 2, Price = 890000, PriceFormatted = "890k",
                    Description = "Đà Lạt thứ hai của Bắc Tây Nguyên với rừng thông bạt ngàn, thác Pa Sỹ, không khí trong lành mát lạnh và nhà thờ gỗ trăm tuổi."
                },
                new() {
                    Id = 41, Name = "Biển Hồ T’Nưng & Núi Lửa Chư Đăng Ya", Slug = "bien-ho-gia-lai", Province = "Gia Lai", Region = "trung", Type = "Sinh thái",
                    Lat = 14.0494, Lng = 108.0033, Rating = 4.7, Reviews = "2.8K",
                    Img = "https://images.unsplash.com/photo-1432405972618-c60b0225b8f9?auto=format&fit=crop&q=80&w=600",
                    Tours = 9, Tickets = 2, Price = 790000, PriceFormatted = "790k",
                    Description = "Đôi mắt Pleiku ngập tràn sóng nước trên miệng núi lửa cổ, mùa hoa dã quỳ vàng rực nhuộm kín sườn núi Chư Đăng Ya."
                },
                new() {
                    Id = 42, Name = "Thủ Phủ Cà Phê Buôn Ma Thuột & Bản Đôn", Slug = "buon-ma-thuot-dak-lak", Province = "Đắk Lắk", Region = "trung", Type = "Sinh thái",
                    Lat = 12.6667, Lng = 108.0333, Rating = 4.8, Reviews = "4.1K",
                    Img = "https://images.unsplash.com/photo-1432405972618-c60b0225b8f9?auto=format&fit=crop&q=80&w=600",
                    Tours = 15, Tickets = 4, Price = 850000, PriceFormatted = "850k",
                    Description = "Không gian văn hóa cồng chiêng Tây Nguyên, bảo tàng cà phê thế giới và trải nghiệm chèo thuyền độc mộc trên Hồ Lắk."
                },
                new() {
                    Id = 43, Name = "Tuyệt Tác Hồ Tà Đùng - Vịnh Hạ Long Tây Nguyên", Slug = "ho-ta-dung-dak-nong", Province = "Đắk Nông", Region = "trung", Type = "Sinh thái",
                    Lat = 11.8542, Lng = 107.8375, Rating = 4.8, Reviews = "3.2K",
                    Img = "https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&q=80&w=600",
                    Tours = 10, Tickets = 2, Price = 920000, PriceFormatted = "920k",
                    Description = "Gần 40 hòn đảo lớn nhỏ nhấp nhô giữa mặt hồ xanh ngắt, tạo nên cảnh sắc thần tiên tựa vịnh biển giữa núi rừng cao nguyên."
                },
                new() {
                    Id = 44, Name = "Thành Phố Ngàn Hoa Đà Lạt & Hồ Tuyền Lâm", Slug = "da-lat-lam-dong", Province = "Lâm Đồng", Region = "trung", Type = "Núi",
                    Lat = 11.9404, Lng = 108.4583, Rating = 4.9, Reviews = "9.8K",
                    Img = "https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&q=80&w=600",
                    Tours = 35, Tickets = 16, Price = 490000, PriceFormatted = "490k",
                    Description = "Thành phố tình yêu mộng mơ quanh năm se lạnh với rừng thông bạt ngàn, thác Datanla, đỉnh Langbiang và ngàn loài hoa khoe sắc."
                },

                // ==================== MIỀN NAM (19 TỈNH THÀNH) ====================
                new() {
                    Id = 45, Name = "Phố Đi Bộ & Sài Gòn Hoa Lệ", Slug = "tp-ho-chi-minh", Province = "Hồ Chí Minh", Region = "nam", Type = "Văn hóa",
                    Lat = 10.7769, Lng = 106.7009, Rating = 4.8, Reviews = "8.9K",
                    Img = "https://images.unsplash.com/photo-1559592413-7cec4d0cae2b?auto=format&fit=crop&q=80&w=600",
                    Tours = 25, Tickets = 14, Price = 250000, PriceFormatted = "250k",
                    Description = "Hòn ngọc Viễn Đông hiện đại tràn đầy sức sống, Dinh Độc Lập, chợ Bến Thành tấp nập và du thuyền ngắm hoàng hôn sông Sài Gòn."
                },
                new() {
                    Id = 46, Name = "Bờ Biển Vũng Tàu & Quần Đảo Côn Đảo", Slug = "vung-tau-con-dao", Province = "Bà Rịa - Vũng Tàu", Region = "nam", Type = "Biển",
                    Lat = 10.3460, Lng = 107.0843, Rating = 4.8, Reviews = "7.6K",
                    Img = "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&q=80&w=600",
                    Tours = 18, Tickets = 7, Price = 450000, PriceFormatted = "450k",
                    Description = "Thành phố biển nghỉ dưỡng quen thuộc với tượng Chúa Kitô trên đỉnh núi Nhỏ, ngọn hải đăng cổ và Côn Đảo linh thiêng giữa biển cả."
                },
                new() {
                    Id = 47, Name = "Vườn Quốc Gia Cát Tiên & Thác Giang Điền", Slug = "nam-cat-tien-dong-nai", Province = "Đồng Nai", Region = "nam", Type = "Sinh thái",
                    Lat = 11.4239, Lng = 107.4331, Rating = 4.7, Reviews = "3.1K",
                    Img = "https://images.unsplash.com/photo-1432405972618-c60b0225b8f9?auto=format&fit=crop&q=80&w=600",
                    Tours = 9, Tickets = 3, Price = 550000, PriceFormatted = "550k",
                    Description = "Khu dự trữ sinh quyển thế giới với trải nghiệm xem thú đêm độc đáo, Bàu Sấu nguyên sơ và rừng gỗ cổ thụ ngàn năm tuổi."
                },
                new() {
                    Id = 48, Name = "Lạc Cảnh Đại Nam & Làng Gốm Lái Thiêu", Slug = "dai-nam-binh-duong", Province = "Bình Dương", Region = "nam", Type = "Vui chơi",
                    Lat = 11.0294, Lng = 106.6389, Rating = 4.6, Reviews = "3.8K",
                    Img = "https://images.unsplash.com/photo-1513889961551-628c1e5e2ee9?auto=format&fit=crop&q=80&w=600",
                    Tours = 8, Tickets = 5, Price = 390000, PriceFormatted = "390k",
                    Description = "Khu du lịch quy mô kỷ lục với đền thờ dát vàng, vườn bách thú mở và những làng gốm thủ công truyền thống trứ danh ven sông."
                },
                new() {
                    Id = 49, Name = "Trảng Cỏ Bù Lạch & Vườn Quốc Gia Bù Gia Mập", Slug = "bu-gia-map-binh-phuoc", Province = "Bình Phước", Region = "nam", Type = "Sinh thái",
                    Lat = 12.0167, Lng = 107.1333, Rating = 4.6, Reviews = "1.8K",
                    Img = "https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&q=80&w=600",
                    Tours = 6, Tickets = 1, Price = 620000, PriceFormatted = "620k",
                    Description = "Bức tranh thiên nhiên kỳ thú với bãi cỏ xanh ngát ôm trọn hồ nước trong vắt cùng những cánh rừng cao su bạt ngàn mùa thay lá."
                },
                new() {
                    Id = 50, Name = "Đỉnh Núi Bà Đen - Nóc Nhà Nam Bộ", Slug = "nui-ba-den-tay-ninh", Province = "Tây Ninh", Region = "nam", Type = "Núi",
                    Lat = 11.3742, Lng = 106.1706, Rating = 4.9, Reviews = "7.2K",
                    Img = "https://images.unsplash.com/photo-1559592413-7cec4d0cae2b?auto=format&fit=crop&q=80&w=600",
                    Tours = 14, Tickets = 6, Price = 450000, PriceFormatted = "450k",
                    Description = "Đỉnh núi cao nhất Đông Nam Bộ (986m) với tuyến cáp treo hiện đại, tượng Phật Bà bằng đồng lớn nhất châu Á ngự trên mây."
                },
                new() {
                    Id = 51, Name = "Làng Nổi Tân Lập & Rừng Tràm Đồng Tháp Mười", Slug = "tan-lap-long-an", Province = "Long An", Region = "nam", Type = "Sinh thái",
                    Lat = 10.6389, Lng = 106.0125, Rating = 4.6, Reviews = "2.4K",
                    Img = "https://images.unsplash.com/photo-1432405972618-c60b0225b8f9?auto=format&fit=crop&q=80&w=600",
                    Tours = 7, Tickets = 2, Price = 380000, PriceFormatted = "380k",
                    Description = "Con đường đi bộ xuyên rừng tràm dài 5km giữa đầm lầy, đi xuồng ba lá ngắm sen và thưởng thức cá lóc nướng trui thơm lừng."
                },
                new() {
                    Id = 52, Name = "Cù Lao Thới Sơn & Chợ Nổi Cái Bè", Slug = "thoi-son-tien-giang", Province = "Tiền Giang", Region = "nam", Type = "Sinh thái",
                    Lat = 10.3547, Lng = 106.3653, Rating = 4.7, Reviews = "4.5K",
                    Img = "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&q=80&w=600",
                    Tours = 16, Tickets = 4, Price = 350000, PriceFormatted = "350k",
                    Description = "Cửa ngõ miền Tây sông nước với trải nghiệm ngồi đò chèo luồn lách rặng dừa nước, nghe đờn ca tài tử và thưởng thức kẹo dừa."
                },
                new() {
                    Id = 53, Name = "Thủ Phủ Xứ Dừa & Cồn Phụng Bến Tre", Slug = "con-phung-ben-tre", Province = "Bến Tre", Region = "nam", Type = "Sinh thái",
                    Lat = 10.2417, Lng = 106.3758, Rating = 4.7, Reviews = "3.9K",
                    Img = "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&q=80&w=600",
                    Tours = 13, Tickets = 3, Price = 380000, PriceFormatted = "380k",
                    Description = "Miền quê thanh bình rợp bóng dừa xiêm, các khu du lịch sinh thái miệt vườn sông nước và kiến trúc độc đáo Đạo Dừa Cồn Phụng."
                },
                new() {
                    Id = 54, Name = "Làng Hoa Sa Đéc & Vườn Quốc Gia Tràm Chim", Slug = "sa-dec-tram-chim-dong-thap", Province = "Đồng Tháp", Region = "nam", Type = "Sinh thái",
                    Lat = 10.2947, Lng = 105.7583, Rating = 4.8, Reviews = "4.7K",
                    Img = "https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&q=80&w=600",
                    Tours = 12, Tickets = 3, Price = 490000, PriceFormatted = "490k",
                    Description = "Thủ phủ ngàn hoa rực rỡ trăm năm tuổi bên sông Tiền và khu bảo tồn Tràm Chim - nơi cư trú của loài sếu đầu đỏ quý hiếm."
                },
                new() {
                    Id = 55, Name = "Cù Lao An Bình Vườn Cây Ăn Trái", Slug = "cu-lao-an-binh-vinh-long", Province = "Vĩnh Long", Region = "nam", Type = "Sinh thái",
                    Lat = 10.2536, Lng = 105.9722, Rating = 4.6, Reviews = "2.2K",
                    Img = "https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&q=80&w=600",
                    Tours = 8, Tickets = 2, Price = 360000, PriceFormatted = "360k",
                    Description = "Ốc đảo xanh tốt quanh năm phù sa bồi đắp, thỏa thích tự tay hái chôm chôm, sầu riêng, bưởi Năm Roi tại vườn và homestay miệt vườn."
                },
                new() {
                    Id = 56, Name = "Quần Thể Chùa Khmer & Ao Bà Om", Slug = "ao-ba-om-tra-vinh", Province = "Trà Vinh", Region = "nam", Type = "Văn hóa",
                    Lat = 9.9381, Lng = 106.3458, Rating = 4.7, Reviews = "2.1K",
                    Img = "https://images.unsplash.com/photo-1509030450996-dd1a26dda07a?auto=format&fit=crop&q=80&w=600",
                    Tours = 6, Tickets = 1, Price = 390000, PriceFormatted = "390k",
                    Description = "Xứ sở của hơn 140 ngôi chùa Khmer cổ kính, mặt nước Ao Bà Om êm ả dưới bóng râm của những hàng cây sao trăm tuổi."
                },
                new() {
                    Id = 57, Name = "Khu Bảo Tồn Lung Ngọc Hoàng & Khóm Cầu Đúc", Slug = "lung-ngoc-hoang-hau-giang", Province = "Hậu Giang", Region = "nam", Type = "Sinh thái",
                    Lat = 9.7842, Lng = 105.4700, Rating = 4.6, Reviews = "1.7K",
                    Img = "https://images.unsplash.com/photo-1432405972618-c60b0225b8f9?auto=format&fit=crop&q=80&w=600",
                    Tours = 5, Tickets = 1, Price = 390000, PriceFormatted = "390k",
                    Description = "'Lá phổi xanh' của miền Tây Nam Bộ với hệ sinh thái đất ngập nước nguyên vẹn, đàn chim trời hàng nghìn con về tổ lúc hoàng hôn."
                },
                new() {
                    Id = 58, Name = "Chùa Dơi Độc Đáo & Chùa Chén Kiểu", Slug = "chua-doi-soc-trang", Province = "Sóc Trăng", Region = "nam", Type = "Văn hóa",
                    Lat = 9.6033, Lng = 105.9800, Rating = 4.7, Reviews = "3.6K",
                    Img = "https://images.unsplash.com/photo-1509030450996-dd1a26dda07a?auto=format&fit=crop&q=80&w=600",
                    Tours = 9, Tickets = 2, Price = 420000, PriceFormatted = "420k",
                    Description = "Ngôi chùa Mahatup kỳ bí nơi hàng vạn con dơi ngựa khổng lồ trú ngụ, văn hóa ẩm thực bánh pía và lễ hội Đua Ghe Ngo rực lửa."
                },
                new() {
                    Id = 59, Name = "Nhà Công Tử Bạc Liêu & Cánh Đồng Gió", Slug = "cong-tu-bac-lieu", Province = "Bạc Liêu", Region = "nam", Type = "Văn hóa",
                    Lat = 9.2942, Lng = 105.7278, Rating = 4.7, Reviews = "3.8K",
                    Img = "https://images.unsplash.com/photo-1509030450996-dd1a26dda07a?auto=format&fit=crop&q=80&w=600",
                    Tours = 8, Tickets = 2, Price = 450000, PriceFormatted = "450k",
                    Description = "Dinh thự bề thế của vị công tử đốt tiền nấu trứng lừng danh Nam Kỳ và cánh đồng điện gió ven biển khổng lồ tựa trời Âu."
                },
                new() {
                    Id = 60, Name = "Cột Cờ Mũi Cà Mau & Rừng Đước U Minh Hạ", Slug = "mui-ca-mau", Province = "Cà Mau", Region = "nam", Type = "Sinh thái",
                    Lat = 8.6111, Lng = 104.7214, Rating = 4.9, Reviews = "5.8K",
                    Img = "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&q=80&w=600",
                    Tours = 12, Tickets = 3, Price = 890000, PriceFormatted = "890k",
                    Description = "Mảnh đất cực Nam thiêng liêng hình mũi tàu hướng ra biển lớn, nơi duy nhất ngắm mặt trời mọc ở biển Đông và lặn ở biển Tây."
                },
                new() {
                    Id = 61, Name = "Đảo Ngọc Phú Quốc & Quần Đảo Nam Du", Slug = "dao-ngoc-phu-quoc", Province = "Kiên Giang", Region = "nam", Type = "Biển",
                    Lat = 10.2899, Lng = 103.9840, Rating = 4.9, Reviews = "9.9K",
                    Img = "https://images.unsplash.com/photo-1513889961551-628c1e5e2ee9?auto=format&fit=crop&q=80&w=600",
                    Tours = 38, Tickets = 18, Price = 990000, PriceFormatted = "990k",
                    Description = "Hòn đảo lớn nhất Việt Nam sở hữu Bãi Sao, Grand World 'thành phố không ngủ', cáp treo Hòn Thơm vượt biển dài nhất thế giới."
                },
                new() {
                    Id = 62, Name = "Rừng Tràm Trà Sư & Miếu Bà Chúa Xứ Núi Sam", Slug = "tra-su-an-giang", Province = "An Giang", Region = "nam", Type = "Sinh thái",
                    Lat = 10.5147, Lng = 105.0256, Rating = 4.8, Reviews = "5.2K",
                    Img = "https://images.unsplash.com/photo-1432405972618-c60b0225b8f9?auto=format&fit=crop&q=80&w=600",
                    Tours = 14, Tickets = 4, Price = 520000, PriceFormatted = "520k",
                    Description = "Rừng tràm ngập nước đẹp nhất miền Tây với thảm bèo cám xanh mướt, trung tâm tâm linh Miếu Bà Chúa Xứ Núi Sam linh thiêng đón triệu du khách."
                },
                new() {
                    Id = 63, Name = "Chợ Nổi Cái Răng & Bến Ninh Kiều Cần Thơ", Slug = "cho-noi-cai-rang-can-tho", Province = "Cần Thơ", Region = "nam", Type = "Sinh thái",
                    Lat = 10.0333, Lng = 105.7833, Rating = 4.8, Reviews = "6.7K",
                    Img = "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&q=80&w=600",
                    Tours = 20, Tickets = 6, Price = 420000, PriceFormatted = "420k",
                    Description = "Thủ phủ Tây Đô sầm uất với nét văn hóa thương hồ độc đáo tại chợ nổi lúc bình minh, cầu đi bộ Cần Thơ lung linh ánh đèn đêm."
                }
            };
        }
    }
}

