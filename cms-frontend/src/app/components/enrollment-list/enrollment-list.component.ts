import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatCardModule } from '@angular/material/card';
import { MatChipsModule } from '@angular/material/chips';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';

import { EnrollmentService } from '../../services/enrollment.service';
import { Enrollment } from '../../models/enrollment.model';
import { EnrollmentFormComponent } from '../enrollment-form/enrollment-form.component';

@Component({
  selector: 'app-enrollment-list',
  imports: [
    CommonModule,
    MatTableModule, 
    MatButtonModule, 
    MatIconModule, 
    MatCardModule,
    MatChipsModule,
    MatSnackBarModule
  ],
  templateUrl: './enrollment-list.component.html',
  styleUrl: './enrollment-list.component.scss'
})
export class EnrollmentListComponent implements OnInit {
  enrollments: Enrollment[] = [];
  displayedColumns: string[] = ['id', 'studentName', 'courseName', 'enrollmentDate', 'grade', 'actions'];

  constructor(
    private readonly enrollmentService: EnrollmentService,
    private readonly dialog: MatDialog,
    private readonly snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    this.loadEnrollments();
  }

  loadEnrollments(): void {
    this.enrollmentService.getAllEnrollments().subscribe({
      next: (enrollments) => {
        this.enrollments = enrollments;
      },
      error: (error: any) => {
        console.error('Error loading enrollments:', error);
        this.snackBar.open('Error loading enrollments', 'Close', { duration: 3000 });
      }
    });
  }

  openEnrollmentForm(): void {
    const dialogRef = this.dialog.open(EnrollmentFormComponent, {
      width: '500px',
      disableClose: true,
      data: { enrollment: null }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.loadEnrollments();
      }
    });
  }

  editEnrollmentGrade(enrollment: Enrollment): void {
    const dialogRef = this.dialog.open(EnrollmentFormComponent, {
      width: '400px',
      disableClose: true,
      data: { enrollment }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.loadEnrollments();
      }
    });
  }

  deleteEnrollment(id: number): void {
    if (confirm('Are you sure you want to delete this enrollment?')) {
      this.enrollmentService.deleteEnrollment(id).subscribe({
        next: () => {
          this.snackBar.open('Enrollment deleted successfully', 'Close', { duration: 3000 });
          this.loadEnrollments();
        },
        error: (error: any) => {
          console.error('Error deleting enrollment:', error);
          this.snackBar.open('Error deleting enrollment', 'Close', { duration: 3000 });
        }
      });
    }
  }

  getGradeColor(grade: string): string {
    switch (grade?.toUpperCase()) {
      case 'A+':
      case 'A':
      case 'A-': 
        return 'primary';
      case 'B+':
      case 'B':
      case 'B-': 
        return 'accent';
      case 'C+':
      case 'C':
      case 'C-': 
        return 'warn';
      case 'D':
      case 'F':
        return 'warn';
      default: 
        return '';
    }
  }
}
