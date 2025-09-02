-- Create the database if it doesn't exist
CREATE DATABASE IF NOT EXISTS university_cms;
USE university_cms;

-- Create courses table
CREATE TABLE IF NOT EXISTS courses (
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

-- Create students table
CREATE TABLE IF NOT EXISTS students (
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

-- Insert sample courses
INSERT IGNORE INTO courses (code, title, description, credits, semester, department) VALUES 
('CS101', 'Introduction to Computer Science', 'Basic concepts of computer science and programming', 3, 'Fall', 'Computer Science'),
('CS102', 'Data Structures and Algorithms', 'Fundamental data structures and algorithm design', 4, 'Spring', 'Computer Science'),
('MATH101', 'Calculus I', 'Differential and integral calculus', 4, 'Fall', 'Mathematics'),
('ENG101', 'English Composition', 'Academic writing and communication skills', 3, 'Fall', 'English'),
('PHY101', 'General Physics I', 'Mechanics and thermodynamics', 4, 'Fall', 'Physics'),
('CS201', 'Object-Oriented Programming', 'Advanced programming concepts using OOP', 3, 'Spring', 'Computer Science'),
('CS301', 'Database Systems', 'Database design, SQL, and database management', 3, 'Fall', 'Computer Science'),
('CS401', 'Software Engineering', 'Software development lifecycle and methodologies', 4, 'Spring', 'Computer Science');

-- Insert sample students
INSERT IGNORE INTO students (student_id, first_name, last_name, email, phone, department, year_of_study) VALUES 
('STU001', 'John', 'Doe', 'john.doe@university.edu', '123-456-7890', 'Computer Science', 2),
('STU002', 'Jane', 'Smith', 'jane.smith@university.edu', '123-456-7891', 'Computer Science', 3),
('STU003', 'Mike', 'Johnson', 'mike.johnson@university.edu', '123-456-7892', 'Mathematics', 1),
('STU004', 'Sarah', 'Wilson', 'sarah.wilson@university.edu', '123-456-7893', 'Physics', 2),
('STU005', 'David', 'Brown', 'david.brown@university.edu', '123-456-7894', 'Computer Science', 4),
('STU006', 'Emily', 'Davis', 'emily.davis@university.edu', '123-456-7895', 'English', 1),
('STU007', 'Chris', 'Miller', 'chris.miller@university.edu', '123-456-7896', 'Computer Science', 3),
('STU008', 'Lisa', 'Garcia', 'lisa.garcia@university.edu', '123-456-7897', 'Mathematics', 2);
