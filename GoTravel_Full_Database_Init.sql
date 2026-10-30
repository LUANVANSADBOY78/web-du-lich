-- ==============================================================================
-- KICH BAN KHOI TAO VA DUA DU LIEU MAU VAO DATABASE SQL SERVER - GOTRAVEL
-- He quan tri CSDL: Microsoft SQL Server (2019 / 2022 / 2025 / Azure SQL)
-- Database Name: GoTravelDB
-- ==============================================================================

USE [master];
GO

-- 1. Tao Database neu chua co
IF NOT EXISTS (SELECT name FROM sys.databases WHERE name = N'GoTravelDB')
BEGIN
    CREATE DATABASE [GoTravelDB] COLLATE Vietnamese_CI_AS;
    PRINT N'>>> Da tao co so du lieu GoTravelDB thanh cong!';
END
ELSE
BEGIN
    PRINT N'>>> Co so du lieu GoTravelDB da ton tai.';
END
GO

USE [GoTravelDB];
GO

-- 2. Kiem tra va tao bang Roles (Vai tro)
IF OBJECT_ID(N'dbo.Roles', N'U') IS NULL
BEGIN
    CREATE TABLE [dbo].[Roles] (
        [Id] INT IDENTITY(1,1) NOT NULL,
        [Name] NVARCHAR(50) NOT NULL,
        [Description] NVARCHAR(255) NULL,
        CONSTRAINT [PK_Roles] PRIMARY KEY CLUSTERED ([Id] ASC)
    );
    PRINT N'>>> Da tao bang Roles';
END
GO

-- 3. Kiem tra va tao bang Users (Nguoi dung)
IF OBJECT_ID(N'dbo.Users', N'U') IS NULL
BEGIN
    CREATE TABLE [dbo].[Users] (
        [Id] INT IDENTITY(1,1) NOT NULL,
        [Email] NVARCHAR(100) NOT NULL,
        [PasswordHash] NVARCHAR(255) NOT NULL,
        [FullName] NVARCHAR(100) NOT NULL,
        [PhoneNumber] NVARCHAR(20) NULL,
        [AvatarUrl] NVARCHAR(500) NULL,
        [IsActive] BIT NOT NULL DEFAULT 1,
        [CreatedAt] DATETIME2 NOT NULL DEFAULT SYSUTCDATETIME(),
        [RoleId] INT NOT NULL,
        CONSTRAINT [PK_Users] PRIMARY KEY CLUSTERED ([Id] ASC),
        CONSTRAINT [FK_Users_Roles] FOREIGN KEY ([RoleId]) REFERENCES [dbo].[Roles]([Id]) ON DELETE CASCADE
    );
    CREATE UNIQUE NONCLUSTERED INDEX [IX_Users_Email] ON [dbo].[Users]([Email] ASC);
    PRINT N'>>> Da tao bang Users';
END
GO

-- 4. Kiem tra va tao bang Destinations (Diem den)
IF OBJECT_ID(N'dbo.Destinations', N'U') IS NULL
BEGIN
    CREATE TABLE [dbo].[Destinations] (
        [Id] INT IDENTITY(1,1) NOT NULL,
        [Name] NVARCHAR(100) NOT NULL,
        [Slug] NVARCHAR(100) NOT NULL,
        [Province] NVARCHAR(100) NOT NULL,
        [Region] NVARCHAR(50) NOT NULL,
        [Description] NVARCHAR(MAX) NULL,
        [Latitude] FLOAT NOT NULL DEFAULT 0,
        [Longitude] FLOAT NOT NULL DEFAULT 0,
        [GooglePlaceId] NVARCHAR(100) NULL,
        [MapZoom] INT NOT NULL DEFAULT 12,
        [MainImage] NVARCHAR(500) NULL,
        [Rating] FLOAT NOT NULL DEFAULT 5.0,
        [Featured] BIT NOT NULL DEFAULT 0,
        [Status] NVARCHAR(20) NOT NULL DEFAULT N'Active',
        CONSTRAINT [PK_Destinations] PRIMARY KEY CLUSTERED ([Id] ASC)
    );
    PRINT N'>>> Da tao bang Destinations';
END
GO

