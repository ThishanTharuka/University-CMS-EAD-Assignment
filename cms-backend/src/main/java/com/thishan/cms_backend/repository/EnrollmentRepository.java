package com.thishan.cms_backend.repository;

import com.thishan.cms_backend.entity.Enrollment;
import com.thishan.cms_backend.entity.Course;
import com.thishan.cms_backend.entity.Student;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface EnrollmentRepository extends JpaRepository<Enrollment, Long> {
    
    // Find all enrollments with eagerly loaded student and course
    @Query("SELECT e FROM Enrollment e JOIN FETCH e.student JOIN FETCH e.course")
    List<Enrollment> findAllWithStudentAndCourse();
    
    // Find enrollment by ID with eagerly loaded student and course
    @Query("SELECT e FROM Enrollment e JOIN FETCH e.student JOIN FETCH e.course WHERE e.id = :id")
    Optional<Enrollment> findByIdWithStudentAndCourse(@Param("id") Long id);
    
    // Find enrollments by student
    List<Enrollment> findByStudent(Student student);
    
    // Find enrollments by course
    List<Enrollment> findByCourse(Course course);
    
    // Find enrollments by student ID
    @Query("SELECT e FROM Enrollment e JOIN FETCH e.student JOIN FETCH e.course WHERE e.student.studentId = :studentId")
    List<Enrollment> findByStudentId(@Param("studentId") String studentId);
    
    // Find enrollments by course code
    @Query("SELECT e FROM Enrollment e JOIN FETCH e.student JOIN FETCH e.course WHERE e.course.code = :courseCode")
    List<Enrollment> findByCourseCode(@Param("courseCode") String courseCode);
    
    // Find enrollments by status
    @Query("SELECT e FROM Enrollment e JOIN FETCH e.student JOIN FETCH e.course WHERE e.status = :status")
    List<Enrollment> findByStatus(@Param("status") Enrollment.EnrollmentStatus status);
    
    // Find enrollments by semester
    @Query("SELECT e FROM Enrollment e JOIN FETCH e.student JOIN FETCH e.course WHERE e.semester = :semester")
    List<Enrollment> findBySemester(@Param("semester") String semester);
    
    // Find enrollments by academic year
    @Query("SELECT e FROM Enrollment e JOIN FETCH e.student JOIN FETCH e.course WHERE e.academicYear = :academicYear")
    List<Enrollment> findByAcademicYear(@Param("academicYear") String academicYear);
    
    // Find enrollments by semester and academic year
    @Query("SELECT e FROM Enrollment e JOIN FETCH e.student JOIN FETCH e.course WHERE e.semester = :semester AND e.academicYear = :academicYear")
    List<Enrollment> findBySemesterAndAcademicYear(@Param("semester") String semester, @Param("academicYear") String academicYear);
    
    // Find specific enrollment by student and course
    Optional<Enrollment> findByStudentAndCourse(Student student, Course course);
    
    // Check if student is enrolled in a course
    @Query("SELECT COUNT(e) > 0 FROM Enrollment e WHERE e.student.studentId = :studentId AND e.course.code = :courseCode")
    boolean existsByStudentIdAndCourseCode(@Param("studentId") String studentId, @Param("courseCode") String courseCode);
    
    // Get enrollment count for a course
    @Query("SELECT COUNT(e) FROM Enrollment e WHERE e.course.code = :courseCode")
    Long countByCourseCode(@Param("courseCode") String courseCode);
    
    // Get students enrolled in a specific course
    @Query("SELECT e.student FROM Enrollment e WHERE e.course.code = :courseCode")
    List<Student> findStudentsByCourseCode(@Param("courseCode") String courseCode);
    
    // Get courses enrolled by a specific student
    @Query("SELECT e.course FROM Enrollment e WHERE e.student.studentId = :studentId")
    List<Course> findCoursesByStudentId(@Param("studentId") String studentId);
}
