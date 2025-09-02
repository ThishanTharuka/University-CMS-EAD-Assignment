# University Course Management System

A modern enterprise-level web application built with Spring Boot backend and Angular frontend using Material UI.

## Tech Stack

### Backend
- **Framework**: Spring Boot 3.x
- **Language**: Java 17
- **Database**: MySQL 8.x
- **ORM**: Spring Data JPA with Hibernate
- **Build Tool**: Maven

### Frontend (Planned)
- **Framework**: Angular 17+
- **UI Library**: Angular Material
- **Language**: TypeScript

## Setup Instructions

### Prerequisites
- JDK 17 or higher
- Node.js 16+ (for frontend)
- Docker Desktop (for MySQL)
- Maven (or use wrapper)

### Backend Setup

1. **Start MySQL Database using Docker**
   ```bash
   docker-compose up -d
   ```
   This will start MySQL on port 3306 with the database `university_cms` and sample data.

2. **Navigate to backend directory**
   ```bash
   cd cms-backend
   ```

3. **Build and run the Spring Boot application**
   ```bash
   ./mvnw spring-boot:run
   ```
   
   Or if you have Maven installed:
   ```bash
   mvn spring-boot:run
   ```

4. **Test the API**
   - Backend will be available at: `http://localhost:8080/api`
   - Test courses endpoint: `http://localhost:8080/api/courses`

### API Endpoints

#### Course Management
- `GET /api/courses` - Get all courses
- `GET /api/courses/{id}` - Get course by ID
- `GET /api/courses/code/{code}` - Get course by code
- `POST /api/courses` - Create new course
- `PUT /api/courses/{id}` - Update course
- `DELETE /api/courses/{id}` - Delete course
- `GET /api/courses/department/{department}` - Get courses by department
- `GET /api/courses/semester/{semester}` - Get courses by semester
- `GET /api/courses/search?keyword={keyword}` - Search courses by title

### Sample Course Data
The database will be initialized with sample courses including:
- CS101: Introduction to Computer Science
- CS102: Data Structures and Algorithms
- MATH101: Calculus I
- ENG101: English Composition
- And more...

### Database Configuration
The application is configured to connect to MySQL with these settings:
- **Database**: university_cms
- **Username**: root
- **Password**: root
- **Port**: 3306

### Development Notes
- The backend uses Spring Boot DevTools for hot reload during development
- CORS is configured to allow Angular frontend (localhost:4200)
- JPA is set to `update` mode to automatically create/update database schema

### Next Steps
1. Set up Angular frontend with Material UI
2. Implement student management features
3. Add course registration functionality
4. Implement results management
5. Add authentication and authorization
6. Deploy to cloud platform

## Project Structure

```
University-CMS-EAD-Assignment/
├── cms-backend/                 # Spring Boot backend
│   ├── src/main/java/com/thishan/cms_backend/
│   │   ├── entity/             # JPA entities
│   │   ├── repository/         # Data repositories
│   │   ├── service/            # Business logic
│   │   ├── controller/         # REST controllers
│   │   └── config/             # Configuration classes
│   ├── src/main/resources/
│   │   └── application.yml     # Application configuration
│   └── pom.xml                 # Maven dependencies
├── docker-compose.yml          # MySQL database setup
├── init.sql                    # Database initialization script
└── ARCHITECTURE.md             # Detailed architecture documentation
```