-- 5. Kiem tra va tao bang Tours (Tour du lich)
IF OBJECT_ID(N'dbo.Tours', N'U') IS NULL
BEGIN
    CREATE TABLE [dbo].[Tours] (
        [Id] INT IDENTITY(1,1) NOT NULL,
        [Name] NVARCHAR(255) NOT NULL,
        [Slug] NVARCHAR(255) NOT NULL,
        [Code] NVARCHAR(50) NOT NULL,
        [Description] NVARCHAR(MAX) NULL,
        [DurationDays] INT NOT NULL DEFAULT 1,
        [DurationNights] INT NOT NULL DEFAULT 0,
        [DepartureCity] NVARCHAR(100) NOT NULL,
        [Transport] NVARCHAR(100) NULL,
        [AdultPrice] DECIMAL(18,2) NOT NULL DEFAULT 0,
        [ChildPrice] DECIMAL(18,2) NOT NULL DEFAULT 0,
        [InfantPrice] DECIMAL(18,2) NOT NULL DEFAULT 0,
        [Rating] FLOAT NOT NULL DEFAULT 5.0,
        [ReviewCount] INT NOT NULL DEFAULT 0,
        [Status] NVARCHAR(20) NOT NULL DEFAULT N'Active',
        [CreatedAt] DATETIME2 NOT NULL DEFAULT SYSUTCDATETIME(),
        [TourCategoryId] INT NULL,
        [TourPartnerId] INT NULL,
        CONSTRAINT [PK_Tours] PRIMARY KEY CLUSTERED ([Id] ASC)
    );
    CREATE UNIQUE NONCLUSTERED INDEX [IX_Tours_Slug] ON [dbo].[Tours]([Slug] ASC);
    CREATE UNIQUE NONCLUSTERED INDEX [IX_Tours_Code] ON [dbo].[Tours]([Code] ASC);
    PRINT N'>>> Da tao bang Tours';
END
GO

-- 6. Kiem tra va tao bang TourDepartures (Lich khoi hanh)
IF OBJECT_ID(N'dbo.TourDepartures', N'U') IS NULL
BEGIN
    CREATE TABLE [dbo].[TourDepartures] (
        [Id] INT IDENTITY(1,1) NOT NULL,
        [TourId] INT NOT NULL,
        [StartDate] DATETIME2 NOT NULL,
        [EndDate] DATETIME2 NOT NULL,
        [AdultPrice] DECIMAL(18,2) NOT NULL,
        [ChildPrice] DECIMAL(18,2) NOT NULL DEFAULT 0,
        [InfantPrice] DECIMAL(18,2) NOT NULL DEFAULT 0,
        [TotalSeats] INT NOT NULL DEFAULT 30,
        [AvailableSeats] INT NOT NULL DEFAULT 30,
        [Status] NVARCHAR(20) NOT NULL DEFAULT N'Active',
        CONSTRAINT [PK_TourDepartures] PRIMARY KEY CLUSTERED ([Id] ASC),
        CONSTRAINT [FK_TourDepartures_Tours] FOREIGN KEY ([TourId]) REFERENCES [dbo].[Tours]([Id]) ON DELETE CASCADE
    );
    PRINT N'>>> Da tao bang TourDepartures';
END
GO

-- 7. Kiem tra va tao bang ChatConversations & ChatMessages (Luu lich su AI)
IF OBJECT_ID(N'dbo.ChatConversations', N'U') IS NULL
BEGIN
    CREATE TABLE [dbo].[ChatConversations] (
        [Id] INT IDENTITY(1,1) NOT NULL,
        [SessionId] NVARCHAR(100) NULL,
        [Title] NVARCHAR(255) NOT NULL DEFAULT N'Cuoc hoi thoai moi',
        [UserId] INT NULL,
        [CreatedAt] DATETIME2 NOT NULL DEFAULT SYSUTCDATETIME(),
        [UpdatedAt] DATETIME2 NOT NULL DEFAULT SYSUTCDATETIME(),
        [IsDeleted] BIT NOT NULL DEFAULT 0,
        CONSTRAINT [PK_ChatConversations] PRIMARY KEY CLUSTERED ([Id] ASC)
    );
    PRINT N'>>> Da tao bang ChatConversations';
END
GO

IF OBJECT_ID(N'dbo.ChatMessages', N'U') IS NULL
BEGIN
    CREATE TABLE [dbo].[ChatMessages] (
        [Id] INT IDENTITY(1,1) NOT NULL,
        [ConversationId] INT NOT NULL,
        [Role] NVARCHAR(20) NOT NULL,
        [Content] NVARCHAR(MAX) NOT NULL,
        [TokenCount] INT NULL,
        [CreatedAt] DATETIME2 NOT NULL DEFAULT SYSUTCDATETIME(),
        CONSTRAINT [PK_ChatMessages] PRIMARY KEY CLUSTERED ([Id] ASC),
        CONSTRAINT [FK_ChatMessages_ChatConversations] FOREIGN KEY ([ConversationId]) REFERENCES [dbo].[ChatConversations]([Id]) ON DELETE CASCADE
    );
    PRINT N'>>> Da tao bang ChatMessages';
END
GO

