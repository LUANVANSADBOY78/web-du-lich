using Microsoft.AspNetCore.Authentication.Cookies;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;
using Microsoft.OpenApi;
using System.Security.Claims;
using System.Text;
using System.Text.Json.Serialization;
using StudentManagement.Data;
using StudentManagement.Hubs;
using StudentManagement.Middleware;
using StudentManagement.Models;
using StudentManagement.Repositories;
using StudentManagement.Services;

var builder = WebApplication.CreateBuilder(args);
builder.Configuration.AddUserSecrets<Program>(optional: true);
var connectionString = builder.Configuration.GetConnectionString("DefaultConnection");

builder.Services.AddDbContext<AppDbContext>(options => options.UseSqlServer(connectionString));

builder.Services.AddSignalR();
builder.Services.AddHttpClient();
builder.Services.AddMemoryCache();
builder.Services.AddControllers().AddJsonOptions(options =>
options.JsonSerializerOptions.Converters.Add(new JsonStringEnumConverter()));
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen(options =>
{
    options.SwaggerDoc("v1", new OpenApiInfo { Title = "Medika Clinic API", Version = "v1" });

    options.AddSecurityDefinition("Bearer", new OpenApiSecurityScheme
    {
        Name = "Authorization",
        Type = SecuritySchemeType.Http,
        Scheme = "Bearer",
        BearerFormat = "JWT",
        In = ParameterLocation.Header,
        Description = "Nhập trực tiếp chuỗi Token thu được sau khi Login."
    });

    options.AddSecurityRequirement(document => new OpenApiSecurityRequirement
    {
        [new OpenApiSecuritySchemeReference("Bearer", document)] = new List<string>()
    });
});
var jwtSettings = builder.Configuration.GetSection("JwtSettings");
var secretKey = jwtSettings["SecretKey"]
    ?? throw new InvalidOperationException("JwtSettings:SecretKey chưa được cấu hình.");
var issuer = jwtSettings["Issuer"]
    ?? throw new InvalidOperationException("JwtSettings:Issuer chưa được cấu hình.");
var audience = jwtSettings["Audience"]
    ?? throw new InvalidOperationException("JwtSettings:Audience chưa được cấu hình.");
var expiryMinutes = jwtSettings.GetValue<int?>("ExpiryMinutes")
    ?? throw new InvalidOperationException("JwtSettings:ExpiryMinutes chưa được cấu hình.");

if (Encoding.UTF8.GetByteCount(secretKey) < 32)
    throw new InvalidOperationException("JwtSettings:SecretKey phải có ít nhất 32 byte.");
if (expiryMinutes <= 0)
    throw new InvalidOperationException("JwtSettings:ExpiryMinutes phải lớn hơn 0.");

