@echo off
cd /d "%~dp0"
echo ========================================================
echo   KHOI DONG JENKINS SERVER TRONG DOCKER
echo ========================================================
echo.
echo Dang build va khoi dong Jenkins...
docker compose up -d --build
echo.
echo ========================================================
echo   JENKINS DANG CHAY TAI: http://localhost:8080
echo ========================================================
echo.
echo Dang lay mat khau khoi tao admin (Admin Password)...
timeout /t 10 /nobreak >nul
docker exec jenkins-server cat /var/jenkins_home/secrets/initialAdminPassword
echo.
echo Hay sao chep mat khau tren va dan vao http://localhost:8080
pause
