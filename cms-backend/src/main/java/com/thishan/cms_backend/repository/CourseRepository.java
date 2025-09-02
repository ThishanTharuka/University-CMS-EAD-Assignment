package com.thishan.cms_backend.repository;

import com.thishan.cms_backend.entity.Course;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface CourseRepository extends JpaRepository<Course, Long> {
    
    // Find course by code
    Optional<Course> findByCode(String code);
    
    // Find courses by department
    List<Course> findByDepartment(String department);
    
    // Find courses by semester
    List<Course> findBySemester(String semester);
    
    // Find courses by department and semester
    List<Course> findByDepartmentAndSemester(String department, String semester);
    
    // Search courses by title containing keyword (case insensitive)
    @Query("SELECT c FROM Course c WHERE LOWER(c.title) LIKE LOWER(CONCAT('%', :keyword, '%'))")
    List<Course> findByTitleContainingIgnoreCase(@Param("keyword") String keyword);
    
    // Find courses with credits between min and max
    List<Course> findByCreditsBetween(Integer minCredits, Integer maxCredits);
    
    // Check if course code exists
    boolean existsByCode(String code);
}
