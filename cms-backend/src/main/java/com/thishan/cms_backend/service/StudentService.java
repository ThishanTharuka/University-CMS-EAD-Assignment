package com.thishan.cms_backend.service;

import com.thishan.cms_backend.entity.Student;
import com.thishan.cms_backend.repository.StudentRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class StudentService {
    
    @Autowired
    private StudentRepository studentRepository;
    
    // Get all students
    public List<Student> getAllStudents() {
        return studentRepository.findAll();
    }
    
    // Get student by ID
    public Optional<Student> getStudentById(Long id) {
        return studentRepository.findById(id);
    }
    
    // Get student by student ID
    public Optional<Student> getStudentByStudentId(String studentId) {
        return studentRepository.findByStudentId(studentId);
    }
    
    // Get student by email
    public Optional<Student> getStudentByEmail(String email) {
        return studentRepository.findByEmail(email);
    }
    
    // Create a new student
    public Student createStudent(Student student) {
        // Check if student ID already exists
        if (studentRepository.existsByStudentId(student.getStudentId())) {
            throw new RuntimeException("Student with ID " + student.getStudentId() + " already exists");
        }
        
        // Check if email already exists
        if (studentRepository.existsByEmail(student.getEmail())) {
            throw new RuntimeException("Student with email " + student.getEmail() + " already exists");
        }
        
        return studentRepository.save(student);
    }
    
    // Update an existing student
    public Student updateStudent(Long id, Student studentDetails) {
        Student student = studentRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Student not found with id: " + id));
        
        // Update student ID if provided and unique
        if (studentDetails.getStudentId() != null &&
                !student.getStudentId().equals(studentDetails.getStudentId())) {
            if (studentRepository.existsByStudentId(studentDetails.getStudentId())) {
                throw new RuntimeException("Student with ID " + studentDetails.getStudentId() + " already exists");
            }
            student.setStudentId(studentDetails.getStudentId());
        }

        // Update email if provided and unique
        if (studentDetails.getEmail() != null &&
                !student.getEmail().equals(studentDetails.getEmail())) {
            if (studentRepository.existsByEmail(studentDetails.getEmail())) {
                throw new RuntimeException("Student with email " + studentDetails.getEmail() + " already exists");
            }
            student.setEmail(studentDetails.getEmail());
        }

        if (studentDetails.getFirstName() != null) {
            student.setFirstName(studentDetails.getFirstName());
        }
        if (studentDetails.getLastName() != null) {
            student.setLastName(studentDetails.getLastName());
        }
        if (studentDetails.getPhone() != null) {
            student.setPhone(studentDetails.getPhone());
        }
        if (studentDetails.getDepartment() != null) {
            student.setDepartment(studentDetails.getDepartment());
        }
        if (studentDetails.getYearOfStudy() != null) {
            student.setYearOfStudy(studentDetails.getYearOfStudy());
        }
        
        return studentRepository.save(student);
    }
    
    // Delete a student
    public void deleteStudent(Long id) {
        Student student = studentRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Student not found with id: " + id));
        studentRepository.delete(student);
    }
    
    // Get students by department
    public List<Student> getStudentsByDepartment(String department) {
        return studentRepository.findByDepartment(department);
    }
    
    // Get students by year of study
    public List<Student> getStudentsByYearOfStudy(Integer yearOfStudy) {
        return studentRepository.findByYearOfStudy(yearOfStudy);
    }
    
    // Get students by department and year
    public List<Student> getStudentsByDepartmentAndYear(String department, Integer yearOfStudy) {
        return studentRepository.findByDepartmentAndYearOfStudy(department, yearOfStudy);
    }
    
    // Search students by name
    public List<Student> searchStudentsByName(String keyword) {
        return studentRepository.findByNameContainingIgnoreCase(keyword);
    }
    
    // Check if student exists by student ID
    public boolean existsByStudentId(String studentId) {
        return studentRepository.existsByStudentId(studentId);
    }
    
    // Check if student exists by email
    public boolean existsByEmail(String email) {
        return studentRepository.existsByEmail(email);
    }
}
