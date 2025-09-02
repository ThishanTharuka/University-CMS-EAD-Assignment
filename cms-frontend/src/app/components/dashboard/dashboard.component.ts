import { Component, OnInit } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatIconModule } from '@angular/material/icon';
import { CourseService } from '../../services/course.service';
import { StudentService } from '../../services/student.service';
import { EnrollmentService } from '../../services/enrollment.service';
import { forkJoin } from 'rxjs';

@Component({
  selector: 'app-dashboard',
  imports: [MatCardModule, MatGridListModule, MatIconModule],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss'
})
export class DashboardComponent implements OnInit {
  totalCourses = 0;
  totalStudents = 0;
  totalEnrollments = 0;

  constructor(
    private readonly courseService: CourseService,
    private readonly studentService: StudentService,
    private readonly enrollmentService: EnrollmentService
  ) {}

  ngOnInit(): void {
    this.loadDashboardData();
  }

  loadDashboardData(): void {
    forkJoin({
      courses: this.courseService.getAllCourses(),
      students: this.studentService.getAllStudents(),
      enrollments: this.enrollmentService.getAllEnrollments()
    }).subscribe({
      next: (data) => {
        this.totalCourses = data.courses.length;
        this.totalStudents = data.students.length;
        this.totalEnrollments = data.enrollments.length;
      },
      error: (error) => {
        console.error('Error loading dashboard data:', error);
      }
    });
  }
}
