# 🐳 Docker Deployment Guide

This guide explains how to dockerize and run the University Course Management System using Docker and Docker Compose.

## 📋 Prerequisites

Before you begin, ensure you have the following installed:

- **Docker Desktop** (Windows/Mac) or **Docker Engine** (Linux)
- **Docker Compose** (usually included with Docker Desktop)
- **Git** (to clone the repository)

### Installation Links:
- [Docker Desktop](https://www.docker.com/products/docker-desktop/)
- [Docker Compose](https://docs.docker.com/compose/install/)

## 🏗️ Architecture Overview

The application consists of three main services:

```
┌─────────────┐    ┌─────────────┐    ┌─────────────┐
│   Frontend  │    │   Backend   │    │   Database  │
│  (Angular)  │◄──►│ (Spring Boot)│◄──►│   (MySQL)   │
│   Port: 80  │    │  Port: 9090 │    │  Port: 3306 │
└─────────────┘    └─────────────┘    └─────────────┘
```

- **Frontend**: Angular application served by Nginx
- **Backend**: Spring Boot REST API
- **Database**: MySQL 8.0 with sample data

## 🚀 Quick Start

### Option 1: Using Startup Scripts

#### Windows:
```bash
# Run the startup script
start.bat
```

#### Linux/Mac:
```bash
# Make script executable
chmod +x start.sh

# Run the startup script
./start.sh
```

### Option 2: Manual Commands

1. **Clone the repository** (if not already done):
```bash
git clone https://github.com/ThishanTharuka/University-CMS-EAD-Assignment.git
cd University-CMS-EAD-Assignment
```

2. **Build and start all services**:
```bash
docker-compose up --build -d
```

3. **Check service status**:
```bash
docker-compose ps
```

## 🌐 Access Points

Once all services are running:

- **🖥️ Frontend Application**: http://localhost:3000
- **🔧 Backend API**: http://localhost:9090/api
- **🗄️ Database**: localhost:3306
- **❤️ Health Checks**: 
  - Frontend: http://localhost:3000
  - Backend: http://localhost:9090/api/actuator/health

## 📁 Docker Configuration Files

### 1. Backend Dockerfile (`cms-backend/Dockerfile`)
- Multi-stage build for optimized image size
- Uses OpenJDK 17
- Includes health checks
- Runs with non-root user for security

### 2. Frontend Dockerfile (`cms-frontend/Dockerfile`)
- Multi-stage build with Node.js and Nginx
- Production-optimized Angular build
- Custom Nginx configuration for SPA routing
- API proxy configuration

### 3. Docker Compose (`docker-compose.yml`)
- Orchestrates all three services
- Proper service dependencies and health checks
- Network isolation
- Persistent database storage

## 🔧 Management Commands

### Service Management
```bash
# Start all services
docker-compose up -d

# Stop all services
docker-compose down

# Restart a specific service
docker-compose restart [service-name]

# Rebuild and restart
docker-compose up --build -d
```

### Logs and Monitoring
```bash
# View logs for all services
docker-compose logs

# Follow logs for a specific service
docker-compose logs -f frontend
docker-compose logs -f backend
docker-compose logs -f mysql

# View last 50 lines of logs
docker-compose logs --tail=50
```

### Health Checks
```bash
# Check service status
docker-compose ps

# Check health status
docker-compose exec backend curl http://localhost:9090/api/actuator/health
docker-compose exec frontend wget -qO- http://localhost:3000/
```

## 🗄️ Database Management

### Connect to MySQL
```bash
# Connect to MySQL container
docker-compose exec mysql mysql -u cms_user -p university_cms

# Or using root
docker-compose exec mysql mysql -u root -p
```

### Database Backup
```bash
# Create backup
docker-compose exec mysql mysqldump -u root -p university_cms > backup.sql

# Restore backup
docker-compose exec -T mysql mysql -u root -p university_cms < backup.sql
```

## 🔍 Troubleshooting

### Common Issues

1. **Port Conflicts**:
   - Make sure ports 80, 3306, and 9090 are not used by other services
   - Change port mappings in `docker-compose.yml` if needed

2. **Services Not Starting**:
   ```bash
   # Check logs
   docker-compose logs [service-name]
   
   # Rebuild images
   docker-compose build --no-cache
   ```

3. **Database Connection Issues**:
   ```bash
   # Check database logs
   docker-compose logs mysql
   
   # Verify database is healthy
   docker-compose exec mysql mysqladmin ping -h localhost
   ```

4. **Frontend Not Loading**:
   ```bash
   # Check Nginx logs
   docker-compose logs frontend
   
   # Verify Nginx configuration
   docker-compose exec frontend nginx -t
   ```

### Service Dependencies

The services start in this order:
1. **MySQL** (must be healthy before backend starts)
2. **Backend** (must be healthy before frontend starts)
3. **Frontend** (serves the application)

## 🛡️ Security Considerations

- Non-root users in containers
- Network isolation between services
- Security headers in Nginx
- Environment-based configuration
- Health checks for monitoring

## 🔧 Development vs Production

### Development Mode
- Uses `environment.ts` with localhost URLs
- Source maps enabled
- Debug logging

### Production Mode (Docker)
- Uses `environment.prod.ts` with relative URLs
- Optimized builds
- Nginx proxy for API calls
- Health monitoring

## 📊 Monitoring and Metrics

### Built-in Health Checks
- MySQL: `mysqladmin ping`
- Backend: Spring Boot Actuator `/health` endpoint
- Frontend: Nginx status check

### Accessing Metrics
```bash
# Backend health and metrics
curl http://localhost:9090/api/actuator/health
curl http://localhost:9090/api/actuator/info
curl http://localhost:9090/api/actuator/metrics
```

## 🔄 Updates and Maintenance

### Updating the Application
1. Pull latest changes from Git
2. Rebuild and restart services:
```bash
git pull
docker-compose down
docker-compose up --build -d
```

### Cleaning Up
```bash
# Remove all containers and images
docker-compose down --rmi all

# Remove volumes (⚠️ This will delete database data)
docker-compose down -v

# Clean up unused Docker resources
docker system prune -a
```

## 🌍 Environment Variables

### Backend Environment Variables
- `SPRING_PROFILES_ACTIVE`: Set to "docker" for container environment
- `SPRING_DATASOURCE_URL`: Database connection string
- `SPRING_DATASOURCE_USERNAME`: Database username
- `SPRING_DATASOURCE_PASSWORD`: Database password

### Frontend Environment Variables
- Production build automatically uses `/api` for API calls (proxied by Nginx)

## 📝 Logs Location

Docker logs are managed by the Docker daemon. Use `docker-compose logs` to view them. For persistent logging, you can mount log directories:

```yaml
volumes:
  - ./logs:/app/logs
```

---

## 🎯 Quick Reference

| Service | URL | Port | Health Check |
|---------|-----|------|--------------|
| Frontend | http://localhost:3000 | 3000→80 | http://localhost:3000 |
| Backend | http://localhost:9090/api | 9090 | http://localhost:9090/api/actuator/health |
| Database | localhost | 3306 | `mysqladmin ping` |

**Happy Dockerizing! 🐳🎓**
