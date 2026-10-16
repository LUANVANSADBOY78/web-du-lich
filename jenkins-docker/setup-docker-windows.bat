@echo off
:: BatchGotAdmin
:-------------------------------------
REM --> Check for permissions
IF "%PROCESSOR_ARCHITECTURE%" EQU "amd64" (
>nul 2>&1 "%SYSTEMROOT%\SysWOW64\cacls.exe" "%SYSTEMROOT%\SysWOW64\config\system"
) ELSE (
>nul 2>&1 "%SYSTEMROOT%\system32\cacls.exe" "%SYSTEMROOT%\system32\config\system"
)

REM --> If error flag set, we do not have admin.
if '%errorlevel%' NEQ '0' (
    echo [INFO] Dang yeu cau quyen Administrator...
    goto UACPrompt
) else ( goto gotAdmin )

:UACPrompt
    echo Set UAC = CreateObject^("Shell.Application"^) > "%temp%\getadmin.vbs"
    set params = %*:"=""
    echo UAC.ShellExecute "cmd.exe", "/c ""%~s0"" %params%", "", "runas", 1 >> "%temp%\getadmin.vbs"

    "%temp%\getadmin.vbs"
    del "%temp%\getadmin.vbs"
    exit /B

:gotAdmin
    pushd "%CD%"
    CD /D "%~dp0"
:--------------------------------------

echo ========================================================
echo   KICH HOAT AO HOA & CAI DAT CHO DOCKER DESKTOP
echo ========================================================
echo.
echo 1. Dang kich hoat Virtual Machine Platform...
dism.exe /online /enable-feature /featurename:VirtualMachinePlatform /all /norestart
echo.
echo 2. Dang kich hoat Windows Subsystem for Linux (WSL)...
dism.exe /online /enable-feature /featurename:Microsoft-Windows-Subsystem-Linux /all /norestart
echo.
echo 3. Cap nhat WSL len ban moi nhat...
wsl.exe --update
echo.
echo ========================================================
echo [HOAN TAT] Neu may tinh chua tung khoi dong lai sau khi bat ao hoa,
echo vui long KHOI DONG LAI MAY TINH (Restart PC) 1 lan duy nhat.
echo Sau do mo Docker Desktop va chay: docker compose up -d
echo ========================================================
pause
