import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatMenuModule } from '@angular/material/menu';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { CourseService } from '../../services/course.service';
import { StudentService } from '../../services/student.service';
import { EnrollmentService } from '../../services/enrollment.service';
import { CourseFormComponent } from '../course-form/course-form.component';
import { StudentFormComponent } from '../student-form/student-form.component';
import { EnrollmentFormComponent } from '../enrollment-form/enrollment-form.component';
import { forkJoin } from 'rxjs';

@Component({
  selector: 'app-dashboard',
  imports: [
    CommonModule,
    RouterModule,
    MatCardModule,
    MatIconModule,
    MatButtonModule,
    MatMenuModule,
    MatDialogModule
  ],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss'
})
export class DashboardComponent implements OnInit {
  totalCourses = 0;
  totalStudents = 0;
  totalEnrollments = 0;
  enrollments: any[] = [];
  
  // Progress values for visual appeal
  courseProgress = 75;
  studentProgress = 82;
  enrollmentProgress = 68;

  // Expose Math object to template
  Math = Math;

  constructor(
    private readonly courseService: CourseService,
    private readonly studentService: StudentService,
    private readonly enrollmentService: EnrollmentService,
    private readonly dialog: MatDialog
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
        this.enrollments = data.enrollments;
        
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

  getSuccessfulEnrollments(): number {
    if (!this.enrollments || this.enrollments.length === 0) {
      return 0;
    }
    
    return this.enrollments.filter(enrollment => {
      const grade = enrollment.grade?.toUpperCase();
      return grade && ['A+', 'A', 'A-', 'B+', 'B', 'B-', 'C+', 'C', 'C-'].includes(grade);
    }).length;
  }

  getSuccessRate(): number {
    if (this.totalEnrollments === 0) {
      return 0;
    }
    
    const successfulCount = this.getSuccessfulEnrollments();
    return Math.round((successfulCount / this.totalEnrollments) * 100);
  }

  // Helper methods for template calculations
  getThisMonthGrowth(): number {
    return Math.floor(this.totalEnrollments * 0.15);
  }

  getLastMonthTotal(): number {
    return Math.floor(this.totalEnrollments * 0.85);
  }

  getGradeCount(percentage: number): number {
    return Math.floor(this.totalEnrollments * percentage);
  }

  // Quick Add functionality
  openQuickAddCourse(): void {
    const dialogRef = this.dialog.open(CourseFormComponent, {
      width: '600px',
      disableClose: true,
      data: { course: null }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.loadDashboardData(); // Refresh dashboard data
      }
    });
  }

  openQuickAddStudent(): void {
    const dialogRef = this.dialog.open(StudentFormComponent, {
      width: '600px',
      disableClose: true,
      data: { student: null }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.loadDashboardData(); // Refresh dashboard data
      }
    });
  }

  openQuickAddEnrollment(): void {
    const dialogRef = this.dialog.open(EnrollmentFormComponent, {
      width: '600px',
      disableClose: true,
      data: { enrollment: null }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.loadDashboardData(); // Refresh dashboard data
      }
    });
  }
}
