package com.thishan.cms_backend.entity;

import jakarta.persistence.*;
import java.time.LocalDateTime;

@Entity
@Table(name = "enrollments")
public class Enrollment {
    
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "student_id", nullable = false)
    private Student student;
    
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "course_id", nullable = false)
    private Course course;
    
    @Column(name = "enrollment_date", nullable = false)
    private LocalDateTime enrollmentDate;
    
    @Enumerated(EnumType.STRING)
    @Column(nullable = false, length = 20)
    private EnrollmentStatus status;
    
    @Column(name = "grade", length = 5)
    private String grade;
    
    @Column(name = "semester", length = 20)
    private String semester;
    
    @Column(name = "academic_year", length = 10)
    private String academicYear;
    
    @Column(name = "created_at")
    private LocalDateTime createdAt;
    
    @Column(name = "updated_at")
    private LocalDateTime updatedAt;
    
    // Enum for enrollment status
    public enum EnrollmentStatus {
        ENROLLED, COMPLETED, DROPPED, FAILED, IN_PROGRESS
    }
    
    // Constructors
    public Enrollment() {}
    
    public Enrollment(Student student, Course course, String semester, String academicYear) {
        this.student = student;
        this.course = course;
        this.semester = semester;
        this.academicYear = academicYear;
        this.status = EnrollmentStatus.ENROLLED;
        this.enrollmentDate = LocalDateTime.now();
    }
    
    // JPA lifecycle methods
    @PrePersist
    protected void onCreate() {
        if (enrollmentDate == null) {
            enrollmentDate = LocalDateTime.now();
        }
        if (status == null) {
            status = EnrollmentStatus.ENROLLED;
        }
        createdAt = LocalDateTime.now();
        updatedAt = LocalDateTime.now();
    }
    
    @PreUpdate
    protected void onUpdate() {
        updatedAt = LocalDateTime.now();
    }
    
    // Getters and Setters
    public Long getId() {
        return id;
    }
    
    public void setId(Long id) {
        this.id = id;
    }
    
    public Student getStudent() {
        return student;
    }
    
    public void setStudent(Student student) {
        this.student = student;
    }
    
    public Course getCourse() {
        return course;
    }
    
    public void setCourse(Course course) {
        this.course = course;
    }
    
    public LocalDateTime getEnrollmentDate() {
        return enrollmentDate;
    }
    
    public void setEnrollmentDate(LocalDateTime enrollmentDate) {
        this.enrollmentDate = enrollmentDate;
    }
    
    public EnrollmentStatus getStatus() {
        return status;
    }
    
    public void setStatus(EnrollmentStatus status) {
        this.status = status;
    }
    
    public String getGrade() {
        return grade;
    }
    
    public void setGrade(String grade) {
        this.grade = grade;
    }
    
    public String getSemester() {
        return semester;
    }
    
    public void setSemester(String semester) {
        this.semester = semester;
    }
    
    public String getAcademicYear() {
        return academicYear;
    }
    
    public void setAcademicYear(String academicYear) {
        this.academicYear = academicYear;
    }
    
    public LocalDateTime getCreatedAt() {
        return createdAt;
    }
    
    public void setCreatedAt(LocalDateTime createdAt) {
        this.createdAt = createdAt;
    }
    
    public LocalDateTime getUpdatedAt() {
        return updatedAt;
    }
    
    public void setUpdatedAt(LocalDateTime updatedAt) {
        this.updatedAt = updatedAt;
    }
    
    @Override
    public String toString() {
        return "Enrollment{" +
                "id=" + id +
                ", student=" + (student != null ? student.getStudentId() : null) +
                ", course=" + (course != null ? course.getCode() : null) +
                ", status=" + status +
                ", semester='" + semester + '\'' +
                ", academicYear='" + academicYear + '\'' +
                '}';
    }
}
