package com.thishan.cms_backend.service;

import com.thishan.cms_backend.entity.Enrollment;
import com.thishan.cms_backend.entity.Course;
import com.thishan.cms_backend.entity.Student;
import com.thishan.cms_backend.repository.EnrollmentRepository;
import com.thishan.cms_backend.repository.CourseRepository;
import com.thishan.cms_backend.repository.StudentRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class EnrollmentService {
    
    @Autowired
    private EnrollmentRepository enrollmentRepository;
    
    @Autowired
    private CourseRepository courseRepository;
    
    @Autowired
    private StudentRepository studentRepository;
    
    // Get all enrollments
    public List<Enrollment> getAllEnrollments() {
        return enrollmentRepository.findAll();
    }
    
    // Get enrollment by ID
    public Optional<Enrollment> getEnrollmentById(Long id) {
        return enrollmentRepository.findById(id);
    }
    
    // Get enrollments by student ID
    public List<Enrollment> getEnrollmentsByStudentId(String studentId) {
        return enrollmentRepository.findByStudentId(studentId);
    }
    
    // Get enrollments by course code
    public List<Enrollment> getEnrollmentsByCourseCode(String courseCode) {
        return enrollmentRepository.findByCourseCode(courseCode);
    }
    
    // Create a new enrollment
    public Enrollment createEnrollment(String studentId, String courseCode, String semester, String academicYear) {
        // Find student
        Student student = studentRepository.findByStudentId(studentId)
                .orElseThrow(() -> new RuntimeException("Student not found with ID: " + studentId));
        
        // Find course
        Course course = courseRepository.findByCode(courseCode)
                .orElseThrow(() -> new RuntimeException("Course not found with code: " + courseCode));
        
        // Check if student is already enrolled in this course
        if (enrollmentRepository.existsByStudentIdAndCourseCode(studentId, courseCode)) {
            throw new RuntimeException("Student " + studentId + " is already enrolled in course " + courseCode);
        }
        
        // Create new enrollment
        Enrollment enrollment = new Enrollment(student, course, semester, academicYear);
        return enrollmentRepository.save(enrollment);
    }
    
    // Update enrollment status
    public Enrollment updateEnrollmentStatus(Long enrollmentId, Enrollment.EnrollmentStatus status) {
        Enrollment enrollment = enrollmentRepository.findById(enrollmentId)
                .orElseThrow(() -> new RuntimeException("Enrollment not found with id: " + enrollmentId));
        
        enrollment.setStatus(status);
        return enrollmentRepository.save(enrollment);
    }
    
    // Update enrollment grade
    public Enrollment updateEnrollmentGrade(Long enrollmentId, String grade) {
        Enrollment enrollment = enrollmentRepository.findById(enrollmentId)
                .orElseThrow(() -> new RuntimeException("Enrollment not found with id: " + enrollmentId));
        
        enrollment.setGrade(grade);
        // If grade is assigned, mark as completed
        if (grade != null && !grade.trim().isEmpty()) {
            enrollment.setStatus(Enrollment.EnrollmentStatus.COMPLETED);
        }
        
        return enrollmentRepository.save(enrollment);
    }
    
    // Delete an enrollment
    public void deleteEnrollment(Long id) {
        Enrollment enrollment = enrollmentRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Enrollment not found with id: " + id));
        enrollmentRepository.delete(enrollment);
    }
    
    // Get enrollments by status
    public List<Enrollment> getEnrollmentsByStatus(Enrollment.EnrollmentStatus status) {
        return enrollmentRepository.findByStatus(status);
    }
    
    // Get enrollments by semester
    public List<Enrollment> getEnrollmentsBySemester(String semester) {
        return enrollmentRepository.findBySemester(semester);
    }
    
    // Get enrollments by academic year
    public List<Enrollment> getEnrollmentsByAcademicYear(String academicYear) {
        return enrollmentRepository.findByAcademicYear(academicYear);
    }
    
    // Get students enrolled in a course
    public List<Student> getStudentsInCourse(String courseCode) {
        return enrollmentRepository.findStudentsByCourseCode(courseCode);
    }
    
    // Get courses enrolled by a student
    public List<Course> getCoursesForStudent(String studentId) {
        return enrollmentRepository.findCoursesByStudentId(studentId);
    }
    
    // Get enrollment count for a course
    public Long getEnrollmentCountForCourse(String courseCode) {
        return enrollmentRepository.countByCourseCode(courseCode);
    }
    
    // Check if student is enrolled in course
    public boolean isStudentEnrolledInCourse(String studentId, String courseCode) {
        return enrollmentRepository.existsByStudentIdAndCourseCode(studentId, courseCode);
    }
}
