package com.thishan.cms_backend.controller;

import com.thishan.cms_backend.entity.Student;
import com.thishan.cms_backend.service.StudentService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/students")
@CrossOrigin(origins = "http://localhost:4200") // Allow Angular frontend
public class StudentController {
    
    @Autowired
    private StudentService studentService;
    
    // Get all students
    @GetMapping
    public ResponseEntity<List<Student>> getAllStudents() {
        List<Student> students = studentService.getAllStudents();
        return ResponseEntity.ok(students);
    }
    
    // Get student by ID
    @GetMapping("/{id}")
    public ResponseEntity<Student> getStudentById(@PathVariable Long id) {
        Optional<Student> student = studentService.getStudentById(id);
        if (student.isPresent()) {
            return ResponseEntity.ok(student.get());
        } else {
            return ResponseEntity.notFound().build();
        }
    }
    
    // Get student by student ID
    @GetMapping("/studentId/{studentId}")
    public ResponseEntity<Student> getStudentByStudentId(@PathVariable String studentId) {
        Optional<Student> student = studentService.getStudentByStudentId(studentId);
        if (student.isPresent()) {
            return ResponseEntity.ok(student.get());
        } else {
            return ResponseEntity.notFound().build();
        }
    }
    
    // Get student by email
    @GetMapping("/email/{email}")
    public ResponseEntity<Student> getStudentByEmail(@PathVariable String email) {
        Optional<Student> student = studentService.getStudentByEmail(email);
        if (student.isPresent()) {
            return ResponseEntity.ok(student.get());
        } else {
            return ResponseEntity.notFound().build();
        }
    }
    
    // Create a new student
    @PostMapping
    public ResponseEntity<Student> createStudent(@RequestBody Student student) {
        try {
            Student createdStudent = studentService.createStudent(student);
            return ResponseEntity.status(HttpStatus.CREATED).body(createdStudent);
        } catch (RuntimeException e) {
            return ResponseEntity.badRequest().build();
        }
    }
    
    // Update an existing student
    @PutMapping("/{id}")
    public ResponseEntity<Student> updateStudent(@PathVariable Long id, @RequestBody Student studentDetails) {
        try {
            Student updatedStudent = studentService.updateStudent(id, studentDetails);
            return ResponseEntity.ok(updatedStudent);
        } catch (RuntimeException e) {
            return ResponseEntity.notFound().build();
        }
    }
    
    // Delete a student
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteStudent(@PathVariable Long id) {
        try {
            studentService.deleteStudent(id);
            return ResponseEntity.noContent().build();
        } catch (RuntimeException e) {
            return ResponseEntity.notFound().build();
        }
    }
    
    // Get students by department
    @GetMapping("/department/{department}")
    public ResponseEntity<List<Student>> getStudentsByDepartment(@PathVariable String department) {
        List<Student> students = studentService.getStudentsByDepartment(department);
        return ResponseEntity.ok(students);
    }
    
    // Get students by year of study
    @GetMapping("/year/{year}")
    public ResponseEntity<List<Student>> getStudentsByYearOfStudy(@PathVariable Integer year) {
        List<Student> students = studentService.getStudentsByYearOfStudy(year);
        return ResponseEntity.ok(students);
    }
    
    // Get students by department and year
    @GetMapping("/department/{department}/year/{year}")
    public ResponseEntity<List<Student>> getStudentsByDepartmentAndYear(
            @PathVariable String department, @PathVariable Integer year) {
        List<Student> students = studentService.getStudentsByDepartmentAndYear(department, year);
        return ResponseEntity.ok(students);
    }
    
    // Search students by name
    @GetMapping("/search")
    public ResponseEntity<List<Student>> searchStudents(@RequestParam String keyword) {
        List<Student> students = studentService.searchStudentsByName(keyword);
        return ResponseEntity.ok(students);
    }
}
