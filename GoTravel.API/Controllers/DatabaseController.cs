using System;
using System.Collections.Generic;
using System.Data;
using System.Data.Common;
using System.Diagnostics;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using GoTravel.API.Data;
using GoTravel.API.Entities;

namespace GoTravel.API.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class DatabaseController : ControllerBase
    {
        private readonly GoTravelDbContext _context;
        private readonly ILogger<DatabaseController> _logger;

        public DatabaseController(GoTravelDbContext context, ILogger<DatabaseController> logger)
        {
            _context = context;
            _logger = logger;
        }

        /// <summary>
        /// Kiểm tra trạng thái kết nối SQL Server và thống kê bản ghi các bảng
        /// GET /api/database/status
        /// </summary>
        [HttpGet("status")]
        public async Task<IActionResult> GetDatabaseStatus()
        {
            var sw = Stopwatch.StartNew();
            try
            {
                var canConnect = await _context.Database.CanConnectAsync();
                sw.Stop();

                if (!canConnect)
                {
                    return StatusCode(500, new
                    {
                        success = false,
                        message = "Không thể kết nối đến cơ sở dữ liệu SQL Server!",
                        pingMs = sw.ElapsedMilliseconds
                    });
                }

                var connection = _context.Database.GetDbConnection();
                var databaseName = connection.Database;
                var serverName = connection.DataSource;

                string sqlVersion = "N/A";
                var tableStats = new List<TableStatDto>();

                // Lấy phiên bản SQL Server và thống kê số dòng từng bảng
                await using (var command = connection.CreateCommand())
                {
                    if (connection.State != ConnectionState.Open)
                    {
                        await connection.OpenAsync();
                    }

                    // 1. Version
                    command.CommandText = "SELECT @@VERSION";
                    var versionObj = await command.ExecuteScalarAsync();
                    if (versionObj != null)
                    {
                        sqlVersion = versionObj.ToString()?.Split('\n').FirstOrDefault()?.Trim() ?? "SQL Server";
                    }

                    // 2. Table row counts
                    command.CommandText = @"
                        SELECT 
                            t.NAME AS TableName,
                            p.rows AS [RowCount]
                        FROM 
                            sys.tables t
                        INNER JOIN      
                            sys.indexes i ON t.OBJECT_ID = i.object_id
                        INNER JOIN 
                            sys.partitions p ON i.object_id = p.OBJECT_ID AND i.index_id = p.index_id
                        WHERE 
                            t.is_ms_shipped = 0 AND i.index_id <= 1
                        GROUP BY 
                            t.NAME, p.rows
                        ORDER BY 
                            t.NAME";

                    await using (var reader = await command.ExecuteReaderAsync())
                    {
                        while (await reader.ReadAsync())
                        {
                            tableStats.Add(new TableStatDto
                            {
                                TableName = reader.GetString(0),
                                RowCount = reader.GetInt64(1)
                            });
                        }
                    }
                }

                return Ok(new
                {
                    success = true,
                    status = "ONLINE",
                    server = serverName,
                    database = databaseName,
                    sqlVersion = sqlVersion,
                    pingMs = sw.ElapsedMilliseconds,
                    totalTables = tableStats.Count,
                    totalRecords = tableStats.Sum(t => t.RowCount),
                    tables = tableStats,
                    checkedAt = DateTime.UtcNow
                });
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Lỗi kiểm tra trạng thái Database SQL");
                return StatusCode(500, new
                {
                    success = false,
                    status = "ERROR",
                    error = ex.Message,
                    stackTrace = ex.StackTrace
                });
            }
        }

        /// <summary>
        /// Lấy chi tiết cấu trúc các cột của các bảng trong SQL Server
        /// GET /api/database/tables
        /// </summary>
        [HttpGet("tables")]
        public async Task<IActionResult> GetTableSchema()
        {
            try
            {
                var connection = _context.Database.GetDbConnection();
                if (connection.State != ConnectionState.Open)
                {
                    await connection.OpenAsync();
                }

                var columns = new List<object>();

                await using (var command = connection.CreateCommand())
                {
                    command.CommandText = @"
                        SELECT 
                            TABLE_NAME, 
                            COLUMN_NAME, 
                            DATA_TYPE, 
                            IS_NULLABLE,
                            CHARACTER_MAXIMUM_LENGTH
                        FROM INFORMATION_SCHEMA.COLUMNS
                        ORDER BY TABLE_NAME, ORDINAL_POSITION";

                    await using (var reader = await command.ExecuteReaderAsync())
                    {
                        while (await reader.ReadAsync())
                        {
                            columns.Add(new
                            {
                                table = reader.GetString(0),
                                column = reader.GetString(1),
                                dataType = reader.GetString(2),
                                isNullable = reader.GetString(3) == "YES",
                                maxLength = reader.IsDBNull(4) ? (int?)null : Convert.ToInt32(reader[4])
                            });
                        }
                    }
                }

                var grouped = columns
                    .GroupBy(c => ((dynamic)c).table)
                    .Select(g => new
                    {
                        tableName = g.Key,
                        columnCount = g.Count(),
                        columns = g.ToList()
                    });

                return Ok(new
                {
                    success = true,
                    database = connection.Database,
                    tables = grouped
                });
            }
            catch (Exception ex)
            {
                return StatusCode(500, new { success = false, error = ex.Message });
            }
        }

        /// <summary>
        /// Nạp thêm dữ liệu mẫu tiếng Việt vào SQL Server (Tours, Điểm đến, Khách hàng, Vouchers, AI Messages)
        /// POST /api/database/seed
        /// </summary>
        [HttpPost("seed")]
        public async Task<IActionResult> SeedDatabase()
        {
            try
            {
                int addedCount = 0;

                // 1. Seed Roles nếu chưa có
                if (!await _context.Roles.AnyAsync())
                {
                    _context.Roles.AddRange(
                        new Role { Name = "SuperAdmin", Description = "Quản trị viên cấp cao" },
                        new Role { Name = "Staff", Description = "Nhân viên điều hành" },
                        new Role { Name = "Customer", Description = "Khách hàng du lịch" }
                    );
                    await _context.SaveChangesAsync();
                    addedCount += 3;
                }

                // 2. Seed Users mẫu
                if (!await _context.Users.AnyAsync())
                {
                    var adminRole = await _context.Roles.FirstOrDefaultAsync(r => r.Name == "SuperAdmin");
                    var customerRole = await _context.Roles.FirstOrDefaultAsync(r => r.Name == "Customer");

                    _context.Users.AddRange(
                        new User
                        {
                            FullName = "Admin Nguyễn Trường Luận",
                            Email = "admin@gotravel.vn",
                            PhoneNumber = "0912345678",
                            PasswordHash = BCrypt.Net.BCrypt.HashPassword("Admin@123"),
                            RoleId = adminRole?.Id ?? 1,
                            IsActive = true,
                            CreatedAt = DateTime.UtcNow
                        },
                        new User
                        {
                            FullName = "Khách Hàng Trần Văn Nam",
                            Email = "nam.tran@gmail.com",
                            PhoneNumber = "0987654321",
                            PasswordHash = BCrypt.Net.BCrypt.HashPassword("User@123"),
                            RoleId = customerRole?.Id ?? 3,
                            IsActive = true,
                            CreatedAt = DateTime.UtcNow
                        }
                    );
                    await _context.SaveChangesAsync();
                    addedCount += 2;
                }

                // 3. Seed Destinations nếu trống
                if (!await _context.Destinations.AnyAsync())
                {
                    _context.Destinations.AddRange(
                        new Destination { Name = "Đà Nẵng", Slug = "da-nang", Province = "Đà Nẵng", Region = "Miền Trung", Description = "Thành phố đáng sống với biển Mỹ Khê, Cầu Vàng và Bà Nà Hills tuyệt đẹp.", MainImage = "https://images.unsplash.com/photo-1559592413-7cec4d0cae2b?w=600", Status = "Active" },
                        new Destination { Name = "Phú Quốc", Slug = "phu-quoc", Province = "Kiên Giang", Region = "Miền Nam", Description = "Đảo ngọc thiên đường với hoàng hôn Bãi Trường, Grand World và cáp treo Hòn Thơm.", MainImage = "https://images.unsplash.com/photo-1540555700478-4be289fbecef?w=600", Status = "Active" },
                        new Destination { Name = "Hạ Long", Slug = "ha-long", Province = "Quảng Ninh", Region = "Miền Bắc", Description = "Kỳ quan thiên nhiên thế giới với hàng nghìn đảo đá vôi kỳ vĩ trên vịnh xanh.", MainImage = "https://images.unsplash.com/photo-1528127269322-539801943592?w=600", Status = "Active" },
                        new Destination { Name = "Sa Pa", Slug = "sa-pa", Province = "Lào Cai", Region = "Miền Bắc", Description = "Thị trấn sương mờ với đỉnh Fansipan hùng vĩ và ruộng bậc thang Mường Hoa.", MainImage = "https://images.unsplash.com/photo-1509316975850-ff9c5deb0cd9?w=600", Status = "Active" }
                    );
                    await _context.SaveChangesAsync();
                    addedCount += 4;
                }

                // 4. Seed Tours phong phú nếu < 3 tour
                if (await _context.Tours.CountAsync() < 3)
                {
                    _context.Tours.AddRange(
                        new Tour
                        {
                            Name = "Tour Đà Nẵng - Bà Nà Hills - Cầu Vàng 4N3Đ",
                            Slug = "tour-da-nang-ba-na-hills-4n3d",
                            Code = "TDN-4N3D-01",
                            Description = "Khám phá thành phố biển đáng sống nhất Việt Nam, cáp treo Bà Nà Hills, Cầu Rồng phun lửa.",
                            DurationDays = 4,
                            DurationNights = 3,
                            DepartureCity = "TP. Hồ Chí Minh",
                            Transport = "Máy bay khứ hồi Vietjet / Vietnam Airlines",
                            AdultPrice = 4590000,
                            ChildPrice = 3290000,
                            InfantPrice = 500000,
                            Rating = 4.9,
                            ReviewCount = 88,
                            Status = "Active",
                            CreatedAt = DateTime.UtcNow
                        },
                        new Tour
                        {
                            Name = "Tour Phú Quốc Grand World - Cáp Treo Hòn Thơm 3N2Đ",
                            Slug = "tour-phu-quoc-grand-world-3n2d",
                            Code = "TPQ-3N2D-02",
                            Description = "Nghỉ dưỡng đảo ngọc, vui chơi thành phố không ngủ Grand World, lặn ngắm san hô 4 đảo.",
                            DurationDays = 3,
                            DurationNights = 2,
                            DepartureCity = "Hà Nội / TP.HCM",
                            Transport = "Máy bay",
                            AdultPrice = 3890000,
                            ChildPrice = 2890000,
                            InfantPrice = 400000,
                            Rating = 4.85,
                            ReviewCount = 64,
                            Status = "Active",
                            CreatedAt = DateTime.UtcNow
                        },
                        new Tour
                        {
                            Name = "Tour Hạ Long Du Thuyền 5 Sao Ngủ Đêm 2N1Đ",
                            Slug = "tour-ha-long-du-thuyen-5-sao-2n1d",
                            Code = "THL-2N1D-03",
                            Description = "Trải nghiệm du thuyền sang trọng 5 sao, chèo kayak hang Luồn, ngắm hoàng hôn vịnh Hạ Long.",
                            DurationDays = 2,
                            DurationNights = 1,
                            DepartureCity = "Hà Nội",
                            Transport = "Xe Limousine VIP",
                            AdultPrice = 2750000,
                            ChildPrice = 1950000,
                            InfantPrice = 0,
                            Rating = 4.95,
                            ReviewCount = 120,
                            Status = "Active",
                            CreatedAt = DateTime.UtcNow
                        }
                    );
                    await _context.SaveChangesAsync();
                    addedCount += 3;
                }

                // 5. Seed Tour Departures cho các Tour hiện có nếu chưa có
                var tours = await _context.Tours.Include(t => t.Departures).ToListAsync();
                foreach (var tour in tours)
                {
                    if (tour.Departures.Count == 0)
                    {
                        var now = DateTime.UtcNow;
                        _context.TourDepartures.AddRange(
                            new TourDeparture
                            {
                                TourId = tour.Id,
                                StartDate = now.AddDays(7),
                                EndDate = now.AddDays(7 + tour.DurationDays),
                                AdultPrice = tour.AdultPrice,
                                ChildPrice = tour.ChildPrice,
                                InfantPrice = tour.InfantPrice,
                                TotalSeats = 30,
                                AvailableSeats = 22,
                                Status = "Active"
                            },
                            new TourDeparture
                            {
                                TourId = tour.Id,
                                StartDate = now.AddDays(14),
                                EndDate = now.AddDays(14 + tour.DurationDays),
                                AdultPrice = tour.AdultPrice,
                                ChildPrice = tour.ChildPrice,
                                InfantPrice = tour.InfantPrice,
                                TotalSeats = 30,
                                AvailableSeats = 28,
                                Status = "Active"
                            }
                        );
                        addedCount += 2;
                    }
                }
                await _context.SaveChangesAsync();

                return Ok(new
                {
                    success = true,
                    message = "Nạp dữ liệu mẫu vào SQL Server Database thành công!",
                    recordsAdded = addedCount,
                    totalTours = await _context.Tours.CountAsync(),
                    totalDestinations = await _context.Destinations.CountAsync(),
                    totalUsers = await _context.Users.CountAsync(),
                    totalDepartures = await _context.TourDepartures.CountAsync()
                });
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Lỗi khi seed dữ liệu SQL");
                return StatusCode(500, new { success = false, error = ex.Message });
            }
        }

        /// <summary>
        /// Thực thi câu lệnh SQL SELECT kiểm tra an toàn và trả về dữ liệu JSON
        /// POST /api/database/query
        /// Body: { "query": "SELECT TOP 10 Id, Name, AdultPrice, Status FROM Tours" }
        /// </summary>
        [HttpPost("query")]
        public async Task<IActionResult> ExecuteSqlQuery([FromBody] SqlQueryRequest request)
        {
            if (string.IsNullOrWhiteSpace(request?.Query))
            {
                return BadRequest(new { success = false, message = "Vui lòng nhập câu lệnh SQL!" });
            }

            var trimmed = request.Query.Trim();

            // Bảo mật an toàn: chỉ cho phép SELECT câu lệnh đọc dữ liệu
            if (!trimmed.StartsWith("SELECT", StringComparison.OrdinalIgnoreCase))
            {
                return BadRequest(new
                {
                    success = false,
                    message = "Chỉ cho phép thực thi câu lệnh SQL bắt đầu bằng 'SELECT' để đảm bảo an toàn cơ sở dữ liệu!"
                });
            }

            var sw = Stopwatch.StartNew();
            try
            {
                var connection = _context.Database.GetDbConnection();
                if (connection.State != ConnectionState.Open)
                {
                    await connection.OpenAsync();
                }

                var results = new List<Dictionary<string, object?>>();

                await using (var command = connection.CreateCommand())
                {
                    command.CommandText = trimmed;
                    await using (var reader = await command.ExecuteReaderAsync())
                    {
                        while (await reader.ReadAsync())
                        {
                            var row = new Dictionary<string, object?>();
                            for (int i = 0; i < reader.FieldCount; i++)
                            {
                                var colName = reader.GetName(i);
                                row[colName] = reader.IsDBNull(i) ? null : reader.GetValue(i);
                            }
                            results.Add(row);
                        }
                    }
                }
                sw.Stop();

                return Ok(new
                {
                    success = true,
                    query = trimmed,
                    executionTimeMs = sw.ElapsedMilliseconds,
                    rowCount = results.Count,
                    data = results
                });
            }
            catch (Exception ex)
            {
                return StatusCode(500, new
                {
                    success = false,
                    query = trimmed,
                    error = ex.Message
                });
            }
        }

        /// <summary>
        /// Endpoint kiểm tra nhanh tình trạng SQL
        /// GET /api/database/health
        /// </summary>
        [HttpGet("health")]
        public async Task<IActionResult> Health()
        {
            var canConnect = await _context.Database.CanConnectAsync();
            return Ok(new
            {
                status = canConnect ? "UP" : "DOWN",
                provider = "Microsoft SQL Server",
                database = _context.Database.GetDbConnection().Database,
                timestamp = DateTime.UtcNow
            });
        }
    }

    public class TableStatDto
    {
        public string TableName { get; set; } = string.Empty;
        public long RowCount { get; set; }
    }

    public class SqlQueryRequest
    {
        public string Query { get; set; } = string.Empty;
    }
}
