package com.thishan.cms_backend.repository;

import com.thishan.cms_backend.entity.Student;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface StudentRepository extends JpaRepository<Student, Long> {
    
    // Find student by student ID
    Optional<Student> findByStudentId(String studentId);
    
    // Find student by email
    Optional<Student> findByEmail(String email);
    
    // Find students by department
    List<Student> findByDepartment(String department);
    
    // Find students by year of study
    List<Student> findByYearOfStudy(Integer yearOfStudy);
    
    // Find students by department and year
    List<Student> findByDepartmentAndYearOfStudy(String department, Integer yearOfStudy);
    
    // Search students by name (first name or last name containing keyword)
    @Query("SELECT s FROM Student s WHERE LOWER(s.firstName) LIKE LOWER(CONCAT('%', :keyword, '%')) " +
           "OR LOWER(s.lastName) LIKE LOWER(CONCAT('%', :keyword, '%'))")
    List<Student> findByNameContainingIgnoreCase(@Param("keyword") String keyword);
    
    // Check if student ID exists
    boolean existsByStudentId(String studentId);
    
    // Check if email exists
    boolean existsByEmail(String email);
}
