import { Component, Inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA, MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatChipsModule } from '@angular/material/chips';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';

import { EnrollmentService } from '../../services/enrollment.service';
import { StudentService } from '../../services/student.service';
import { CourseService } from '../../services/course.service';
import { Student } from '../../models/student.model';
import { Course } from '../../models/course.model';
import { Enrollment } from '../../models/enrollment.model';

@Component({
  selector: 'app-enrollment-form',
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatDialogModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatButtonModule,
    MatIconModule,
    MatChipsModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatProgressSpinnerModule,
    MatSnackBarModule
  ],
  templateUrl: './enrollment-form.component.html',
  styleUrl: './enrollment-form.component.scss'
})
export class EnrollmentFormComponent implements OnInit {
  enrollmentForm: FormGroup;
  students: Student[] = [];
  courses: Course[] = [];
  isEditMode: boolean = false;
  isSubmitting: boolean = false;

  constructor(
    private readonly fb: FormBuilder,
    private readonly enrollmentService: EnrollmentService,
    private readonly studentService: StudentService,
    private readonly courseService: CourseService,
    private readonly snackBar: MatSnackBar,
    private readonly dialogRef: MatDialogRef<EnrollmentFormComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { enrollment?: Enrollment }
  ) {
    this.enrollmentForm = this.fb.group({
      studentId: ['', [Validators.required]],
      courseCode: ['', [Validators.required]],
      semester: ['Spring 2024', [Validators.required]],
      academicYear: ['2024', [Validators.required]],
      grade: ['']
    });

    this.isEditMode = !!data?.enrollment;
    if (this.isEditMode && data.enrollment) {
      this.populateForm(data.enrollment);
    }
  }

  ngOnInit(): void {
    this.loadStudents();
    this.loadCourses();
  }

  private loadStudents(): void {
    this.studentService.getAllStudents().subscribe({
      next: (students) => {
        this.students = students;
      },
      error: (error: any) => {
        console.error('Error loading students:', error);
        this.snackBar.open('Error loading students', 'Close', { duration: 3000 });
      }
    });
  }

  private loadCourses(): void {
    this.courseService.getAllCourses().subscribe({
      next: (courses) => {
        this.courses = courses;
      },
      error: (error: any) => {
        console.error('Error loading courses:', error);
        this.snackBar.open('Error loading courses', 'Close', { duration: 3000 });
      }
    });
  }

  private populateForm(enrollment: Enrollment): void {
    this.enrollmentForm.patchValue({
      studentId: enrollment.student?.studentId,
      courseCode: enrollment.course?.code,
      semester: enrollment.semester || 'Spring 2024',
      academicYear: enrollment.academicYear || '2024',
      grade: enrollment.grade || ''
    });
  }

  onSubmit(): void {
    if (this.enrollmentForm.valid && !this.isSubmitting) {
      this.isSubmitting = true;
      
      const formData = this.enrollmentForm.value;

      if (this.isEditMode && this.data.enrollment?.id) {
        // For edit mode, only update the grade
        this.enrollmentService.updateEnrollmentGrade(this.data.enrollment.id, formData.grade).subscribe({
          next: (result: Enrollment) => {
            this.snackBar.open('Enrollment grade updated successfully!', 'Close', { duration: 3000 });
            this.dialogRef.close(result);
          },
          error: (error: any) => {
            console.error('Error updating enrollment:', error);
            this.snackBar.open('Error updating enrollment', 'Close', { duration: 3000 });
            this.isSubmitting = false;
          }
        });
      } else {
        // For create mode, use the proper service method signature
        this.enrollmentService.createEnrollment(
          formData.studentId,
          formData.courseCode,
          formData.semester,
          formData.academicYear
        ).subscribe({
          next: (result: Enrollment) => {
            this.snackBar.open('Enrollment created successfully!', 'Close', { duration: 3000 });
            this.dialogRef.close(result);
          },
          error: (error: any) => {
            console.error('Error creating enrollment:', error);
            this.snackBar.open('Error creating enrollment', 'Close', { duration: 3000 });
            this.isSubmitting = false;
          }
        });
      }
    }
  }

  onCancel(): void {
    this.dialogRef.close();
  }
}
