$connStr = "Server=localhost;Database=GoTravelDB;Trusted_Connection=True;TrustServerCertificate=True;"
try {
    $conn = New-Object System.Data.SqlClient.SqlConnection($connStr)
    $conn.Open()
    Write-Host ">>> KET NOI THANH CONG DEN DATABASE SQL: GoTravelDB" -ForegroundColor Green
    
    $cmd = $conn.CreateCommand()
    $cmd.CommandText = "SELECT TABLE_NAME FROM INFORMATION_SCHEMA.TABLES WHERE TABLE_TYPE = 'BASE TABLE' ORDER BY TABLE_NAME"
    $reader = $cmd.ExecuteReader()
    Write-Host "`n--- DANH SACH CAC BANG HIEN CO TRONG SQL DATABASE ---" -ForegroundColor Cyan
    $count = 0
    while ($reader.Read()) {
        $count++
        Write-Host "$count. $($reader[0])"
    }
    $reader.Close()
    
    # Kiem tra so luong Tour va Message
    Write-Host "`n--- THONG KE DU LIEU HIEN CO ---" -ForegroundColor Yellow
    $queries = @(
        "SELECT COUNT(*) FROM Tours",
        "SELECT COUNT(*) FROM Destinations",
        "SELECT COUNT(*) FROM ChatConversations",
        "SELECT COUNT(*) FROM ChatMessages"
    )
    $names = @("Tours", "Destinations", "ChatConversations", "ChatMessages")
    for ($i = 0; $i -lt $queries.Length; $i++) {
        try {
            $cmd.CommandText = $queries[$i]
            $val = $cmd.ExecuteScalar()
            Write-Host "$($names[$i]): $val ban ghi"
        } catch {
            Write-Host "$($names[$i]): Chua ton tai bang hoac loi"
        }
    }
    
    $conn.Close()
} catch {
    Write-Host ">>> LOI KET NOI SQL: $($_.Exception.Message)" -ForegroundColor Red
}
