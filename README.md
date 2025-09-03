# University Course Management System

A modern enterprise-level web application built with Spring Boot backend and Angular frontend, demonstrating the transition from legacy Java EE technologies to contemporary, scalable solutions.

## 🎯 Project Overview
This project replaces traditional Java EE technologies (Servlets, JSP, EJB) with modern alternatives, creating a comprehensive university course management system for handling course offerings, student registrations, and academic records.

## 🏗️ Modern Tech Stack Transformation

| Legacy Technology | Modern Equivalent Used |
|-------------------|------------------------|
| Servlets | REST APIs using Spring Boot |
| JSP | Angular 18 Frontend |
| EJB | Spring Boot Services with Spring Data JPA |
| XML Config | YAML Configuration & Annotations |
| SOAP Web Services | RESTful Web Services (JSON) |
| Application Server | Embedded Tomcat / Docker |
| JDBC | Spring Data JPA / Hibernate |

## 💻 Technologies Used

### Backend
- **Framework**: Spring Boot 3.x
- **Language**: Java 17
- **Database**: MySQL 8.x
- **ORM**: Spring Data JPA with Hibernate
- **Build Tool**: Maven
- **API**: RESTful Web Services (JSON)

### Frontend
- **Framework**: Angular 18
- **UI Library**: Angular Material
- **Language**: TypeScript
- **Build Tool**: Angular CLI
- **Styling**: SCSS with responsive design

### DevOps & Infrastructure
- **Containerization**: Docker & Docker Compose
- **Web Server**: Nginx (production)
- **Database**: MySQL container
- **Development**: Hot reload for both frontend and backend

## 🚀 Setup Instructions

### Prerequisites

- JDK 17 or higher
- Node.js 18+ and npm
- Docker Desktop (recommended)
- Git

### Option 1: Quick Start with Docker (Recommended)

```bash
# Clone the repository
git clone https://github.com/ThishanTharuka/University-CMS-EAD-Assignment.git
cd University-CMS-EAD-Assignment

# Start the entire application using the startup script
bash start.sh

# OR start manually with docker-compose
docker-compose up --build -d

# Access the application:
# Frontend: http://localhost:3000
# Backend API: http://localhost:9090/api
# Database: localhost:3306
# Health Check: http://localhost:9090/api/actuator/health
```

#### 🔧 **Application Management Commands:**

```bash
# 🚀 START the application
bash start.sh                    # Using startup script (recommended)
# OR
docker-compose up --build -d     # Using docker-compose directly

# 📊 CHECK status of all services
docker-compose ps

# 📋 VIEW logs
docker-compose logs -f           # All services
docker-compose logs -f backend   # Backend only
docker-compose logs -f frontend  # Frontend only
docker-compose logs -f mysql     # Database only

# 🔄 RESTART services
docker-compose restart           # All services
docker-compose restart backend   # Backend only

# 🛑 STOP the application
docker-compose down              # Stop and remove containers
docker-compose down -v           # Stop and remove containers + volumes (clears database)

# 🧹 CLEANUP (removes all images and volumes)
docker-compose down -v --rmi all
```

#### 🔍 **Troubleshooting:**

```bash
# If containers fail to start, rebuild them
docker-compose down
docker-compose up --build -d

# Check container health
docker-compose ps
docker inspect university_cms_backend --format='{{.State.Health.Status}}'

# View real-time logs for debugging
docker-compose logs -f backend
```

### Option 2: Manual Setup (Development)

#### Backend Setup

1. **Start MySQL Database**

   ```bash
   docker-compose up mysql -d
   ```

2. **Navigate to backend directory**

   ```bash
   cd cms-backend
   ```

3. **Build and run the Spring Boot application**

   ```bash
   ./mvnw spring-boot:run
   ```
   Backend will be available at: `http://localhost:9090/api`

#### Frontend Setup

1. **Navigate to frontend directory**

   ```bash
   cd cms-frontend
   ```

2. **Install dependencies and start**

   ```bash
   npm install
   npm start
   ```
   Frontend will be available at: `http://localhost:4200`

### 🎯 **Startup Scripts Available:**

#### For Windows:
```cmd
start.bat
```

#### For Linux/Mac:
```bash
bash start.sh
# OR
chmod +x start.sh
./start.sh
```

Both scripts will:
- ✅ Check Docker installation
- ✅ Create necessary directories
- ✅ Build and start all services
- ✅ Show service status and logs
- ✅ Display access URLs

## 🌟 Key Features

- ✅ Modern responsive UI with Angular Material
- ✅ RESTful API architecture with Spring Boot
- ✅ Complete CRUD operations for courses, students, and enrollments
- ✅ Professional dashboard interface
- ✅ Real-time data synchronization
- ✅ Mobile-friendly responsive design
- ✅ Docker containerization for easy deployment
- ✅ Enterprise-grade architecture patterns

## 🔧 API Endpoints

### Course Management

- `GET /api/courses` - Get all courses
- `GET /api/courses/{id}` - Get course by ID
- `GET /api/courses/code/{code}` - Get course by code
- `POST /api/courses` - Create new course
- `PUT /api/courses/{id}` - Update course
- `DELETE /api/courses/{id}` - Delete course
- `GET /api/courses/department/{department}` - Get courses by department
- `GET /api/courses/semester/{semester}` - Get courses by semester
- `GET /api/courses/search?keyword={keyword}` - Search courses

