# University Course Management System - Architecture

## System Overview

A modern enterprise-level web application for managing university courses, student registrations, and academic results using Spring Boot backend and Angular with Material UI frontend.

## Architecture Diagram

```
┌─────────────────────────────────────────────────────────────────┐
│                          Client Layer                           │
├─────────────────────────────────────────────────────────────────┤
│  Angular 17+ with Material UI                                   │
│  ├── Components (Course List, Student Management, etc.)         │
│  ├── Services (HTTP Client, State Management)                   │
│  ├── Guards (Authentication, Authorization)                     │
│  └── Models (TypeScript Interfaces)                             │
└─────────────────────────────────────────────────────────────────┘
                                │
                                │ HTTP/REST API
                                │
┌─────────────────────────────────────────────────────────────────┐
│                        API Gateway Layer                        │
├─────────────────────────────────────────────────────────────────┤
│  Spring Boot 3.x REST Controllers                               │
│  ├── CourseController (/api/courses)                            │
│  ├── StudentController (/api/students)                          │
│  ├── RegistrationController (/api/registrations)                │
│  └── ResultController (/api/results)                            │
└─────────────────────────────────────────────────────────────────┘
                                │
┌─────────────────────────────────────────────────────────────────┐
│                        Service Layer                            │
├─────────────────────────────────────────────────────────────────┤
│  Business Logic Services                                        │
│  ├── CourseService                                              │
│  ├── StudentService                                             │
│  ├── RegistrationService                                        │
│  └── ResultService                                              │
└─────────────────────────────────────────────────────────────────┘
                                │
┌─────────────────────────────────────────────────────────────────┐
│                      Repository Layer                           │
├─────────────────────────────────────────────────────────────────┤
│  Spring Data JPA Repositories                                   │
│  ├── CourseRepository                                           │
│  ├── StudentRepository                                          │
│  ├── RegistrationRepository                                     │
│  └── ResultRepository                                           │
└─────────────────────────────────────────────────────────────────┘
                                │
┌─────────────────────────────────────────────────────────────────┐
│                        Data Layer                               │
├─────────────────────────────────────────────────────────────────┤
│  MySQL Database                                                 │
│  ├── courses table                                              │
│  ├── students table                                             │
│  ├── course_registrations table                                 │
│  └── results table                                              │
└─────────────────────────────────────────────────────────────────┘
```

## Technology Stack

### Backend

- **Framework**: Spring Boot 3.x
- **Language**: Java 17
- **Database**: MySQL 8.x
- **ORM**: Spring Data JPA with Hibernate
- **Build Tool**: Maven
- **Server**: Embedded Tomcat
- **API**: RESTful Web Services (JSON)

### Frontend

- **Framework**: Angular 17+
- **UI Library**: Angular Material
- **Language**: TypeScript
- **Build Tool**: Angular CLI
- **HTTP Client**: Angular HttpClient
- **State Management**: Angular Services (or NgRx for complex state)

### DevOps & Deployment

- **Containerization**: Docker
- **Database**: MySQL Docker Container
- **Deployment**: Railway/Render/Heroku
- **Version Control**: Git (GitHub)

## Database Schema

### Entities and Relationships

```sql
-- Courses Table
CREATE TABLE courses (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    code VARCHAR(10) UNIQUE NOT NULL,
    title VARCHAR(100) NOT NULL,
    description TEXT,
    credits INT NOT NULL,
    semester VARCHAR(20),
    department VARCHAR(50),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- Students Table
CREATE TABLE students (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    student_id VARCHAR(20) UNIQUE NOT NULL,
    first_name VARCHAR(50) NOT NULL,
    last_name VARCHAR(50) NOT NULL,
    email VARCHAR(100) UNIQUE NOT NULL,
    phone VARCHAR(15),
    department VARCHAR(50),
    year_of_study INT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- Course Registrations Table
CREATE TABLE course_registrations (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    student_id BIGINT NOT NULL,
    course_id BIGINT NOT NULL,
    registration_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    status VARCHAR(20) DEFAULT 'ACTIVE',
    FOREIGN KEY (student_id) REFERENCES students(id),
    FOREIGN KEY (course_id) REFERENCES courses(id),
    UNIQUE KEY unique_student_course (student_id, course_id)
);

-- Results Table
CREATE TABLE results (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    registration_id BIGINT NOT NULL,
    grade VARCHAR(5),
    marks DECIMAL(5,2),
    semester VARCHAR(20),
    academic_year VARCHAR(10),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (registration_id) REFERENCES course_registrations(id)
);
```

## Package Structure (Backend)

```
src/main/java/com/thishan/cmsbackend/
├── CmsBackendApplication.java
├── config/
│   ├── CorsConfig.java
│   └── DatabaseConfig.java
├── controller/
│   ├── CourseController.java
│   ├── StudentController.java
│   ├── RegistrationController.java
│   └── ResultController.java
├── service/
│   ├── CourseService.java
│   ├── StudentService.java
│   ├── RegistrationService.java
│   └── ResultService.java
├── repository/
│   ├── CourseRepository.java
│   ├── StudentRepository.java
│   ├── RegistrationRepository.java
│   └── ResultRepository.java
├── entity/
│   ├── Course.java
│   ├── Student.java
│   ├── CourseRegistration.java
│   └── Result.java
├── dto/
│   ├── CourseDTO.java
│   ├── StudentDTO.java
│   ├── RegistrationDTO.java
│   └── ResultDTO.java
└── exception/
    ├── GlobalExceptionHandler.java
    └── ResourceNotFoundException.java
```

## API Endpoints

### Course Management

- `GET /api/courses` - Get all courses
- `GET /api/courses/{id}` - Get course by ID
- `POST /api/courses` - Create new course
- `PUT /api/courses/{id}` - Update course
- `DELETE /api/courses/{id}` - Delete course

### Student Management

- `GET /api/students` - Get all students
- `GET /api/students/{id}` - Get student by ID
- `POST /api/students` - Create new student
- `PUT /api/students/{id}` - Update student
- `DELETE /api/students/{id}` - Delete student

### Registration Management

- `GET /api/registrations` - Get all registrations
- `GET /api/registrations/student/{studentId}` - Get registrations by student
- `GET /api/registrations/course/{courseId}` - Get registrations by course
- `POST /api/registrations` - Register student for course
- `DELETE /api/registrations/{id}` - Cancel registration

### Results Management

- `GET /api/results` - Get all results
- `GET /api/results/student/{studentId}` - Get results by student
- `GET /api/results/course/{courseId}` - Get results by course
- `POST /api/results` - Add result
- `PUT /api/results/{id}` - Update result

## Features to Implement

### Core Features

1. **Course Management**
   - CRUD operations for courses
   - Search and filter courses
   - Course details with prerequisites

2. **Student Management**
   - Student registration and profile management
   - Student search and filtering

3. **Course Registration**
   - Students can register for courses
   - View enrolled courses
   - Registration validation (prerequisites, capacity)

4. **Results Management**
   - Add/update student grades
   - Generate transcripts
   - Grade statistics

### Additional Features

5. **Dashboard**
   - Overview statistics
   - Recent activities
   - Quick actions

6. **Reporting**
   - Student reports
   - Course enrollment reports
   - Grade distribution reports

## Security Considerations

- Input validation and sanitization
- SQL injection prevention (JPA handles this)
- CORS configuration for frontend integration
- Error handling and logging

## Performance Considerations

- Database indexing on frequently queried fields
- Pagination for large datasets
- Caching for frequently accessed data
- Connection pooling for database connections

This architecture provides a solid foundation for a scalable, maintainable enterprise application following modern development practices.
