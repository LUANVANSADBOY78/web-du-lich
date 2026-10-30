# ==============================================================================
# SCRIPT HIEN THI USER, ADMIN, TONG QUAN DATABASE VA CAU TRUC BANG SQL SERVER
# Du an: GoTravel | Database: GoTravelDB
# ==============================================================================

$connStr = "Server=localhost;Database=GoTravelDB;Trusted_Connection=True;TrustServerCertificate=True;"

try {
    $conn = New-Object System.Data.SqlClient.SqlConnection($connStr)
    $conn.Open()
    $cmd = $conn.CreateCommand()

    Write-Host "==============================================================================" -ForegroundColor Cyan
    Write-Host "       HE THONG CO SO DU LIEU SQL SERVER - DU AN GOTRAVEL                    " -ForegroundColor Yellow
    Write-Host "==============================================================================" -ForegroundColor Cyan

    # --------------------------------------------------------------------------
    # 1. TONG QUAN CO SO DU LIEU (DATABASE OVERVIEW)
    # --------------------------------------------------------------------------
    Write-Host "`n[PHAN 1] TONG QUAN CO SO DU LIEU SQL SERVER (DATABASE OVERVIEW):" -ForegroundColor White

    $cmd.CommandText = "SELECT @@VERSION"
    $fullVersion = $cmd.ExecuteScalar()
    $sqlVersion = ($fullVersion -split "`n")[0].Trim()

    $cmd.CommandText = "SELECT DB_NAME() AS DbName, collation_name FROM sys.databases WHERE name = DB_NAME()"
    $adapter = New-Object System.Data.SqlClient.SqlDataAdapter($cmd)
    $dbInfo = New-Object System.Data.DataTable
    $adapter.Fill($dbInfo) | Out-Null

    $cmd.CommandText = @"
        SELECT 
            SUM(CAST(size AS BIGINT) * 8 / 1024) AS TotalSizeMB
        FROM sys.database_files
"@
    $dbSizeMB = $cmd.ExecuteScalar()

    Write-Host "  -> May chu SQL Server  : localhost" -ForegroundColor Green
    Write-Host "  -> Ten Co So Du Lieu   : $($dbInfo.Rows[0]['DbName'])" -ForegroundColor Green
    Write-Host "  -> Phien ban SQL Server: $sqlVersion" -ForegroundColor Green
    Write-Host "  -> Bang ma Tieng Viet  : $($dbInfo.Rows[0]['collation_name'])" -ForegroundColor Green
    Write-Host "  -> Dung luong CSDL     : $dbSizeMB MB" -ForegroundColor Green

    # --------------------------------------------------------------------------
    # 2. SEED THEM USER & ADMIN MAU (Neu chua co du)
    # --------------------------------------------------------------------------
    $cmd.CommandText = @"
        -- Dam bao co Roles
        IF NOT EXISTS (SELECT 1 FROM Roles WHERE Name = 'SuperAdmin')
            INSERT INTO Roles (Name, Description) VALUES ('SuperAdmin', N'Toàn quyền quản trị hệ thống');
        IF NOT EXISTS (SELECT 1 FROM Roles WHERE Name = 'Staff')
            INSERT INTO Roles (Name, Description) VALUES ('Staff', N'Nhân viên điều hành & CSKH');
        IF NOT EXISTS (SELECT 1 FROM Roles WHERE Name = 'Customer')
            INSERT INTO Roles (Name, Description) VALUES ('Customer', N'Khách hàng du lịch');

        -- Dam bao co Users Admin
        DECLARE @adminRoleId INT = (SELECT TOP 1 Id FROM Roles WHERE Name = 'SuperAdmin');
        DECLARE @staffRoleId INT = (SELECT TOP 1 Id FROM Roles WHERE Name = 'Staff');
        DECLARE @customerRoleId INT = (SELECT TOP 1 Id FROM Roles WHERE Name = 'Customer');

        IF NOT EXISTS (SELECT 1 FROM Users WHERE Email = 'admin@gotravel.vn')
        BEGIN
            INSERT INTO Users (Email, PasswordHash, FullName, PhoneNumber, AvatarUrl, IsActive, CreatedAt, RoleId)
            VALUES ('admin@gotravel.vn', N'`$2a`$11`$w1B0i2q3z4y5x6w7v8u9t.ExampleHash', N'Nguyễn Trường Luận (Super Admin)', '0912345678', 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150', 1, SYSUTCDATETIME(), @adminRoleId);
        END

        IF NOT EXISTS (SELECT 1 FROM Users WHERE Email = 'manager@gotravel.vn')
        BEGIN
            INSERT INTO Users (Email, PasswordHash, FullName, PhoneNumber, AvatarUrl, IsActive, CreatedAt, RoleId)
            VALUES ('manager@gotravel.vn', N'`$2a`$11`$w1B0i2q3z4y5x6w7v8u9t.ExampleHash', N'Trần Đình Trọng (Quản Lý Tour)', '0934567890', 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150', 1, SYSUTCDATETIME(), @staffRoleId);
        END

        IF NOT EXISTS (SELECT 1 FROM Users WHERE Email = 'cskh@gotravel.vn')
        BEGIN
            INSERT INTO Users (Email, PasswordHash, FullName, PhoneNumber, AvatarUrl, IsActive, CreatedAt, RoleId)
            VALUES ('cskh@gotravel.vn', N'`$2a`$11`$w1B0i2q3z4y5x6w7v8u9t.ExampleHash', N'Lê Thảo My (Chuyên Viên CSKH)', '0945678901', 'https://images.unsplash.com/photo-1517841905240-472988babdf9?w=150', 1, SYSUTCDATETIME(), @staffRoleId);
        END

        IF NOT EXISTS (SELECT 1 FROM Users WHERE Email = 'nam.tran@gmail.com')
        BEGIN
            INSERT INTO Users (Email, PasswordHash, FullName, PhoneNumber, AvatarUrl, IsActive, CreatedAt, RoleId)
            VALUES ('nam.tran@gmail.com', N'`$2a`$11`$w1B0i2q3z4y5x6w7v8u9t.ExampleHash', N'Trần Văn Nam (Khách VIP)', '0987654321', 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=150', 1, SYSUTCDATETIME(), @customerRoleId);
        END

        IF NOT EXISTS (SELECT 1 FROM Users WHERE Email = 'thuha.nguyen@yahoo.com')
        BEGIN
            INSERT INTO Users (Email, PasswordHash, FullName, PhoneNumber, AvatarUrl, IsActive, CreatedAt, RoleId)
            VALUES ('thuha.nguyen@yahoo.com', N'`$2a`$11`$w1B0i2q3z4y5x6w7v8u9t.ExampleHash', N'Nguyễn Thị Thu Hà (Khách Hàng)', '0978901234', 'https://images.unsplash.com/photo-1524504388940-b1c1722653e1?w=150', 1, SYSUTCDATETIME(), @customerRoleId);
        END
"@
    $cmd.ExecuteNonQuery() | Out-Null

    # --------------------------------------------------------------------------
    # 3. HIEN THI DANH SACH TAI KHOAN ADMIN VA USER (USERS & ROLES)
    # --------------------------------------------------------------------------
    Write-Host "`n[PHAN 2] DANH SACH TAI KHOAN QUAN TRI (ADMIN) & KHACH HANG (USER):" -ForegroundColor White
    Write-Host "------------------------------------------------------------------------------" -ForegroundColor Gray

    $cmd.CommandText = @"
        SELECT 
            u.Id,
            u.FullName AS [HoVaTen],
            u.Email,
            ISNULL(u.PhoneNumber, 'N/A') AS [SoDienThoai],
            ISNULL(r.Name, 'No Role') AS [VaiTro],
            CASE WHEN u.IsActive = 1 THEN N'Hoạt động' ELSE N'Khóa' END AS [TrangThai],
            CONVERT(VARCHAR(10), u.CreatedAt, 103) AS [NgayTao]
        FROM Users u
        LEFT JOIN Roles r ON u.RoleId = r.Id
        ORDER BY r.Name DESC, u.Id ASC
"@
    $adapter = New-Object System.Data.SqlClient.SqlDataAdapter($cmd)
    $usersTable = New-Object System.Data.DataTable
    $adapter.Fill($usersTable) | Out-Null

    $usersTable | Format-Table -Property @(
        @{Label="ID"; Expression={$_.Id}; Width=4},
        @{Label="Họ và Tên"; Expression={$_.HoVaTen}; Width=32},
        @{Label="Email"; Expression={$_.Email}; Width=25},
        @{Label="Số Điện Thoại"; Expression={$_.SoDienThoai}; Width=14},
        @{Label="Vai Trò (Role)"; Expression={$_.VaiTro}; Width=15},
        @{Label="Trạng Thái"; Expression={$_.TrangThai}; Width=12},
        @{Label="Ngày Tạo"; Expression={$_.NgayTao}; Width=12}
    )

    # --------------------------------------------------------------------------
    # 4. LIET KE TOAN BO 23 BANG TRONG DATABASE (ALL TABLES & ROW COUNTS)
    # --------------------------------------------------------------------------
    Write-Host "`n[PHAN 3] DANH SACH TOAN BO CAC BANG TRONG CSDL (TABLES & ROW COUNTS):" -ForegroundColor White
    Write-Host "------------------------------------------------------------------------------" -ForegroundColor Gray

    $cmd.CommandText = @"
        SELECT 
            t.NAME AS [TenBang],
            p.rows AS [SoLuongBanGhi]
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
            t.NAME
"@
    $adapter = New-Object System.Data.SqlClient.SqlDataAdapter($cmd)
    $allTables = New-Object System.Data.DataTable
    $adapter.Fill($allTables) | Out-Null

    $allTables | Format-Table -Property @(
        @{Label="Tên Bảng (Table Name)"; Expression={$_.TenBang}; Width=35},
        @{Label="Số Lượng Dòng (Row Count)"; Expression={$_.SoLuongBanGhi}; Width=25}
    )

    # --------------------------------------------------------------------------
    # 5. CAU TRUC CHI TIET CAC BANG COT LOI (TABLE SCHEMAS & DATA TYPES)
    # --------------------------------------------------------------------------
    Write-Host "`n[PHAN 4] CAU TRUC CHI TIET (SCHEMA) CAC BANG COT LOI CUA HE THONG:" -ForegroundColor White
    Write-Host "------------------------------------------------------------------------------" -ForegroundColor Gray

    $coreTables = @("Users", "Roles", "Tours", "Destinations", "TourDepartures", "Vouchers", "Bookings", "ChatMessages")

    foreach ($tbl in $coreTables) {
        Write-Host "`n>>> CAU TRUC BANG: [$tbl]" -ForegroundColor Yellow

        $cmd.CommandText = @"
            SELECT 
                c.COLUMN_NAME AS [TenCot],
                c.DATA_TYPE AS [KieuDuLieu],
                CASE 
                    WHEN c.CHARACTER_MAXIMUM_LENGTH = -1 THEN 'MAX'
                    WHEN c.CHARACTER_MAXIMUM_LENGTH IS NOT NULL THEN CAST(c.CHARACTER_MAXIMUM_LENGTH AS VARCHAR(10))
                    WHEN c.NUMERIC_PRECISION IS NOT NULL THEN CAST(c.NUMERIC_PRECISION AS VARCHAR(10)) + ',' + CAST(c.NUMERIC_SCALE AS VARCHAR(10))
                    ELSE '-'
                END AS [DoDai],
                c.IS_NULLABLE AS [Nullable],
                CASE 
                    WHEN pk.COLUMN_NAME IS NOT NULL THEN 'PRIMARY KEY' 
                    ELSE '' 
                END AS [KhoaChinh]
            FROM INFORMATION_SCHEMA.COLUMNS c
            LEFT JOIN (
                SELECT ku.TABLE_NAME, ku.COLUMN_NAME
                FROM INFORMATION_SCHEMA.TABLE_CONSTRAINTS tc
                JOIN INFORMATION_SCHEMA.KEY_COLUMN_USAGE ku
                    ON tc.CONSTRAINT_NAME = ku.CONSTRAINT_NAME
                WHERE tc.CONSTRAINT_TYPE = 'PRIMARY KEY'
            ) pk ON c.TABLE_NAME = pk.TABLE_NAME AND c.COLUMN_NAME = pk.COLUMN_NAME
            WHERE c.TABLE_NAME = '$tbl'
            ORDER BY c.ORDINAL_POSITION
"@
        $adapter = New-Object System.Data.SqlClient.SqlDataAdapter($cmd)
        $schemaTable = New-Object System.Data.DataTable
        $adapter.Fill($schemaTable) | Out-Null

        $schemaTable | Format-Table -Property @(
            @{Label="Tên Cột (Column)"; Expression={$_.TenCot}; Width=22},
            @{Label="Kiểu Dữ Liệu (Type)"; Expression={$_.KieuDuLieu}; Width=16},
            @{Label="Độ Dài"; Expression={$_.DoDai}; Width=10},
            @{Label="Cho Phép Null"; Expression={$_.Nullable}; Width=15},
            @{Label="Khóa (Key)"; Expression={$_.KhoaChinh}; Width=15}
        )
    }

    $conn.Close()

    Write-Host "==============================================================================" -ForegroundColor Green
    Write-Host "               HOAN TAT TRUY XUAT DU LIEU VA CAU TRUC CSDL!                   " -ForegroundColor Yellow
    Write-Host "==============================================================================" -ForegroundColor Green
}
catch {
    Write-Host ">>> LOI: $($_.Exception.Message)" -ForegroundColor Red
}
