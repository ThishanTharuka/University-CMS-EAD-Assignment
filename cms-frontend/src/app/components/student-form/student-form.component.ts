import { Component, Inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogModule, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatSnackBarModule, MatSnackBar } from '@angular/material/snack-bar';
import { MatSelectModule } from '@angular/material/select';
import { StudentService } from '../../services/student.service';
import { Student } from '../../models/student.model';

@Component({
  selector: 'app-student-form',
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatDialogModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatSnackBarModule,
    MatSelectModule
  ],
  templateUrl: './student-form.component.html',
  styleUrl: './student-form.component.scss'
})
export class StudentFormComponent implements OnInit {
  studentForm: FormGroup;
  isEditMode = false;
  isSubmitting = false;

  departments = [
    'Computer Science',
    'Mathematics',
    'Physics',
    'Chemistry',
    'Biology',
    'Engineering',
    'Business Administration',
    'Economics',
    'Psychology',
    'History'
  ];

  constructor(
    private readonly fb: FormBuilder,
    private readonly studentService: StudentService,
    private readonly snackBar: MatSnackBar,
    private readonly dialogRef: MatDialogRef<StudentFormComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { student?: Student }
  ) {
    this.studentForm = this.fb.group({
      studentId: ['', [Validators.required, Validators.pattern(/^[A-Z0-9]{6,10}$/)]],
      firstName: ['', [Validators.required, Validators.minLength(2)]],
      lastName: ['', [Validators.required, Validators.minLength(2)]],
      email: ['', [Validators.required, Validators.email]],
      phone: ['', [Validators.pattern(/^\d{10,15}$/)]],
      department: ['', [Validators.required]],
      yearOfStudy: ['', [Validators.required, Validators.min(1), Validators.max(6)]]
    });
  }

  ngOnInit(): void {
    if (this.data?.student) {
      this.isEditMode = true;
      this.studentForm.patchValue(this.data.student);
    }
  }

  onSubmit(): void {
    if (this.studentForm.valid && !this.isSubmitting) {
      this.isSubmitting = true;
      const studentData = this.studentForm.value;

      const operation = this.isEditMode && this.data.student?.id
        ? this.studentService.updateStudent(this.data.student.id, studentData)
        : this.studentService.createStudent(studentData);

      operation.subscribe({
        next: (result) => {
          this.snackBar.open(
            `Student ${this.isEditMode ? 'updated' : 'created'} successfully!`,
            'Close',
            { duration: 3000 }
          );
          this.dialogRef.close(result);
        },
        error: (error) => {
          console.error('Error saving student:', error);
          this.snackBar.open(
            'Error saving student. Please try again.',
            'Close',
            { duration: 3000 }
          );
          this.isSubmitting = false;
        }
      });
    }
  }

  onCancel(): void {
    this.dialogRef.close();
  }

  getErrorMessage(fieldName: string): string {
    const field = this.studentForm.get(fieldName);
    if (field?.hasError('required')) {
      return `${fieldName.charAt(0).toUpperCase() + fieldName.slice(1)} is required`;
    }
    if (field?.hasError('minlength')) {
      return `${fieldName.charAt(0).toUpperCase() + fieldName.slice(1)} must be at least ${field.errors?.['minlength'].requiredLength} characters`;
    }
    if (field?.hasError('email')) {
      return 'Please enter a valid email address';
    }
    if (field?.hasError('pattern')) {
      if (fieldName === 'studentId') {
        return 'Student ID must be 6-10 alphanumeric characters (e.g., STU001)';
      }
      if (fieldName === 'phone') {
        return 'Phone number must be 10-15 digits';
      }
    }
    if (field?.hasError('min')) {
      return 'Year of study must be at least 1';
    }
    if (field?.hasError('max')) {
      return 'Year of study cannot exceed 6';
    }
    return '';
  }
}
