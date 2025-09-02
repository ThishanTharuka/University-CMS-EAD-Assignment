# Sample data for University CMS

# Create sample courses
INSERT INTO courses (code, title, description, credits, semester, department, created_at, updated_at) VALUES 
('CS101', 'Introduction to Computer Science', 'Basic concepts of computer science and programming', 3, 'Fall 2024', 'Computer Science', NOW(), NOW()),
('CS201', 'Data Structures and Algorithms', 'Advanced data structures and algorithm design', 4, 'Spring 2024', 'Computer Science', NOW(), NOW()),
('MATH101', 'Calculus I', 'Differential and integral calculus', 3, 'Fall 2024', 'Mathematics', NOW(), NOW()),
('ENG101', 'English Composition', 'Academic writing and communication skills', 3, 'Fall 2024', 'English', NOW(), NOW()),
('PHYS101', 'Physics I', 'Mechanics and thermodynamics', 4, 'Spring 2024', 'Physics', NOW(), NOW());

# Create sample students
INSERT INTO students (student_id, first_name, last_name, email, phone, department, year_of_study, created_at, updated_at) VALUES
('S001', 'John', 'Doe', 'john.doe@university.edu', '+1234567890', 'Computer Science', 2, NOW(), NOW()),
('S002', 'Jane', 'Smith', 'jane.smith@university.edu', '+1234567891', 'Computer Science', 3, NOW(), NOW()),
('S003', 'Bob', 'Johnson', 'bob.johnson@university.edu', '+1234567892', 'Mathematics', 1, NOW(), NOW()),
('S004', 'Alice', 'Brown', 'alice.brown@university.edu', '+1234567893', 'Physics', 2, NOW(), NOW()),
('S005', 'Charlie', 'Wilson', 'charlie.wilson@university.edu', '+1234567894', 'English', 4, NOW(), NOW());

# Create sample enrollments
INSERT INTO enrollments (student_id, course_id, enrollment_date, status, semester, academic_year, created_at, updated_at)
SELECT s.id, c.id, NOW(), 'ENROLLED', 'Fall 2024', '2024-2025', NOW(), NOW()
FROM students s, courses c 
WHERE (s.student_id = 'S001' AND c.code = 'CS101')
   OR (s.student_id = 'S001' AND c.code = 'MATH101')
   OR (s.student_id = 'S002' AND c.code = 'CS201')
   OR (s.student_id = 'S002' AND c.code = 'CS101')
   OR (s.student_id = 'S003' AND c.code = 'MATH101')
   OR (s.student_id = 'S004' AND c.code = 'PHYS101')
   OR (s.student_id = 'S005' AND c.code = 'ENG101');
