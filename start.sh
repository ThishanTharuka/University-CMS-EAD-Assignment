#!/bin/bash

# University CMS Docker Startup Script
echo "🎓 Starting University Course Management System..."

# Check if Docker and Docker Compose are installed
if ! command -v docker &> /dev/null; then
    echo "❌ Docker is not installed. Please install Docker first."
    exit 1
fi

if ! command -v docker-compose &> /dev/null; then
    echo "❌ Docker Compose is not installed. Please install Docker Compose first."
    exit 1
fi

# Create necessary directories
echo "📁 Creating necessary directories..."
mkdir -p logs

# Build and start all services
echo "🐳 Building and starting all services..."
docker-compose up --build -d

# Wait for services to be healthy
echo "⏳ Waiting for services to be ready..."
sleep 10

# Check service status
echo "🔍 Checking service status..."
docker-compose ps

# Show logs
echo "📋 Showing initial logs..."
docker-compose logs --tail=20

echo ""
echo "🎉 University CMS is starting up!"
echo ""
echo "📱 Access the application:"
echo "   Frontend: http://localhost:3000"
echo "   Backend API: http://localhost:9090/api"
echo "   Database: localhost:3306"
echo ""
echo "📊 Health checks:"
echo "   Frontend: http://localhost:3000"
echo "   Backend: http://localhost:9090/api/actuator/health"
echo ""
echo "🔧 Useful commands:"
echo "   View logs: docker-compose logs -f [service-name]"
echo "   Stop services: docker-compose down"
echo "   Restart services: docker-compose restart"
echo "   View status: docker-compose ps"
echo ""
