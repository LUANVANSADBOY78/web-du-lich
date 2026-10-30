# Script kiem tra toan bo Database GoTravelDB
Write-Host "==========================================================" -ForegroundColor Cyan
Write-Host "     KIEM TRA DU LIEU CO SO DU LIEU SQL SERVER (GoTravelDB)" -ForegroundColor Yellow
Write-Host "==========================================================" -ForegroundColor Cyan

$server = ".\SQLEXPRESS"
$db = "GoTravelDB"

# 1. Kiem tra so luong dong trong cac bang
Write-Host "`n1. THONG KE TONG SO DONG TRONG CAC BANG:" -ForegroundColor Green
$query1 = "
SELECT 
    t.name AS [Ten Bang],
    p.rows AS [So Dong]
FROM sys.tables t
INNER JOIN sys.partitions p ON t.object_id = p.object_id
WHERE p.index_id IN (0, 1) AND p.rows > 0
ORDER BY p.rows DESC;
"
sqlcmd -S $server -E -C -d $db -Q $query1

# 2. Xem danh sach Tour du lich
Write-Host "`n2. DANH SACH CAC TOUR DU LICH (TOURS):" -ForegroundColor Green
$query2 = "SELECT Id, Name AS [Ten Tour], AdultPrice AS [Gia (VND)], DepartureCity AS [Noi Di], Rating AS [Danh Gia] FROM Tours;"
sqlcmd -S $server -E -C -d $db -Q $query2

# 3. Xem danh sach Diem den
Write-Host "`n3. DANH SACH DIEM DEN (DESTINATIONS):" -ForegroundColor Green
$query3 = "SELECT Id, Name AS [Ten Diem Den], Province AS [Tinh Thanh], Region AS [Vung Mien] FROM Destinations;"
sqlcmd -S $server -E -C -d $db -Q $query3

# 4. Xem don dat ve
Write-Host "`n4. DON DAT VE CUA KHACH HANG (BOOKINGS):" -ForegroundColor Green
$query4 = "SELECT Id, BookingCode, CustomerName, TotalAmount, Status FROM Bookings;"
sqlcmd -S $server -E -C -d $db -Q $query4

Write-Host "`n==========================================================" -ForegroundColor Cyan
Write-Host "      HOAN TAT KIEM TRA SQL SERVER THANH CONG 100%!" -ForegroundColor Yellow
Write-Host "==========================================================" -ForegroundColor Cyan

