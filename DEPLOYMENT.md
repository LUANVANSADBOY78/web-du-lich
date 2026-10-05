# GoTravel Deployment Guide

Hệ thống GoTravel đã được thiết lập sẵn sàng triển khai tự động qua **Jenkins + Docker**.

## 1. Yêu cầu hệ thống (VPS Ubuntu)
- Docker Engine & Docker Compose plugin
- Jenkins
- Git

## 2. Các bước triển khai

### Bước 1: Setup Credentials trong Jenkins
Vào Jenkins -> Manage Jenkins -> Credentials. Thêm các `Secret text`:
- `gotravel-db-password`: Mật khẩu siêu bảo mật cho SQL Server (sa).
- `gotravel-jwt-secret`: Chuỗi secret cho cấu hình JWT Token.
- `gotravel-ai-key`: API key cho AI (nếu có).

### Bước 2: Thiết lập Pipeline
- Tạo một Jenkins Pipeline project.
- Chọn **Pipeline script from SCM**, cấu hình repository GitHub của project.
- Chỉ định branch `main` và script path `Jenkinsfile`.

### Bước 3: Đặt Webhook
- Thiết lập Webhook trên GitHub Settings -> Payload URL trỏ tới `http://YOUR_JENKINS_IP/github-webhook/`.
- Khi bạn push code lên `main`, Jenkins sẽ tự trigger pipeline.

## 3. Quá trình Jenkins chạy
Jenkinsfile sẽ tự động thực hiện:
1. `Checkout`: Lấy code mới nhất.
2. `Build Images`: Build image React (Multi-stage + Nginx) và ASP.NET Core API.
3. `Deploy`: Tự tạo `.env`, sử dụng `docker-compose.yml` + `docker-compose.production.yml` để chạy stack. 
4. `Health Check`: Đảm bảo API `/health` phản hồi trạng thái `Healthy` trước khi báo Success. Lệnh `context.Database.Migrate()` trong Backend sẽ tự động apply migrations khi backend khởi động lên.

## 4. Quản lý Dữ liệu
- **Rollback**: Jenkins lưu các image theo tag `BUILD_NUMBER`. Trong trường hợp lỗi nghiêm trọng, bạn có thể chạy `docker compose down` sau đó đổi tag trong `docker-compose.production.yml` về số phiên bản cũ.
- **Backup**: Trình chạy backup tay nằm tại `scripts/backup-db.sh`. Yêu cầu pass `DB_PASSWORD` dưới dạng env var để chạy backup trước khi rollback hoặc deploy nguy hiểm.

*(Ghi chú: SQL Server Volume được lưu kiên cố qua volume `sqlserver-data`, quá trình deploy sẽ KHÔNG LÀM MẤT dữ liệu!)*
