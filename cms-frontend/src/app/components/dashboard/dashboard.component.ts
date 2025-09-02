import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { MatCardModule } from '@angular/material/card';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { CourseService } from '../../services/course.service';
import { StudentService } from '../../services/student.service';
import { EnrollmentService } from '../../services/enrollment.service';
import { forkJoin } from 'rxjs';

@Component({
  selector: 'app-dashboard',
  imports: [
    CommonModule,
    RouterModule,
    MatCardModule, 
    MatGridListModule, 
    MatIconModule,
    MatButtonModule,
    MatProgressBarModule
  ],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss'
})
export class DashboardComponent implements OnInit {
  totalCourses = 0;
  totalStudents = 0;
  totalEnrollments = 0;
  
  // Progress values for visual appeal
  courseProgress = 75;
  studentProgress = 82;
  enrollmentProgress = 68;

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
        
        // Calculate dynamic progress values based on data
        this.courseProgress = Math.min(Math.max(this.totalCourses * 10, 20), 100);
        this.studentProgress = Math.min(Math.max(this.totalStudents * 5, 30), 100);
        this.enrollmentProgress = Math.min(Math.max(this.totalEnrollments * 3, 15), 100);
      },
      error: (error: any) => {
        console.error('Error loading dashboard data:', error);
      }
    });
  }
}
