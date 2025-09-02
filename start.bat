@echo off
echo 🎓 Starting University Course Management System...

REM Check if Docker is installed
docker --version >nul 2>&1
if %errorlevel% neq 0 (
    echo ❌ Docker is not installed. Please install Docker Desktop first.
    pause
    exit /b 1
)

REM Check if Docker Compose is installed
docker-compose --version >nul 2>&1
if %errorlevel% neq 0 (
    echo ❌ Docker Compose is not installed. Please install Docker Compose first.
    pause
    exit /b 1
)

REM Create necessary directories
echo 📁 Creating necessary directories...
if not exist logs mkdir logs

REM Build and start all services
echo 🐳 Building and starting all services...
docker-compose up --build -d

REM Wait for services to be ready
echo ⏳ Waiting for services to be ready...
timeout /t 15 /nobreak >nul

REM Check service status
echo 🔍 Checking service status...
docker-compose ps

REM Show logs
echo 📋 Showing initial logs...
docker-compose logs --tail=20

echo.
echo 🎉 University CMS is starting up!
echo.
echo 📱 Access the application:
echo    Frontend: http://localhost:3000
echo    Backend API: http://localhost:9090/api
echo    Database: localhost:3306
echo.
echo 📊 Health checks:
echo    Frontend: http://localhost:3000
echo    Backend: http://localhost:9090/api/actuator/health
echo.
echo 🔧 Useful commands:
echo    View logs: docker-compose logs -f [service-name]
echo    Stop services: docker-compose down
echo    Restart services: docker-compose restart
echo    View status: docker-compose ps
echo.
pause
