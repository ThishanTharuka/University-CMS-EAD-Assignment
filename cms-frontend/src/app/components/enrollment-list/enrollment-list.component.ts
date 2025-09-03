import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatCardModule } from '@angular/material/card';
import { MatChipsModule } from '@angular/material/chips';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { FormsModule } from '@angular/forms';

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
    MatSnackBarModule,
    MatDialogModule,
    MatFormFieldModule,
    MatInputModule,
    FormsModule
  ],
  templateUrl: './enrollment-list.component.html',
  styleUrl: './enrollment-list.component.scss'
})
export class EnrollmentListComponent implements OnInit {
  enrollments: Enrollment[] = [];
  filteredEnrollments: Enrollment[] = [];
  searchTerm: string = '';
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
        this.filteredEnrollments = enrollments;
        this.applySearchFilter();
      },
      error: (error: any) => {
        console.error('Error loading enrollments:', error);
        this.snackBar.open('Error loading enrollments', 'Close', { duration: 3000 });
      }
    });
  }

  openEnrollmentForm(): void {
    const dialogRef = this.dialog.open(EnrollmentFormComponent, {
      width: '600px',
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
      width: '500px',
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
    const confirmed = confirm('Are you sure you want to delete this enrollment? This action cannot be undone.');
    
    if (confirmed) {
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

  // Search functionality
  onSearchChange(): void {
    this.applySearchFilter();
  }

  applySearchFilter(): void {
    if (!this.searchTerm || this.searchTerm.trim() === '') {
      this.filteredEnrollments = [...this.enrollments];
    } else {
      const searchLower = this.searchTerm.toLowerCase().trim();
      this.filteredEnrollments = this.enrollments.filter(enrollment => {
        const studentName = `${enrollment.student.firstName} ${enrollment.student.lastName}`.toLowerCase();
        const studentId = enrollment.student.studentId?.toLowerCase() || '';
        const courseTitle = enrollment.course.title?.toLowerCase() || '';
        const courseCode = enrollment.course.code?.toLowerCase() || '';
        const semester = enrollment.semester?.toLowerCase() || '';
        const academicYear = enrollment.academicYear?.toLowerCase() || '';
        const grade = enrollment.grade?.toLowerCase() || '';

        return studentName.includes(searchLower) ||
               studentId.includes(searchLower) ||
               courseTitle.includes(searchLower) ||
               courseCode.includes(searchLower) ||
               semester.includes(searchLower) ||
               academicYear.includes(searchLower) ||
               grade.includes(searchLower);
      });
    }
  }

  clearSearch(): void {
    this.searchTerm = '';
    this.applySearchFilter();
  }

  // Statistics methods
  getGradedCount(): number {
    return this.filteredEnrollments.filter(enrollment => enrollment.grade && enrollment.grade.trim() !== '').length;
  }

  getPendingCount(): number {
    return this.filteredEnrollments.filter(enrollment => !enrollment.grade || enrollment.grade.trim() === '').length;
  }

  // Grade styling methods
  getGradeClass(grade: string): string {
    if (!grade) return '';
    
    switch (grade.toUpperCase()) {
      case 'A+':
      case 'A':
      case 'A-': 
        return 'grade-excellent';
      case 'B+':
      case 'B':
      case 'B-': 
        return 'grade-good';
      case 'C+':
      case 'C':
      case 'C-': 
        return 'grade-average';
      case 'D':
        return 'grade-poor';
      case 'F':
        return 'grade-fail';
      default: 
        return 'grade-unknown';
    }
  }

  getStatusClass(grade?: string): string {
    if (!grade) return 'status-pending';
    
    const gradeUpper = grade.toUpperCase();
    if (['A+', 'A', 'A-', 'B+', 'B', 'B-', 'C+', 'C', 'C-'].includes(gradeUpper)) {
      return 'status-passed';
    } else if (gradeUpper === 'D') {
      return 'status-warning';
    } else if (gradeUpper === 'F') {
      return 'status-failed';
    }
    return 'status-pending';
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

  // Legacy method for backward compatibility
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
