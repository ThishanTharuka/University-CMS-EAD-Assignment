import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatTableModule } from '@angular/material/table';
import { MatChipsModule } from '@angular/material/chips';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

import { StudentService } from '../../services/student.service';
import { EnrollmentService } from '../../services/enrollment.service';
import { Student } from '../../models/student.model';
import { Enrollment } from '../../models/enrollment.model';
import { StudentFormComponent } from '../student-form/student-form.component';

@Component({
  selector: 'app-student-detail',
  imports: [
    CommonModule,
    MatButtonModule,
    MatIconModule,
    MatTableModule,
    MatChipsModule,
    MatSnackBarModule,
    MatDialogModule,
    MatProgressSpinnerModule
  ],
  templateUrl: './student-detail.component.html',
  styleUrl: './student-detail.component.scss'
})
export class StudentDetailComponent implements OnInit {
  student: Student | null = null;
  enrollments: Enrollment[] = [];
  isLoading = true;
  enrollmentsLoading = true;

  constructor(
    private readonly route: ActivatedRoute,
    private readonly router: Router,
    private readonly studentService: StudentService,
    private readonly enrollmentService: EnrollmentService,
    private readonly snackBar: MatSnackBar,
    private readonly dialog: MatDialog
  ) {}

  ngOnInit(): void {
    const studentId = this.route.snapshot.paramMap.get('id');
    if (studentId) {
      this.loadStudent(parseInt(studentId, 10));
    } else {
      this.router.navigate(['/students']);
    }
  }

  loadStudent(id: number): void {
    this.isLoading = true;
    this.studentService.getStudentById(id).subscribe({
      next: (student) => {
        this.student = student;
        this.isLoading = false;
        this.loadEnrollments(student.studentId);
      },
      error: (error) => {
        console.error('Error loading student:', error);
        this.snackBar.open('Error loading student details', 'Close', { duration: 3000 });
        this.router.navigate(['/students']);
      }
    });
  }

  loadEnrollments(studentId: string): void {
    this.enrollmentsLoading = true;
    this.enrollmentService.getEnrollmentsByStudent(studentId).subscribe({
      next: (enrollments) => {
        this.enrollments = enrollments;
        this.enrollmentsLoading = false;
      },
      error: (error) => {
        console.error('Error loading enrollments:', error);
        this.enrollmentsLoading = false;
      }
    });
  }

  goBack(): void {
    this.router.navigate(['/students']);
  }

  onEditStudent(): void {
    if (!this.student) return;

    const dialogRef = this.dialog.open(StudentFormComponent, {
      width: '600px',
      data: { student: this.student }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result && this.student) {
        this.loadStudent(this.student.id!);
      }
    });
  }

  onDeleteStudent(): void {
    if (!this.student) return;

    const confirmed = confirm(
      `Are you sure you want to delete ${this.student.firstName} ${this.student.lastName}? This action cannot be undone.`
    );

    if (confirmed) {
      this.studentService.deleteStudent(this.student.id!).subscribe({
        next: () => {
          this.snackBar.open('Student deleted successfully', 'Close', { duration: 3000 });
          this.router.navigate(['/students']);
        },
        error: (error) => {
          console.error('Error deleting student:', error);
          this.snackBar.open('Error deleting student', 'Close', { duration: 3000 });
        }
      });
    }
  }

  getStatusClass(grade?: string): string {
    if (!grade) return 'pending';
    
    const gradeUpper = grade.toUpperCase();
    if (['A+', 'A', 'A-', 'B+', 'B', 'B-', 'C+', 'C', 'C-'].includes(gradeUpper)) {
      return 'passed';
    } else if (gradeUpper === 'D') {
      return 'warning';
    } else if (gradeUpper === 'F') {
      return 'failed';
    }
    return 'pending';
  }

  getStatusText(grade?: string): string {
    if (!grade) return 'In Progress';
    
    const gradeUpper = grade.toUpperCase();
    if (['A+', 'A', 'A-', 'B+', 'B', 'B-', 'C+', 'C', 'C-'].includes(gradeUpper)) {
      return 'Passed';
    } else if (gradeUpper === 'D') {
      return 'Warning';
    } else if (gradeUpper === 'F') {
      return 'Failed';
    }
    return 'In Progress';
  }
}
