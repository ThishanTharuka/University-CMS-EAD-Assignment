import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatCardModule } from '@angular/material/card';
import { MatChipsModule } from '@angular/material/chips';
import { EnrollmentService } from '../../services/enrollment.service';
import { Enrollment } from '../../models/enrollment.model';

@Component({
  selector: 'app-enrollment-list',
  imports: [
    CommonModule,
    MatTableModule, 
    MatButtonModule, 
    MatIconModule, 
    MatCardModule,
    MatChipsModule
  ],
  templateUrl: './enrollment-list.component.html',
  styleUrl: './enrollment-list.component.scss'
})
export class EnrollmentListComponent implements OnInit {
  enrollments: Enrollment[] = [];
  displayedColumns: string[] = ['id', 'studentName', 'courseName', 'enrollmentDate', 'grade', 'actions'];

  constructor(private readonly enrollmentService: EnrollmentService) {}

  ngOnInit(): void {
    this.loadEnrollments();
  }

  loadEnrollments(): void {
    this.enrollmentService.getAllEnrollments().subscribe({
      next: (enrollments) => {
        this.enrollments = enrollments;
      },
      error: (error) => {
        console.error('Error loading enrollments:', error);
      }
    });
  }

  deleteEnrollment(id: number): void {
    if (confirm('Are you sure you want to delete this enrollment?')) {
      this.enrollmentService.deleteEnrollment(id).subscribe({
        next: () => {
          this.loadEnrollments();
        },
        error: (error) => {
          console.error('Error deleting enrollment:', error);
        }
      });
    }
  }

  getGradeColor(grade: string): string {
    switch (grade?.toUpperCase()) {
      case 'A': return 'primary';
      case 'B': return 'accent';
      case 'C': return 'warn';
      default: return '';
    }
  }
}
