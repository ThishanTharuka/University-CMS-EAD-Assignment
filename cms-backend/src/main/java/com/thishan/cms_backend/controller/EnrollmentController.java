package com.thishan.cms_backend.controller;

import com.thishan.cms_backend.entity.Enrollment;
import com.thishan.cms_backend.entity.Student;
import com.thishan.cms_backend.entity.Course;
import com.thishan.cms_backend.service.EnrollmentService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/enrollments")
@CrossOrigin(origins = {"http://localhost:4200", "http://localhost:3000"}) // Allow Angular frontend
public class EnrollmentController {
    
    @Autowired
    private EnrollmentService enrollmentService;
    
    // Get all enrollments
    @GetMapping
    public ResponseEntity<List<Enrollment>> getAllEnrollments() {
        List<Enrollment> enrollments = enrollmentService.getAllEnrollments();
        return ResponseEntity.ok(enrollments);
    }
    
    // Get enrollment by ID
    @GetMapping("/{id}")
    public ResponseEntity<Enrollment> getEnrollmentById(@PathVariable Long id) {
        Optional<Enrollment> enrollment = enrollmentService.getEnrollmentById(id);
        if (enrollment.isPresent()) {
            return ResponseEntity.ok(enrollment.get());
        } else {
            return ResponseEntity.notFound().build();
        }
    }
    
    // Get enrollments by student ID
    @GetMapping("/student/{studentId}")
    public ResponseEntity<List<Enrollment>> getEnrollmentsByStudentId(@PathVariable String studentId) {
        List<Enrollment> enrollments = enrollmentService.getEnrollmentsByStudentId(studentId);
        return ResponseEntity.ok(enrollments);
    }
    
    // Get enrollments by course code
    @GetMapping("/course/{courseCode}")
    public ResponseEntity<List<Enrollment>> getEnrollmentsByCourseCode(@PathVariable String courseCode) {
        List<Enrollment> enrollments = enrollmentService.getEnrollmentsByCourseCode(courseCode);
        return ResponseEntity.ok(enrollments);
    }
    
    // Create a new enrollment
    @PostMapping
    public ResponseEntity<Enrollment> createEnrollment(@RequestBody EnrollmentRequest request) {
        try {
            Enrollment enrollment = enrollmentService.createEnrollment(
                request.getStudentId(), 
                request.getCourseCode(),
                request.getSemester(),
                request.getAcademicYear()
            );
            return ResponseEntity.status(HttpStatus.CREATED).body(enrollment);
        } catch (RuntimeException e) {
            return ResponseEntity.badRequest().build();
        }
    }
    
    // Update enrollment status
    @PutMapping("/{id}/status")
    public ResponseEntity<Enrollment> updateEnrollmentStatus(
            @PathVariable Long id, @RequestBody StatusUpdateRequest request) {
        try {
            Enrollment updatedEnrollment = enrollmentService.updateEnrollmentStatus(id, request.getStatus());
            return ResponseEntity.ok(updatedEnrollment);
        } catch (RuntimeException e) {
            return ResponseEntity.notFound().build();
        }
    }
    
    // Update enrollment grade
    @PutMapping("/{id}/grade")
    public ResponseEntity<Enrollment> updateEnrollmentGrade(
            @PathVariable Long id, @RequestBody GradeUpdateRequest request) {
        try {
            Enrollment updatedEnrollment = enrollmentService.updateEnrollmentGrade(id, request.getGrade());
            return ResponseEntity.ok(updatedEnrollment);
        } catch (RuntimeException e) {
            return ResponseEntity.notFound().build();
        }
    }
    
    // Delete an enrollment
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteEnrollment(@PathVariable Long id) {
        try {
            enrollmentService.deleteEnrollment(id);
            return ResponseEntity.noContent().build();
        } catch (RuntimeException e) {
            return ResponseEntity.notFound().build();
        }
    }
    
    // Get enrollments by status
    @GetMapping("/status/{status}")
    public ResponseEntity<List<Enrollment>> getEnrollmentsByStatus(@PathVariable String status) {
        try {
            Enrollment.EnrollmentStatus enrollmentStatus = Enrollment.EnrollmentStatus.valueOf(status.toUpperCase());
            List<Enrollment> enrollments = enrollmentService.getEnrollmentsByStatus(enrollmentStatus);
            return ResponseEntity.ok(enrollments);
        } catch (IllegalArgumentException e) {
            return ResponseEntity.badRequest().build();
        }
    }
    
    // Get enrollments by semester
    @GetMapping("/semester/{semester}")
    public ResponseEntity<List<Enrollment>> getEnrollmentsBySemester(@PathVariable String semester) {
        List<Enrollment> enrollments = enrollmentService.getEnrollmentsBySemester(semester);
        return ResponseEntity.ok(enrollments);
    }
    
    // Get students in a course
    @GetMapping("/course/{courseCode}/students")
    public ResponseEntity<List<Student>> getStudentsInCourse(@PathVariable String courseCode) {
        List<Student> students = enrollmentService.getStudentsInCourse(courseCode);
        return ResponseEntity.ok(students);
    }
    
    // Get courses for a student
    @GetMapping("/student/{studentId}/courses")
    public ResponseEntity<List<Course>> getCoursesForStudent(@PathVariable String studentId) {
        List<Course> courses = enrollmentService.getCoursesForStudent(studentId);
        return ResponseEntity.ok(courses);
    }
    
    // Get enrollment count for a course
    @GetMapping("/course/{courseCode}/count")
    public ResponseEntity<Long> getEnrollmentCountForCourse(@PathVariable String courseCode) {
        Long count = enrollmentService.getEnrollmentCountForCourse(courseCode);
        return ResponseEntity.ok(count);
    }
    
    // Check if student is enrolled in course
    @GetMapping("/check")
    public ResponseEntity<Boolean> checkEnrollment(
            @RequestParam String studentId, @RequestParam String courseCode) {
        boolean isEnrolled = enrollmentService.isStudentEnrolledInCourse(studentId, courseCode);
        return ResponseEntity.ok(isEnrolled);
    }
    
    // Request classes for creating enrollments
    public static class EnrollmentRequest {
        private String studentId;
        private String courseCode;
        private String semester;
        private String academicYear;
        
        // Getters and setters
        public String getStudentId() { return studentId; }
        public void setStudentId(String studentId) { this.studentId = studentId; }
        
        public String getCourseCode() { return courseCode; }
        public void setCourseCode(String courseCode) { this.courseCode = courseCode; }
        
        public String getSemester() { return semester; }
        public void setSemester(String semester) { this.semester = semester; }
        
        public String getAcademicYear() { return academicYear; }
        public void setAcademicYear(String academicYear) { this.academicYear = academicYear; }
    }
    
    public static class StatusUpdateRequest {
        private Enrollment.EnrollmentStatus status;
        
        public Enrollment.EnrollmentStatus getStatus() { return status; }
        public void setStatus(Enrollment.EnrollmentStatus status) { this.status = status; }
    }
    
    public static class GradeUpdateRequest {
        private String grade;
        
        public String getGrade() { return grade; }
        public void setGrade(String grade) { this.grade = grade; }
    }
}
