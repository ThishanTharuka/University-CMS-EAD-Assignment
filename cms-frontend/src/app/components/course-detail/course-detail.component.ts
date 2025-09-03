import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatCardModule } from '@angular/material/card';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Course } from '../../models/course.model';
import { Enrollment } from '../../models/enrollment.model';
import { CourseService } from '../../services/course.service';
import { EnrollmentService } from '../../services/enrollment.service';
import { CourseFormComponent } from '../course-form/course-form.component';
import { EnrollmentFormComponent } from '../enrollment-form/enrollment-form.component';
import { forkJoin } from 'rxjs';

@Component({
  selector: 'app-course-detail',
  imports: [
    CommonModule,
    MatTableModule,
    MatButtonModule,
    MatIconModule,
    MatCardModule,
    MatProgressSpinnerModule
  ],
  templateUrl: './course-detail.component.html',
  styleUrl: './course-detail.component.scss'
})
export class CourseDetailComponent implements OnInit {
  course: Course | null = null;
  enrollments: Enrollment[] = [];
  loading = true;
  error: string | null = null;

  displayedColumns: string[] = ['studentId', 'name', 'email', 'major'];

  constructor(
    private readonly route: ActivatedRoute,
    private readonly router: Router,
    private readonly courseService: CourseService,
    private readonly enrollmentService: EnrollmentService,
    private readonly dialog: MatDialog,
    private readonly snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    console.log('CourseDetailComponent initialized');
    const courseId = this.route.snapshot.paramMap.get('id');
    console.log('Course ID from route:', courseId);
    if (courseId) {
      this.loadCourseData(+courseId);
    } else {
      this.error = 'Course ID not provided';
      this.loading = false;
    }
  }

  loadCourseData(courseId: number): void {
    this.loading = true;
    this.error = null;

    this.courseService.getCourseById(courseId).subscribe({
      next: (course) => {
        this.course = course;
        if (course.code) {
          this.loadEnrollments(course.code);
        } else {
          this.loading = false;
        }
      },
      error: (error) => {
        console.error('Error loading course:', error);
        this.error = 'Failed to load course details';
        this.loading = false;
      }
    });
  }

  loadEnrollments(courseCode: string): void {
    this.enrollmentService.getEnrollmentsByCourse(courseCode).subscribe({
      next: (enrollments) => {
        this.enrollments = enrollments;
        this.loading = false;
      },
      error: (error) => {
        console.error('Error loading enrollments:', error);
        this.enrollments = [];
        this.loading = false;
      }
    });
  }

  onEditCourse(event?: Event): void {
    if (event) {
      event.preventDefault();
      event.stopPropagation();
    }
    console.log('Edit course button clicked');
    if (this.course?.id) {
      console.log('Opening edit dialog for course with ID:', this.course.id);
      
      const dialogRef = this.dialog.open(CourseFormComponent, {
        width: '600px',
        data: { course: this.course }
      });

      dialogRef.afterClosed().subscribe(result => {
        if (result) {
          console.log('Course updated successfully');
          this.snackBar.open('Course updated successfully', 'Close', { duration: 3000 });
          // Reload course data to show updated information
          this.loadCourseData(this.course!.id!);
        }
      });
    } else {
      console.log('No course ID available');
      this.snackBar.open('No course data available', 'Close', { duration: 3000 });
    }
  }

  onManageEnrollment(event?: Event): void {
    if (event) {
      event.preventDefault();
      event.stopPropagation();
    }
    console.log('Manage enrollment button clicked');
    if (this.course?.id) {
      console.log('Opening enrollment dialog for course with ID:', this.course.id);
      
      const dialogRef = this.dialog.open(EnrollmentFormComponent, {
        width: '600px',
        data: { 
          course: this.course,
          isEdit: false 
        }
      });

      dialogRef.afterClosed().subscribe(result => {
        if (result) {
          console.log('Enrollment created successfully');
          this.snackBar.open('Student enrolled successfully', 'Close', { duration: 3000 });
          // Reload enrollments to show new enrollment
          if (this.course?.code) {
            this.loadEnrollments(this.course.code);
          }
        }
      });
    } else {
      console.log('No course ID available');
      this.snackBar.open('No course data available', 'Close', { duration: 3000 });
    }
  }

  onBack(): void {
    console.log('Back button clicked');
    this.router.navigate(['/courses']);
  }

  getStudentFullName(enrollment: Enrollment): string {
    return `${enrollment.student.firstName} ${enrollment.student.lastName}`;
  }
}
