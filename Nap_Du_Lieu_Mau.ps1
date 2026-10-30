# ==============================================================================
# SCRIPT NAP DU LIEU MAU CHUYEN NGHIEP VAO SQL SERVER - DATABASE GOTRAVELDB
# ==============================================================================

# Bat che do UTF-8 toan dien tren PowerShell de khong bao gio bi loi font tieng Viet
[Console]::OutputEncoding = [System.Text.Encoding]::UTF8
[Console]::InputEncoding = [System.Text.Encoding]::UTF8
$OutputEncoding = [System.Text.Encoding]::UTF8
chcp 65001 | Out-Null

$connStr = "Server=localhost;Database=GoTravelDB;Trusted_Connection=True;TrustServerCertificate=True;"

try {
    $conn = New-Object System.Data.SqlClient.SqlConnection($connStr)
    $conn.Open()
    Write-Host "======================================================================" -ForegroundColor Cyan
    Write-Host "    KET NOI THANH CONG DEN DATABASE SQL SERVER: GoTravelDB            " -ForegroundColor Green
    Write-Host "======================================================================" -ForegroundColor Cyan

    $cmd = $conn.CreateCommand()

    # 1. NAP DANH MUC TOUR (TourCategory)
    Write-Host "`n[1/6] Dang kiem tra va nap Danh Muc Tour (TourCategory)..." -ForegroundColor White
    $cmd.CommandText = @"
        IF NOT EXISTS (SELECT 1 FROM TourCategory WHERE Slug = 'tour-bien-dao')
        BEGIN
            INSERT INTO TourCategory (Name, Slug, Description)
            VALUES (N'Tour Biển Đảo', 'tour-bien-dao', N'Khám phá các bãi biển đẹp nhất Việt Nam: Phú Quốc, Nha Trang, Đà Nẵng, Côn Đảo.');
        END
        IF NOT EXISTS (SELECT 1 FROM TourCategory WHERE Slug = 'tour-van-hoa-di-san')
        BEGIN
            INSERT INTO TourCategory (Name, Slug, Description)
            VALUES (N'Tour Văn Hóa Di Sản', 'tour-van-hoa-di-san', N'Hành trình di sản miền Trung: Cố đô Huế, Phố cổ Hội An, Thánh địa Mỹ Sơn.');
        END
        IF NOT EXISTS (SELECT 1 FROM TourCategory WHERE Slug = 'tour-nghi-duong-sinh-thai')
        BEGIN
            INSERT INTO TourCategory (Name, Slug, Description)
            VALUES (N'Tour Nghỉ Dưỡng Sinh Thái', 'tour-nghi-duong-sinh-thai', N'Du lịch nghỉ dưỡng hòa mình vào thiên nhiên Sa Pa, Đà Lạt, Miền Tây sông nước.');
        END
        IF NOT EXISTS (SELECT 1 FROM TourCategory WHERE Slug = 'tour-du-thuyen-5-sao')
        BEGIN
            INSERT INTO TourCategory (Name, Slug, Description)
            VALUES (N'Tour Du Thuyền 5 Sao', 'tour-du-thuyen-5-sao', N'Trải nghiệm đẳng cấp trên du thuyền vịnh Hạ Long, vịnh Lan Hạ.');
        END
"@
    $cmd.ExecuteNonQuery() | Out-Null
    Write-Host "  -> Da cap nhat Danh muc Tour!" -ForegroundColor Green

    # 2. NAP DIEM DEN MOI (Destinations)
    Write-Host "`n[2/6] Dang kiem tra va nap cac Diem Den (Destinations)..." -ForegroundColor White
    $cmd.CommandText = @"
        IF NOT EXISTS (SELECT 1 FROM Destinations WHERE Slug = 'nha-trang')
        BEGIN
            INSERT INTO Destinations (Name, Slug, Province, Region, Description, Latitude, Longitude, GooglePlaceId, MapZoom, Rating, Featured, Status, MainImage)
            VALUES (N'Nha Trang', 'nha-trang', N'Khánh Hòa', N'Miền Trung', N'Vịnh biển thiên đường với VinWonders Hòn Tre, lặn ngắm san hô Hòn Mun.', 12.2388, 109.1967, 'ChIJ-NhaTrang', 12, 4.9, 1, 'Active', 'https://images.unsplash.com/photo-1596422846543-75c6fc197f07?w=600');
        END
        IF NOT EXISTS (SELECT 1 FROM Destinations WHERE Slug = 'da-lat')
        BEGIN
            INSERT INTO Destinations (Name, Slug, Province, Region, Description, Latitude, Longitude, GooglePlaceId, MapZoom, Rating, Featured, Status, MainImage)
            VALUES (N'Đà Lạt', 'da-lat', N'Lâm Đồng', N'Tây Nguyên', N'Thành phố ngàn hoa mộng mơ, không khí mát lạnh quanh năm với đồi chè Cầu Đất.', 11.9404, 108.4583, 'ChIJ-DaLat', 12, 4.92, 1, 'Active', 'https://images.unsplash.com/photo-1583417319070-4a69db38a482?w=600');
        END
        IF NOT EXISTS (SELECT 1 FROM Destinations WHERE Slug = 'can-tho')
        BEGIN
            INSERT INTO Destinations (Name, Slug, Province, Region, Description, Latitude, Longitude, GooglePlaceId, MapZoom, Rating, Featured, Status, MainImage)
            VALUES (N'Cần Thơ', 'can-tho', N'Cần Thơ', N'Miền Nam', N'Thủ phủ miền Tây sông nước, chợ nổi Cái Răng tấp nập và miệt vườn cây trái trĩu quả.', 10.0452, 105.7469, 'ChIJ-CanTho', 12, 4.86, 0, 'Active', 'https://images.unsplash.com/photo-1620023408711-2eb2617f6c38?w=600');
        END
        IF NOT EXISTS (SELECT 1 FROM Destinations WHERE Slug = 'hue')
        BEGIN
            INSERT INTO Destinations (Name, Slug, Province, Region, Description, Latitude, Longitude, GooglePlaceId, MapZoom, Rating, Featured, Status, MainImage)
            VALUES (N'Huế', 'hue', N'Thừa Thiên Huế', N'Miền Trung', N'Vẻ đẹp trầm mặc cổ kính với Đại Nội Huế, lăng tẩm hoàng gia và dòng sông Hương thơ mộng.', 16.4637, 107.5909, 'ChIJ-Hue', 12, 4.88, 1, 'Active', 'https://images.unsplash.com/photo-1569154941061-e231b4725ef1?w=600');
        END
"@
    $cmd.ExecuteNonQuery() | Out-Null
    Write-Host "  -> Da cap nhat Diem Den du lich!" -ForegroundColor Green

    # 3. NAP HUONG DAN VIEN (TourGuide)
    Write-Host "`n[3/6] Dang kiem tra va nap Huong Dan Vien (TourGuide)..." -ForegroundColor White
    $cmd.CommandText = @"
        IF NOT EXISTS (SELECT 1 FROM TourGuide WHERE Name = N'Nguyễn Văn Hùng')
        BEGIN
            INSERT INTO TourGuide (Name, Phone, Email, Bio)
            VALUES (N'Nguyễn Văn Hùng', '0912345678', 'hung.nguyen@gotravel.vn', N'Thẻ quốc tế, 8 năm kinh nghiệm tuyến miền Trung và Di sản văn hóa.');
        END
        IF NOT EXISTS (SELECT 1 FROM TourGuide WHERE Name = N'Trần Thị Mai Anh')
        BEGIN
            INSERT INTO TourGuide (Name, Phone, Email, Bio)
            VALUES (N'Trần Thị Mai Anh', '0934567890', 'maianh.tran@gotravel.vn', N'Thẻ quốc tế, thông thạo Tiếng Hàn & Tiếng Anh, nhiệt huyết chu đáo.');
        END
        IF NOT EXISTS (SELECT 1 FROM TourGuide WHERE Name = N'Lê Hoàng Long')
        BEGIN
            INSERT INTO TourGuide (Name, Phone, Email, Bio)
            VALUES (N'Lê Hoàng Long', '0978901234', 'long.le@gotravel.vn', N'Thẻ quốc tế, thông thạo Tiếng Trung, chuyên tour trekking và caravan.');
        END
"@
    $cmd.ExecuteNonQuery() | Out-Null
    Write-Host "  -> Da cap nhat Huong Dan Vien!" -ForegroundColor Green

    # 4. NAP TOUR DU LICH MOI (Tours)
    Write-Host "`n[4/6] Dang kiem tra va nap cac Tour Du Lich dac sac (Tours)..." -ForegroundColor White
    $cmd.CommandText = @"
        IF NOT EXISTS (SELECT 1 FROM Tours WHERE Code = 'TOUR-NT-04')
        BEGIN
            INSERT INTO Tours (Name, Slug, Code, Description, DurationDays, DurationNights, DepartureCity, Transport, AdultPrice, ChildPrice, InfantPrice, Rating, ReviewCount, Status, CreatedAt)
            VALUES (N'Tour Nha Trang - Vịnh Nha Phu - Đảo Điệp Sơn 3N2Đ', 'tour-nha-trang-diep-son-3n2d', 'TOUR-NT-04', N'Khám phá con đường đi bộ giữa biển độc nhất vô nhị tại Điệp Sơn, lặn ngắm san hô biển ngọc.', 3, 2, N'TP. Hồ Chí Minh', N'Xe Limousine VIP / Máy bay', 3290000, 2290000, 300000, 4.92, 45, 'Active', SYSUTCDATETIME());
        END
        IF NOT EXISTS (SELECT 1 FROM Tours WHERE Code = 'TOUR-DL-05')
        BEGIN
            INSERT INTO Tours (Name, Slug, Code, Description, DurationDays, DurationNights, DepartureCity, Transport, AdultPrice, ChildPrice, InfantPrice, Rating, ReviewCount, Status, CreatedAt)
            VALUES (N'Tour Đà Lạt - Săn Mây Cầu Đất - Thác Datanla 3N2Đ', 'tour-da-lat-san-may-3n2d', 'TOUR-DL-05', N'Trải nghiệm săn mây đón bình minh, đồi chè Cầu Đất, máng trượt xuyên rừng Datanla.', 3, 2, N'TP. Hồ Chí Minh / Hà Nội', N'Xe Giường Nằm VIP', 2490000, 1690000, 0, 4.95, 78, 'Active', SYSUTCDATETIME());
        END
        IF NOT EXISTS (SELECT 1 FROM Tours WHERE Code = 'TOUR-SP-06')
        BEGIN
            INSERT INTO Tours (Name, Slug, Code, Description, DurationDays, DurationNights, DepartureCity, Transport, AdultPrice, ChildPrice, InfantPrice, Rating, ReviewCount, Status, CreatedAt)
            VALUES (N'Tour Sa Pa - Cáp Treo Fansipan - Bản Cát Cát 2N1Đ', 'tour-sa-pa-fansipan-2n1d', 'TOUR-SP-06', N'Chinh phục nóc nhà Đông Dương Fansipan 3.143m, tìm hiểu nét văn hóa độc đáo người H''Mông.', 2, 1, N'Hà Nội', N'Xe Cabin Đôi VIP', 1950000, 1350000, 0, 4.88, 92, 'Active', SYSUTCDATETIME());
        END
"@
    $cmd.ExecuteNonQuery() | Out-Null
    Write-Host "  -> Da cap nhat Tour Du Lich!" -ForegroundColor Green

    # 5. NAP VOUCHER KHUYEN MAI (Vouchers)
    Write-Host "`n[5/6] Dang kiem tra va nap Ma Giam Gia (Vouchers)..." -ForegroundColor White
    $cmd.CommandText = @"
        IF NOT EXISTS (SELECT 1 FROM Vouchers WHERE Code = 'GOTRAVEL500')
        BEGIN
            INSERT INTO Vouchers (Code, Name, Type, Value, MinOrderValue, MaxDiscount, StartDate, EndDate, UsageLimit, UsedCount, IsActive, CreatedAt, IsDeleted)
            VALUES ('GOTRAVEL500', N'Voucher 500K Chào Hè', 'Fixed', 500000, 3000000, 500000, SYSUTCDATETIME(), DATEADD(month, 3, SYSUTCDATETIME()), 100, 12, 1, SYSUTCDATETIME(), 0);
        END
        IF NOT EXISTS (SELECT 1 FROM Vouchers WHERE Code = 'HE2026')
        BEGIN
            INSERT INTO Vouchers (Code, Name, Type, Value, MinOrderValue, MaxDiscount, StartDate, EndDate, UsageLimit, UsedCount, IsActive, CreatedAt, IsDeleted)
            VALUES ('HE2026', N'Giảm 10% Tour Mùa Hè', 'Percent', 10, 2000000, 1000000, SYSUTCDATETIME(), DATEADD(month, 6, SYSUTCDATETIME()), 500, 89, 1, SYSUTCDATETIME(), 0);
        END
        IF NOT EXISTS (SELECT 1 FROM Vouchers WHERE Code = 'VIPTOUR')
        BEGIN
            INSERT INTO Vouchers (Code, Name, Type, Value, MinOrderValue, MaxDiscount, StartDate, EndDate, UsageLimit, UsedCount, IsActive, CreatedAt, IsDeleted)
            VALUES ('VIPTOUR', N'Giảm 15% Tour Đoàn VIP', 'Percent', 15, 5000000, 2000000, SYSUTCDATETIME(), DATEADD(month, 12, SYSUTCDATETIME()), 50, 5, 1, SYSUTCDATETIME(), 0);
        END
"@
    $cmd.ExecuteNonQuery() | Out-Null
    Write-Host "  -> Da cap nhat Vouchers!" -ForegroundColor Green

    # 6. IN KET QUA TONG QUAT
    Write-Host "`n[6/6] IN THONG KE DU LIEU SAU KHI NAP XONG:" -ForegroundColor Yellow
    Write-Host "----------------------------------------------------------------------" -ForegroundColor Gray

    $tablesToCheck = @("Tours", "Destinations", "TourCategory", "TourGuide", "TourDepartures", "Vouchers", "Users", "ChatMessages")
    foreach ($tbl in $tablesToCheck) {
        $cmd.CommandText = "SELECT COUNT(*) FROM $tbl"
        $cnt = $cmd.ExecuteScalar()
        Write-Host ("  * Bang {0,-18} : {1,4} ban ghi" -f $tbl, $cnt) -ForegroundColor White
    }

    Write-Host "`n--- DANH SACH CAC TOUR DU LICH HIEN CO TRONG SQL DATABASE ---" -ForegroundColor Cyan
    $cmd.CommandText = "SELECT Id, Name, Code, AdultPrice, DurationDays, Rating, Status FROM Tours ORDER BY Id"
    $adapter = New-Object System.Data.SqlClient.SqlDataAdapter($cmd)
    $table = New-Object System.Data.DataTable
    $adapter.Fill($table) | Out-Null
    
    $table | Format-Table -Property @(
        @{Label="ID"; Expression={$_.Id}; Width=4},
        @{Label="Ma Tour"; Expression={$_.Code}; Width=14},
        @{Label="Ten Tour Du Lich"; Expression={$_.Name}; Width=42},
        @{Label="Gia Nguoi Lon"; Expression={"{0:N0} d" -f $_.AdultPrice}; Width=15},
        @{Label="So Ngay"; Expression={$_.DurationDays}; Width=8},
        @{Label="Danh Gia"; Expression={$_.Rating}; Width=8}
    )

    $conn.Close()
    Write-Host "======================================================================" -ForegroundColor Green
    Write-Host "       DA NAP TOAN BO DU LIEU MAU THANH CONG 100%!                    " -ForegroundColor Yellow
    Write-Host "======================================================================" -ForegroundColor Green
}
catch {
    Write-Host ">>> LOI XAY RA: $($_.Exception.Message)" -ForegroundColor Red
}