const string cookieOrBearerScheme = "CookieOrBearer";
builder.Services.AddAuthentication(options =>
{
    options.DefaultScheme = cookieOrBearerScheme;
    options.DefaultAuthenticateScheme = cookieOrBearerScheme;
    options.DefaultChallengeScheme = cookieOrBearerScheme;
    options.DefaultSignInScheme = CookieAuthenticationDefaults.AuthenticationScheme;
})
.AddPolicyScheme(cookieOrBearerScheme, cookieOrBearerScheme, options =>
{
    options.ForwardDefaultSelector = context =>
        context.Request.Headers.Authorization.ToString().StartsWith("Bearer ", StringComparison.OrdinalIgnoreCase)
            ? JwtBearerDefaults.AuthenticationScheme
            : CookieAuthenticationDefaults.AuthenticationScheme;
})
.AddCookie(options =>
{
options.LoginPath = "/login.html";
options.AccessDeniedPath = "/forbidden.html";
options.Cookie.Name = "Medika.Auth";
options.SlidingExpiration = true;
options.ExpireTimeSpan = TimeSpan.FromHours(8);
options.Events.OnRedirectToLogin = context =>
{
context.Response.StatusCode = StatusCodes.Status401Unauthorized;
return Task.CompletedTask;
};
options.Events.OnRedirectToAccessDenied = context =>
{
context.Response.StatusCode = StatusCodes.Status403Forbidden;
return Task.CompletedTask;
};
})
.AddJwtBearer(options =>
{
    options.TokenValidationParameters = new TokenValidationParameters
    {
        ValidateIssuer = true,
        ValidateAudience = true,
        ValidateLifetime = true,
        ValidateIssuerSigningKey = true,
        ValidIssuer = issuer,
        ValidAudience = audience,
        IssuerSigningKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(secretKey)),
        NameClaimType = ClaimTypes.Name,
        RoleClaimType = ClaimTypes.Role
    };
});
builder.Services.AddAuthorization();
builder.Services.AddScoped<IAuthRepository, AuthRepository>();
builder.Services.AddScoped<IUserRepository, UserRepository>();
builder.Services.AddScoped<IAuthService, AuthService>();
builder.Services.AddScoped<IUserService, UserService>();
builder.Services.AddScoped<IPatientManager, PatientManager>();
builder.Services.AddScoped<IDoctorService, DoctorService>();
builder.Services.AddScoped<IAppointmentService, AppointmentService>();
builder.Services.AddScoped<IMedicalRecordService, MedicalRecordService>();
builder.Services.AddScoped<IScheduleService, ScheduleService>();
builder.Services.AddScoped<ISupportService, SupportService>();
builder.Services.AddScoped<INotificationService, NotificationService>();
builder.Services.AddScoped<IDoctorLeaveService, DoctorLeaveService>();
builder.Services.AddScoped<IDashboardService, DashboardService>();
builder.Services.AddScoped<IReviewService, ReviewService>();
builder.Services.AddScoped<IChatbotService, ChatbotService>();
builder.Services.AddScoped<IChatService, ChatService>();
builder.Services.AddScoped<IAuditLogService, AuditLogService>();
builder.Services.AddScoped<IInvoiceService, InvoiceService>();
builder.Services.AddScoped<IJwtTokenService, JwtTokenService>();
builder.Services.AddScoped<IFileRepository, FileRepository>();
builder.Services.AddScoped<IFileService, FileService>();
builder.Services.AddScoped<IOtcPharmacyService, OtcPharmacyService>();

var app = builder.Build();