### Student Management

- `GET /api/students` - Get all students
- `POST /api/students` - Create new student
- `PUT /api/students/{id}` - Update student
- `DELETE /api/students/{id}` - Delete student

### Enrollment Management

- `GET /api/enrollments` - Get all enrollments
- `POST /api/enrollments` - Create enrollment
- `DELETE /api/enrollments/{id}` - Remove enrollment

## 🎓 Assignment Compliance

This project fulfills all assignment requirements:

- ✅ **Functional Web Application**: Complete full-stack system with backend and frontend
- ✅ **Modern Tech Stack**: Successfully replaced legacy technologies with modern alternatives
- ✅ **Enterprise Patterns**: Implements REST APIs, JPA, responsive frontend, and containerization
- ✅ **Professional UI/UX**: Modern Angular Material design with responsive layout
- ✅ **Source Code**: Complete codebase with proper structure and documentation
- ✅ **Deployment Ready**: Docker configuration for easy deployment

## 📊 Database Schema

The application manages the following core entities:

- **Courses**: Course information (code, title, description, credits, department, semester)
- **Students**: Student details and enrollment information  
- **Enrollments**: Many-to-many relationship between courses and students
- **User Management**: Authentication and authorization (planned)

### Sample Course Data

The database initializes with sample courses including:

- CS101: Introduction to Computer Science
- CS102: Data Structures and Algorithms
- MATH101: Calculus I
- ENG101: English Composition
- And more comprehensive course catalog

## ⚙️ Database Configuration

The application connects to MySQL with these settings:

- **Database**: university_cms
- **Username**: root
- **Password**: root
- **Port**: 3306

## 🐳 Docker Configuration

The project includes complete containerization setup:

- `Dockerfile` for Spring Boot backend
- `Dockerfile` for Angular frontend with Nginx
- `docker-compose.yml` for full-stack deployment
- `docker-compose.override.yml` for development environment

## 📁 Project Structure

```text
University-CMS-EAD-Assignment/
├── .git/                        # Git version control
├── cms-backend/                 # Spring Boot backend application
│   ├── .mvn/                   # Maven wrapper files
│   ├── .vscode/                # VS Code workspace settings
│   ├── src/                    # Source code
│   │   ├── main/
│   │   │   ├── java/com/thishan/cms_backend/
│   │   │   │   ├── controller/  # REST API controllers
│   │   │   │   ├── entity/     # JPA entities (Course, Student, etc.)
│   │   │   │   ├── repository/ # Data access repositories
│   │   │   │   ├── service/    # Business logic services
│   │   │   │   ├── config/     # Configuration classes
│   │   │   │   └── CmsBackendApplication.java
│   │   │   └── resources/
│   │   │       ├── application.yml  # Application configuration
│   │   │       └── static/          # Static resources
│   │   └── test/               # Test classes
│   ├── target/                 # Maven build output
│   ├── Dockerfile             # Backend containerization
│   ├── pom.xml                # Maven dependencies
│   ├── mvnw                   # Maven wrapper (Unix)
│   └── mvnw.cmd               # Maven wrapper (Windows)
├── cms-frontend/               # Angular frontend application
│   ├── .angular/              # Angular build cache
│   ├── .vscode/               # VS Code workspace settings
│   ├── src/                   # Frontend source code
│   │   ├── app/               # Angular application
│   │   │   ├── components/    # Reusable components
│   │   │   ├── services/      # HTTP and business services
│   │   │   ├── models/        # TypeScript interfaces
│   │   │   ├── app.component.* # Root component
│   │   │   └── app.module.ts  # Root module
│   │   ├── assets/            # Static assets (images, icons)
│   │   ├── environments/      # Environment configurations
│   │   ├── styles.scss        # Global styles
│   │   └── index.html         # Main HTML file
│   ├── dist/                  # Build output
│   ├── node_modules/          # npm dependencies
│   ├── public/                # Public assets
│   ├── Dockerfile             # Frontend containerization
│   ├── nginx.conf             # Nginx configuration for production
│   ├── angular.json           # Angular CLI configuration
│   ├── package.json           # npm dependencies and scripts
│   ├── package-lock.json      # npm lock file
│   ├── tsconfig.json          # TypeScript configuration
│   └── tsconfig.app.json      # App-specific TypeScript config
├── mysql-logs/                 # MySQL container logs
├── ARCHITECTURE.md             # System architecture documentation
├── DOCKER.md                   # Docker setup and deployment guide
├── PROJECT_REPORT.md           # Comprehensive project report
├── SUBMISSION_CHECKLIST.md     # Assignment submission checklist
├── docker-compose.yml          # Multi-container orchestration
├── docker-compose.override.yml # Development environment overrides
├── init.sql                    # Database initialization script
├── start.bat                   # Windows startup script
├── start.sh                    # Unix/Linux startup script
└── README.md                   # Project documentation (this file)
```

## 👥 Development Team

- **Student Name**: W.P.T.T.Perera
- **Student ID**: CS/2019/048
- **Course**: Enterprise Application Development
