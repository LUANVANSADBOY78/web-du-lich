# ==============================================================================
# SCRIPT KIEM TRA CO SO DU LIEU SQL SERVER - DU AN GOTRAVEL
# Huong dan chay: Trong PowerShell go:
#   cd d:\webdulich
#   powershell -ExecutionPolicy Bypass -File .\KiemTra_Database_SQL.ps1
# ==============================================================================

Write-Host "======================================================================" -ForegroundColor Cyan
Write-Host "       KIEM TRA KET NOI VA CHUC NANG DATABASE SQL - GOTRAVEL         " -ForegroundColor Yellow
Write-Host "======================================================================" -ForegroundColor Cyan

# 1. Kiem tra Service SQL Server tren Windows
Write-Host "`n[BUOC 1] Kiem tra trang thai Service SQL Server tren Windows..." -ForegroundColor White
$sqlServices = Get-Service -Name "*SQL*" -ErrorAction SilentlyContinue
if ($sqlServices) {
    foreach ($s in $sqlServices) {
        $color = if ($s.Status -eq 'Running') { 'Green' } else { 'Yellow' }
        Write-Host "  -> Service: $($s.Name) | Display: $($s.DisplayName) | Status: $($s.Status)" -ForegroundColor $color
    }
} else {
    Write-Host "  -> Khong tim thay service SQL qua Get-Service (co the dang chay qua LocalDB hoac Docker)" -ForegroundColor Gray
}

# 2. Kiem tra ket noi truc tiep vao SQL Server qua .NET System.Data.SqlClient
Write-Host "`n[BUOC 2] Kiem tra ket noi truc tiep SQL Server (localhost / GoTravelDB)..." -ForegroundColor White
$connStr = "Server=localhost;Database=GoTravelDB;Trusted_Connection=True;TrustServerCertificate=True;"
$canConnectSql = $false

try {
    $conn = New-Object System.Data.SqlClient.SqlConnection($connStr)
    $conn.Open()
    $canConnectSql = $true
    Write-Host "  [THANH CONG] Da ket noi truc tiep vao Database SQL Server: GoTravelDB" -ForegroundColor Green
    
    # Lay phien ban SQL
    $cmd = $conn.CreateCommand()
    $cmd.CommandText = "SELECT @@VERSION"
    $ver = $cmd.ExecuteScalar()
    $shortVer = ($ver -split "`n")[0].Trim()
    Write-Host "  -> Phien ban SQL Server: $shortVer" -ForegroundColor Cyan
    
    # Liet ke tat ca bang va so luong ban ghi
    Write-Host "`n  --- DANH SACH CAC BANG VA SO LUONG DONG TRONG SQL SERVER ---" -ForegroundColor Yellow
    $cmd.CommandText = @"
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
            t.NAME
"@
    $reader = $cmd.ExecuteReader()
    $idx = 0
    while ($reader.Read()) {
        $idx++
        $tName = $reader.GetString(0)
        $tRows = $reader.GetInt64(1)
        Write-Host ("  {0,2}. {1,-25} : {2,4} dong" -f $idx, $tName, $tRows) -ForegroundColor White
    }
    $reader.Close()
    $conn.Close()
} catch {
    Write-Host "  [THAT BAI] Loi ket noi truc tiep vao SQL: $($_.Exception.Message)" -ForegroundColor Red
}

# 3. Kiem tra Backend API Database Status (/api/database/status)
Write-Host "`n[BUOC 3] Kiem tra API Backend: GET http://localhost:5106/api/database/status..." -ForegroundColor White
try {
    $apiStatus = Invoke-RestMethod -Uri "http://localhost:5106/api/database/status" -TimeoutSec 5
    if ($apiStatus.success) {
        Write-Host "  [THANH CONG] API Database tra ve trang thai ONLINE!" -ForegroundColor Green
        Write-Host "  -> Database: $($apiStatus.database)" -ForegroundColor White
        Write-Host "  -> Server: $($apiStatus.server)" -ForegroundColor White
        Write-Host "  -> Thoi gian phan hoi (Ping): $($apiStatus.pingMs) ms" -ForegroundColor Green
        Write-Host "  -> Tong so bang: $($apiStatus.totalTables) bang" -ForegroundColor White
        Write-Host "  -> Tong so ban ghi toan he thong: $($apiStatus.totalRecords) ban ghi" -ForegroundColor Yellow
    }
} catch {
    Write-Host "  [CANH BAO] Khong the ket noi API Backend tai port 5106. Kiem tra xem 'dotnet run' co dang chay khong!" -ForegroundColor Red
}

# 4. Kiem tra truy van du lieu SQL qua API (/api/database/query)
Write-Host "`n[BUOC 4] Kiem tra chay lenh SQL SELECT qua API: POST /api/database/query..." -ForegroundColor White
try {
    $queryPayload = @{
        query = "SELECT TOP 3 Id, Name, Code, AdultPrice, Status FROM Tours"
    } | ConvertTo-Json

    $queryRes = Invoke-RestMethod -Uri "http://localhost:5106/api/database/query" `
                                  -Method Post `
                                  -Body $queryPayload `
                                  -ContentType "application/json" `
                                  -TimeoutSec 5

    if ($queryRes.success) {
        Write-Host "  [THANH CONG] Truy van SQL qua API thanh cong (Thoi gian: $($queryRes.executionTimeMs) ms)!" -ForegroundColor Green
        Write-Host "  -> Du lieu 3 Tour hang dau trong SQL Database:" -ForegroundColor Cyan
        foreach ($t in $queryRes.data) {
            $formattedPrice = "{0:N0} VND" -f $t.AdultPrice
            Write-Host "     * [ID: $($t.Id)] $($t.Name) | Ma: $($t.Code) | Gia: $formattedPrice | TT: $($t.Status)" -ForegroundColor White
        }
    }
} catch {
    Write-Host "  [THAT BAI] Loi khi truy van SQL qua API: $($_.Exception.Message)" -ForegroundColor Red
}

# 5. Kiem tra truy van Chatbot Messages trong SQL
Write-Host "`n[BUOC 5] Kiem tra du lieu hoi thoai Chatbot duoc luu trong SQL Server..." -ForegroundColor White
try {
    $chatPayload = @{
        query = "SELECT TOP 4 Id, Role, Content, CreatedAt FROM ChatMessages ORDER BY Id DESC"
    } | ConvertTo-Json

    $chatRes = Invoke-RestMethod -Uri "http://localhost:5106/api/database/query" `
                                -Method Post `
                                -Body $chatPayload `
                                -ContentType "application/json" `
                                -TimeoutSec 5

    if ($chatRes.success -and $chatRes.data.Count -gt 0) {
        Write-Host "  [THANH CONG] Tim thay $($chatRes.data.Count) tin nhan luu trong SQL Database:" -ForegroundColor Green
        foreach ($m in $chatRes.data) {
            $snippet = if ($m.Content.Length -gt 60) { $m.Content.Substring(0, 60) + "..." } else { $m.Content }
            Write-Host "     * [$($m.Role.ToUpper())]: $snippet ($($m.CreatedAt))" -ForegroundColor Gray
        }
    } else {
        Write-Host "  -> Chua co tin nhan chat nao trong bang ChatMessages." -ForegroundColor Yellow
    }
} catch {
    Write-Host "  [THAT BAI] Loi khi doc bang ChatMessages: $($_.Exception.Message)" -ForegroundColor Red
}

Write-Host "`n======================================================================" -ForegroundColor Cyan
Write-Host "                 KET THUC KIEM TRA DATABASE SQL                      " -ForegroundColor Green
Write-Host "======================================================================" -ForegroundColor Cyan
