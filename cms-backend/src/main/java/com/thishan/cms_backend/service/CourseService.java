package com.thishan.cms_backend.service;

import com.thishan.cms_backend.entity.Course;
import com.thishan.cms_backend.repository.CourseRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class CourseService {
    
    @Autowired
    private CourseRepository courseRepository;
    
    // Get all courses
    public List<Course> getAllCourses() {
        return courseRepository.findAll();
    }
    
    // Get course by ID
    public Optional<Course> getCourseById(Long id) {
        return courseRepository.findById(id);
    }
    
    // Get course by code
    public Optional<Course> getCourseByCode(String code) {
        return courseRepository.findByCode(code);
    }
    
    // Create a new course
    public Course createCourse(Course course) {
        // Check if course code already exists
        if (courseRepository.existsByCode(course.getCode())) {
            throw new RuntimeException("Course with code " + course.getCode() + " already exists");
        }
        return courseRepository.save(course);
    }
    
    // Update an existing course
    public Course updateCourse(Long id, Course courseDetails) {
        Course course = courseRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Course not found with id: " + id));
        
        // Update code only if provided and unique
        if (courseDetails.getCode() != null && !course.getCode().equals(courseDetails.getCode())) {
            if (courseRepository.existsByCode(courseDetails.getCode())) {
                throw new RuntimeException("Course with code " + courseDetails.getCode() + " already exists");
            }
            course.setCode(courseDetails.getCode());
        }

        if (courseDetails.getTitle() != null) {
            course.setTitle(courseDetails.getTitle());
        }
        if (courseDetails.getDescription() != null) {
            course.setDescription(courseDetails.getDescription());
        }
        if (courseDetails.getCredits() != null) {
            course.setCredits(courseDetails.getCredits());
        }
        if (courseDetails.getSemester() != null) {
            course.setSemester(courseDetails.getSemester());
        }
        if (courseDetails.getDepartment() != null) {
            course.setDepartment(courseDetails.getDepartment());
        }
        
        return courseRepository.save(course);
    }
    
    // Delete a course
    public void deleteCourse(Long id) {
        Course course = courseRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Course not found with id: " + id));
        courseRepository.delete(course);
    }
    
    // Get courses by department
    public List<Course> getCoursesByDepartment(String department) {
        return courseRepository.findByDepartment(department);
    }
    
    // Get courses by semester
    public List<Course> getCoursesBySemester(String semester) {
        return courseRepository.findBySemester(semester);
    }
    
    // Search courses by title
    public List<Course> searchCoursesByTitle(String keyword) {
        return courseRepository.findByTitleContainingIgnoreCase(keyword);
    }
    
    // Get courses by credits range
    public List<Course> getCoursesByCreditsRange(Integer minCredits, Integer maxCredits) {
        return courseRepository.findByCreditsBetween(minCredits, maxCredits);
    }
    
    // Check if course exists by code
    public boolean existsByCode(String code) {
        return courseRepository.existsByCode(code);
    }
}