using (var scope = app.Services.CreateScope())
{
    try
    {
        var db = scope.ServiceProvider.GetRequiredService<AppDbContext>();
        db.Database.EnsureCreated();

        var migrationSql = @"
        IF NOT EXISTS (SELECT * FROM sys.columns WHERE object_id = OBJECT_ID('Doctors') AND name = 'Degree')
            ALTER TABLE Doctors ADD Degree NVARCHAR(MAX) NOT NULL DEFAULT 'Bác sĩ CKI';

        IF NOT EXISTS (SELECT * FROM sys.columns WHERE object_id = OBJECT_ID('Doctors') AND name = 'ExperienceYears')
            ALTER TABLE Doctors ADD ExperienceYears INT NOT NULL DEFAULT 5;

        IF NOT EXISTS (SELECT * FROM sys.columns WHERE object_id = OBJECT_ID('Doctors') AND name = 'IsActive')
            ALTER TABLE Doctors ADD IsActive BIT NOT NULL DEFAULT 1;

        IF NOT EXISTS (SELECT * FROM sys.columns WHERE object_id = OBJECT_ID('Users') AND name = 'IsLocked')
            ALTER TABLE Users ADD IsLocked BIT NOT NULL DEFAULT 0;

        IF NOT EXISTS (SELECT * FROM sys.columns WHERE object_id = OBJECT_ID('Users') AND name = 'CreatedAt')
            ALTER TABLE Users ADD CreatedAt DATETIME2 NOT NULL DEFAULT GETDATE();

        IF NOT EXISTS (SELECT * FROM sys.columns WHERE object_id = OBJECT_ID('Users') AND name = 'DoctorId')
            ALTER TABLE Users ADD DoctorId INT NULL;

        IF NOT EXISTS (SELECT * FROM sys.foreign_keys WHERE name = 'FK_Users_Doctors_DoctorId')
            EXEC(N'ALTER TABLE Users ADD CONSTRAINT FK_Users_Doctors_DoctorId FOREIGN KEY (DoctorId) REFERENCES Doctors(Id)');

        IF NOT EXISTS (SELECT * FROM sys.indexes WHERE name = 'IX_Users_DoctorId' AND object_id = OBJECT_ID('Users'))
            EXEC(N'CREATE UNIQUE INDEX IX_Users_DoctorId ON Users(DoctorId) WHERE DoctorId IS NOT NULL');

        IF NOT EXISTS (SELECT * FROM sys.columns WHERE object_id = OBJECT_ID('Patients') AND name = 'InsuranceNumber')
            ALTER TABLE Patients ADD InsuranceNumber NVARCHAR(MAX) NOT NULL DEFAULT '';

        IF NOT EXISTS (SELECT * FROM sys.columns WHERE object_id = OBJECT_ID('MedicalRecords') AND name = 'BloodPressure')
            ALTER TABLE MedicalRecords ADD BloodPressure NVARCHAR(MAX) NULL;

        IF NOT EXISTS (SELECT * FROM sys.columns WHERE object_id = OBJECT_ID('MedicalRecords') AND name = 'HeartRate')
            ALTER TABLE MedicalRecords ADD HeartRate INT NULL;
        ELSE IF EXISTS (SELECT * FROM sys.columns c JOIN sys.types t ON c.user_type_id = t.user_type_id WHERE c.object_id = OBJECT_ID('MedicalRecords') AND c.name = 'HeartRate' AND t.name LIKE '%varchar%')
        BEGIN
            UPDATE MedicalRecords SET HeartRate = NULL WHERE HeartRate = '' OR ISNUMERIC(HeartRate) = 0;
            ALTER TABLE MedicalRecords ALTER COLUMN HeartRate INT NULL;
        END;

        IF NOT EXISTS (SELECT * FROM sys.columns WHERE object_id = OBJECT_ID('MedicalRecords') AND name = 'Temperature')
            ALTER TABLE MedicalRecords ADD Temperature FLOAT NULL;
        ELSE IF EXISTS (SELECT * FROM sys.columns c JOIN sys.types t ON c.user_type_id = t.user_type_id WHERE c.object_id = OBJECT_ID('MedicalRecords') AND c.name = 'Temperature' AND t.name LIKE '%varchar%')
        BEGIN
            UPDATE MedicalRecords SET Temperature = NULL WHERE Temperature = '' OR ISNUMERIC(Temperature) = 0;
            ALTER TABLE MedicalRecords ALTER COLUMN Temperature FLOAT NULL;
        END;

        IF NOT EXISTS (SELECT * FROM sys.columns WHERE object_id = OBJECT_ID('MedicalRecords') AND name = 'Weight')
            ALTER TABLE MedicalRecords ADD Weight FLOAT NULL;
        ELSE IF EXISTS (SELECT * FROM sys.columns c JOIN sys.types t ON c.user_type_id = t.user_type_id WHERE c.object_id = OBJECT_ID('MedicalRecords') AND c.name = 'Weight' AND t.name LIKE '%varchar%')
        BEGIN
            UPDATE MedicalRecords SET Weight = NULL WHERE Weight = '' OR ISNUMERIC(Weight) = 0;
            ALTER TABLE MedicalRecords ALTER COLUMN Weight FLOAT NULL;
        END;

        IF NOT EXISTS (SELECT * FROM sys.tables WHERE name = 'Reviews')
        BEGIN
            CREATE TABLE Reviews (
                Id INT IDENTITY(1,1) PRIMARY KEY,
                DoctorId INT NOT NULL,
                PatientId INT NOT NULL,
                UserId INT NULL,
                AppointmentId INT NULL,
                Rating INT NOT NULL,
                Comment NVARCHAR(MAX) NOT NULL DEFAULT '',
                IsHidden BIT NOT NULL DEFAULT 0,
                CreatedAt DATETIME2 NOT NULL DEFAULT GETDATE(),
                CONSTRAINT FK_Reviews_Doctors_DoctorId FOREIGN KEY (DoctorId) REFERENCES Doctors(Id),
                CONSTRAINT FK_Reviews_Patients_PatientId FOREIGN KEY (PatientId) REFERENCES Patients(Id),
                CONSTRAINT FK_Reviews_Users_UserId FOREIGN KEY (UserId) REFERENCES Users(Id) ON DELETE NO ACTION,
                CONSTRAINT FK_Reviews_Appointments_AppointmentId FOREIGN KEY (AppointmentId) REFERENCES Appointments(Id) ON DELETE NO ACTION
            );
        END;

        IF NOT EXISTS (SELECT * FROM sys.columns WHERE object_id = OBJECT_ID('MedicalRecords') AND name = 'TreatmentPlan')
            ALTER TABLE MedicalRecords ADD TreatmentPlan NVARCHAR(MAX) NULL;

        IF NOT EXISTS (SELECT * FROM sys.columns WHERE object_id = OBJECT_ID('MedicalRecords') AND name = 'FollowUpDate')
            ALTER TABLE MedicalRecords ADD FollowUpDate DATETIME2 NULL;

        IF NOT EXISTS (SELECT * FROM sys.columns WHERE object_id = OBJECT_ID('MedicalRecords') AND name = 'LabTests')
            ALTER TABLE MedicalRecords ADD LabTests NVARCHAR(MAX) NULL;

        IF NOT EXISTS (SELECT * FROM sys.tables WHERE name = 'AuditLogs')
        BEGIN
            CREATE TABLE AuditLogs (
                Id INT IDENTITY(1,1) PRIMARY KEY,
                Action NVARCHAR(MAX) NOT NULL,
                PerformedBy NVARCHAR(MAX) NOT NULL,
                Role NVARCHAR(MAX) NOT NULL,
                Details NVARCHAR(MAX) NOT NULL,
                CreatedAt DATETIME2 NOT NULL DEFAULT GETDATE()
            );
        END;

        IF NOT EXISTS (SELECT * FROM sys.columns WHERE object_id = OBJECT_ID('AuditLogs') AND name = 'CreatedAt')
        BEGIN
            IF EXISTS (SELECT * FROM sys.columns WHERE object_id = OBJECT_ID('AuditLogs') AND name = 'Timestamp')
            BEGIN
                EXEC(N'ALTER TABLE AuditLogs ADD CreatedAt DATETIME2 NULL');
                EXEC(N'UPDATE AuditLogs SET CreatedAt = [Timestamp] WHERE CreatedAt IS NULL');
                EXEC(N'ALTER TABLE AuditLogs ALTER COLUMN CreatedAt DATETIME2 NOT NULL');
                EXEC(N'ALTER TABLE AuditLogs ADD CONSTRAINT DF_AuditLogs_CreatedAt DEFAULT GETDATE() FOR CreatedAt');
            END
            ELSE
            BEGIN
                ALTER TABLE AuditLogs ADD CreatedAt DATETIME2 NOT NULL DEFAULT GETDATE();
            END;
        END;

        IF NOT EXISTS (SELECT * FROM sys.tables WHERE name = 'Invoices')
        BEGIN
            CREATE TABLE Invoices (
                Id INT IDENTITY(1,1) PRIMARY KEY,
                AppointmentId INT NOT NULL,
                PatientId INT NOT NULL,
                Amount DECIMAL(18,2) NOT NULL,
                Status NVARCHAR(MAX) NOT NULL,
                PaymentMethod NVARCHAR(MAX) NOT NULL,
                CreatedAt DATETIME2 NOT NULL DEFAULT GETDATE(),
                PaidAt DATETIME2 NULL,
                Notes NVARCHAR(MAX) NOT NULL
            );
        END;

        IF NOT EXISTS (SELECT * FROM sys.tables WHERE name = 'StoredFiles')
        BEGIN
            CREATE TABLE StoredFiles (
                Id INT IDENTITY(1,1) PRIMARY KEY,
                FileName NVARCHAR(MAX) NOT NULL,
                ContentType NVARCHAR(MAX) NOT NULL,
                Content VARBINARY(MAX) NOT NULL,
                Length BIGINT NOT NULL,
                UploadedAt DATETIME2 NOT NULL DEFAULT GETDATE()
            );
        END;
        IF NOT EXISTS (SELECT * FROM sys.columns WHERE object_id = OBJECT_ID('Doctors') AND name = 'UserId')
            ALTER TABLE Doctors ADD UserId INT NULL;

        IF NOT EXISTS (SELECT * FROM sys.columns WHERE object_id = OBJECT_ID('Users') AND name = 'RewardPoints')
            ALTER TABLE Users ADD RewardPoints INT NOT NULL DEFAULT 0;

        IF NOT EXISTS (SELECT * FROM sys.columns WHERE object_id = OBJECT_ID('Patients') AND name = 'RewardPoints')
            ALTER TABLE Patients ADD RewardPoints INT NOT NULL DEFAULT 0;

        IF NOT EXISTS (SELECT * FROM sys.columns WHERE object_id = OBJECT_ID('Appointments') AND name = 'BookingFee')
            ALTER TABLE Appointments ADD BookingFee DECIMAL(18,2) NOT NULL DEFAULT 100000;

        IF NOT EXISTS (SELECT * FROM sys.columns WHERE object_id = OBJECT_ID('Appointments') AND name = 'PointsUsed')
            ALTER TABLE Appointments ADD PointsUsed INT NOT NULL DEFAULT 0;

        IF NOT EXISTS (SELECT * FROM sys.columns WHERE object_id = OBJECT_ID('Appointments') AND name = 'DiscountAmount')
            ALTER TABLE Appointments ADD DiscountAmount DECIMAL(18,2) NOT NULL DEFAULT 0;

        IF NOT EXISTS (SELECT * FROM sys.columns WHERE object_id = OBJECT_ID('Appointments') AND name = 'FinalBookingFee')
            ALTER TABLE Appointments ADD FinalBookingFee DECIMAL(18,2) NOT NULL DEFAULT 100000;

        IF NOT EXISTS (SELECT * FROM sys.columns WHERE object_id = OBJECT_ID('Invoices') AND name = 'PointsEarned')
            ALTER TABLE Invoices ADD PointsEarned INT NOT NULL DEFAULT 0;

        IF NOT EXISTS (SELECT * FROM sys.tables WHERE name = 'OtcProducts')
        BEGIN
            CREATE TABLE OtcProducts (
                Id INT IDENTITY(1,1) PRIMARY KEY,
                Name NVARCHAR(250) NOT NULL,
                Category NVARCHAR(100) NOT NULL,
                Price DECIMAL(18,2) NOT NULL,
                Unit NVARCHAR(50) NOT NULL DEFAULT N'Hộp',
                Description NVARCHAR(MAX) NOT NULL DEFAULT '',
                Usage NVARCHAR(MAX) NOT NULL DEFAULT '',
                Manufacturer NVARCHAR(200) NOT NULL DEFAULT '',
                Stock INT NOT NULL DEFAULT 100,
                IsActive BIT NOT NULL DEFAULT 1,
                IsOtcOnly BIT NOT NULL DEFAULT 1,
                ImageUrl NVARCHAR(500) NOT NULL DEFAULT ''
            );
        END;

        IF NOT EXISTS (SELECT * FROM sys.tables WHERE name = 'OtcOrders')
        BEGIN
            CREATE TABLE OtcOrders (
                Id INT IDENTITY(1,1) PRIMARY KEY,
                UserId INT NULL,
                CustomerName NVARCHAR(150) NOT NULL,
                CustomerPhone NVARCHAR(50) NOT NULL,
                DeliveryAddress NVARCHAR(300) NOT NULL,
                SubTotal DECIMAL(18,2) NOT NULL,
                PointsUsed INT NOT NULL DEFAULT 0,
                DiscountAmount DECIMAL(18,2) NOT NULL DEFAULT 0,
                TotalAmount DECIMAL(18,2) NOT NULL,
                PointsEarned INT NOT NULL DEFAULT 0,
                PaymentMethod NVARCHAR(50) NOT NULL DEFAULT 'COD',
                Status NVARCHAR(50) NOT NULL DEFAULT 'Paid',
                CreatedAt DATETIME2 NOT NULL DEFAULT GETDATE()
            );
        END;

        IF NOT EXISTS (SELECT * FROM sys.tables WHERE name = 'OtcOrderItems')
        BEGIN
            CREATE TABLE OtcOrderItems (
                Id INT IDENTITY(1,1) PRIMARY KEY,
                OtcOrderId INT NOT NULL,
                OtcProductId INT NOT NULL,
                ProductName NVARCHAR(250) NOT NULL,
                Quantity INT NOT NULL,
                UnitPrice DECIMAL(18,2) NOT NULL,
                TotalPrice DECIMAL(18,2) NOT NULL,
                CONSTRAINT FK_OtcOrderItems_OtcOrders FOREIGN KEY (OtcOrderId) REFERENCES OtcOrders(Id) ON DELETE CASCADE,
                CONSTRAINT FK_OtcOrderItems_OtcProducts FOREIGN KEY (OtcProductId) REFERENCES OtcProducts(Id)
            );
        END;

        IF EXISTS (SELECT * FROM sys.database_scoped_configurations WHERE name = 'IDENTITY_CACHE' AND value = 1)
        BEGIN
            EXEC(N'ALTER DATABASE SCOPED CONFIGURATION SET IDENTITY_CACHE = OFF');
        END;
        ";

        db.Database.ExecuteSqlRaw(migrationSql);

        var docUser = db.Users.FirstOrDefault(u => u.Username == "doctor");
        if (docUser != null)
        {
            var firstDoc = db.Doctors.FirstOrDefault(d => d.IsActive);
            if (firstDoc != null)
            {
                if (docUser.DoctorId == null) docUser.DoctorId = firstDoc.Id;
                if (firstDoc.UserId == null) firstDoc.UserId = docUser.Id;
                db.SaveChanges();
            }
        }

        var doctorsToSync = db.Doctors.Where(d => d.UserId == null).ToList();
        foreach (var doc in doctorsToSync)
        {
            var matchedUser = db.Users.FirstOrDefault(u => u.DoctorId == doc.Id);
            if (matchedUser != null)
            {
                doc.UserId = matchedUser.Id;
            }
        }
        db.SaveChanges();

        if (!db.OtcProducts.Any())
        {
            db.OtcProducts.AddRange(new List<OtcProduct>
            {
                new() { Name = "Panadol Extra (Đỏ)", Category = "Giảm đau - Hạ sốt", Price = 45000, Unit = "Hộp 120 viên", Description = "Giảm đau nhức, đau đầu và hạ sốt nhanh chóng.", Usage = "Uống 1-2 viên mỗi 4-6 giờ khi cần.", Manufacturer = "GSK", Stock = 200, IsActive = true, IsOtcOnly = true },
                new() { Name = "Paracetamol 500mg Dược Hậu Giang", Category = "Giảm đau - Hạ sốt", Price = 35000, Unit = "Hộp 100 viên", Description = "Thuốc hạ sốt và giảm đau thông dụng an toàn.", Usage = "Uống 1 viên khi sốt trên 38.5 độ C.", Manufacturer = "DHG Pharma", Stock = 300, IsActive = true, IsOtcOnly = true },
                new() { Name = "Berberin 100mg", Category = "Tiêu hóa", Price = 25000, Unit = "Lọ 100 viên", Description = "Kháng khuẩn đường ruột, điều trị tiêu chảy, rối loạn tiêu hóa.", Usage = "Uống 2-4 viên/lần, ngày 2 lần sau bữa ăn.", Manufacturer = "OPC", Stock = 150, IsActive = true, IsOtcOnly = true },
                new() { Name = "Oresol 245", Category = "Tiêu hóa", Price = 30000, Unit = "Hộp 20 gói", Description = "Bù nước và các chất điện giải khi sốt cao hoặc tiêu chảy.", Usage = "Pha 1 gói vào 200ml nước đun sôi để nguội.", Manufacturer = "DHG Pharma", Stock = 250, IsActive = true, IsOtcOnly = true },
                new() { Name = "Siro ho thảo dược Prospan", Category = "Tai Mũi Họng", Price = 85000, Unit = "Chai 100ml", Description = "Trị ho khan, ho có đờm, chiết xuất lá thường xuân Đức.", Usage = "Uống 5ml/lần, ngày 3 lần.", Manufacturer = "Engelhard Arzneimittel", Stock = 120, IsActive = true, IsOtcOnly = true },
                new() { Name = "Nước muối sinh lý Natri Clorid 0.9%", Category = "Tai Mũi Họng", Price = 10000, Unit = "Chai 500ml", Description = "Súc miệng, rửa mũi, vệ sinh kháng khuẩn đường thở.", Usage = "Dùng súc họng hoặc nhỏ mũi nhiều lần trong ngày.", Manufacturer = "Pharmacity", Stock = 500, IsActive = true, IsOtcOnly = true },
                new() { Name = "Vitamin C 500mg (Dạng sủi)", Category = "Vitamin & Khoáng chất", Price = 60000, Unit = "Tuýp 20 viên", Description = "Tăng cường sức đề kháng và giảm mệt mỏi.", Usage = "Hòa tan 1 viên vào 200ml nước lọc, uống sau bữa ăn sáng.", Manufacturer = "Bayer", Stock = 180, IsActive = true, IsOtcOnly = true }
            });
            db.SaveChanges();
        }


    }
    catch (Exception ex)
    {
        Console.WriteLine($"[DbEnsureWarning] {ex.Message}");
    }
}


app.UseSwagger();
app.UseSwaggerUI(options =>
{
options.SwaggerEndpoint("/swagger/v1/swagger.json", "Medika Clinic API v1");
options.RoutePrefix = "swagger";
});

app.UseMiddleware<ExceptionMiddleware>();
app.UseAuthentication();
app.UseAuthorization();
app.UseMiddleware<PageAccessMiddleware>();
app.UseDefaultFiles();
app.UseStaticFiles();
app.MapControllers();
app.MapHub<ClinicHub>("/hubs/clinic");

app.Run();