-- 8. KHOI TAO DU LIEU MAU CHUAN (SEED DATA)
PRINT N'>>> Dang chen du lieu mau vao cac bang...';

-- Roles
IF NOT EXISTS (SELECT 1 FROM [dbo].[Roles])
BEGIN
    INSERT INTO [dbo].[Roles] ([Name], [Description]) VALUES 
    (N'SuperAdmin', N'Toan quyen quan tri he thong'),
    (N'Staff', N'Nhan vien dieu hanh va CSKH'),
    (N'Customer', N'Khach hang du lich');
    PRINT N'-> Da them Roles';
END

-- Users
IF NOT EXISTS (SELECT 1 FROM [dbo].[Users])
BEGIN
    INSERT INTO [dbo].[Users] ([Email], [PasswordHash], [FullName], [PhoneNumber], [RoleId], [IsActive]) VALUES 
    (N'admin@gotravel.vn', N'$2a$11$w1B0i2q3z4y5x6w7v8u9t.ExampleHashForTestingOnly', N'Admin Nguyễn Trường Luận', N'0912345678', 1, 1),
    (N'khachhang@gmail.com', N'$2a$11$w1B0i2q3z4y5x6w7v8u9t.ExampleHashForTestingOnly', N'Trần Văn Nam', N'0987654321', 3, 1);
    PRINT N'-> Da them Users';
END

-- Destinations
IF NOT EXISTS (SELECT 1 FROM [dbo].[Destinations])
BEGIN
    INSERT INTO [dbo].[Destinations] ([Name], [Slug], [Province], [Region], [Description], [Latitude], [Longitude], [Rating], [Featured], [Status]) VALUES
    (N'Đà Nẵng', N'da-nang', N'Đà Nẵng', N'Miền Trung', N'Thành phố đáng sống với biển Mỹ Khê và Bà Nà Hills', 16.0544, 108.2022, 4.9, 1, N'Active'),
    (N'Phú Quốc', N'phu-quoc', N'Kiên Giang', N'Miền Nam', N'Đảo ngọc thiên đường nghỉ dưỡng và vui chơi', 10.2899, 103.9840, 4.95, 1, N'Active'),
    (N'Hạ Long', N'ha-long', N'Quảng Ninh', N'Miền Bắc', N'Kỳ quan thiên nhiên thế giới vịnh Hạ Long', 20.9599, 107.0425, 4.88, 1, N'Active'),
    (N'Sa Pa', N'sa-pa', N'Lào Cai', N'Miền Bắc', N'Thị trấn sương mờ với đỉnh Fansipan hùng vĩ', 22.3364, 103.8438, 4.85, 1, N'Active');
    PRINT N'-> Da them Destinations';
END

-- Tours
IF NOT EXISTS (SELECT 1 FROM [dbo].[Tours])
BEGIN
    INSERT INTO [dbo].[Tours] ([Name], [Slug], [Code], [Description], [DurationDays], [DurationNights], [DepartureCity], [Transport], [AdultPrice], [ChildPrice], [InfantPrice], [Rating], [ReviewCount], [Status]) VALUES
    (N'Tour Đà Nẵng - Bà Nà Hills - Hội An 3N2Đ', N'tour-da-nang-ba-na-hoi-an-3n2d', N'TOUR-DN-01', N'Khám phá Cầu Vàng, Bà Nà Hills và phố cổ Hội An lung linh đèn lồng.', 3, 2, N'TP. Hồ Chí Minh', N'Máy bay khứ hồi', 3590000, 2590000, 400000, 4.9, 88, N'Active'),
    (N'Tour Du Thuyền Vịnh Hạ Long 5 Sao 2N1Đ', N'tour-du-thuyen-vinh-ha-long-5-sao-2n1d', N'TOUR-HL-02', N'Nghỉ dưỡng du thuyền 5 sao đẳng cấp thế giới ngắm hoàng hôn vịnh Hạ Long.', 2, 1, N'Hà Nội', N'Xe Limousine VIP', 2850000, 1990000, 0, 4.95, 120, N'Active'),
    (N'Tour Thiên Đường Đảo Ngọc Phú Quốc 4N3Đ', N'tour-thien-duong-dao-ngoc-phu-quoc-4n3d', N'TOUR-PQ-03', N'Vui chơi Grand World, VinWonders, cáp treo Hòn Thơm vượt biển dài nhất.', 4, 3, N'Hà Nội / TP.HCM', N'Máy bay', 4990000, 3690000, 500000, 4.85, 64, N'Active');
    PRINT N'-> Da them Tours';
END

PRINT N'======================================================================';
PRINT N'>>> HOAN TAT KHOI TAO CO SO DU LIEU SQL SERVER CHO GOTRAVEL! <<<';
PRINT N'======================================================================';
GO
