import { Component, Inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogModule, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatSnackBarModule, MatSnackBar } from '@angular/material/snack-bar';
import { CourseService } from '../../services/course.service';
import { Course } from '../../models/course.model';

@Component({
  selector: 'app-course-form',
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatDialogModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatSnackBarModule
  ],
  templateUrl: './course-form.component.html',
  styleUrl: './course-form.component.scss'
})
export class CourseFormComponent implements OnInit {
  courseForm: FormGroup;
  isEditMode = false;
  isSubmitting = false;

  constructor(
    private readonly fb: FormBuilder,
    private readonly courseService: CourseService,
    private readonly snackBar: MatSnackBar,
    private readonly dialogRef: MatDialogRef<CourseFormComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { course?: Course }
  ) {
    this.courseForm = this.fb.group({
      title: ['', [Validators.required, Validators.minLength(3)]],
      code: ['', [Validators.required, Validators.pattern(/^[A-Z]{2,4}\d{3}$/)]],
      description: ['', [Validators.required, Validators.minLength(10)]],
      credits: ['', [Validators.required, Validators.min(1), Validators.max(6)]],
      department: ['', [Validators.required, Validators.minLength(3)]]
    });
  }

  ngOnInit(): void {
    if (this.data?.course) {
      this.isEditMode = true;
      this.courseForm.patchValue(this.data.course);
    }
  }

  onSubmit(): void {
    if (this.courseForm.valid && !this.isSubmitting) {
      this.isSubmitting = true;
      const courseData = this.courseForm.value;

      const operation = this.isEditMode && this.data.course?.id
        ? this.courseService.updateCourse(this.data.course.id, courseData)
        : this.courseService.createCourse(courseData);

      operation.subscribe({
        next: (result) => {
          this.snackBar.open(
            `Course ${this.isEditMode ? 'updated' : 'created'} successfully!`,
            'Close',
            { duration: 3000 }
          );
          this.dialogRef.close(result);
        },
        error: (error) => {
          console.error('Error saving course:', error);
          this.snackBar.open(
            'Error saving course. Please try again.',
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
    const field = this.courseForm.get(fieldName);
    if (field?.hasError('required')) {
      return `${fieldName.charAt(0).toUpperCase() + fieldName.slice(1)} is required`;
    }
    if (field?.hasError('minlength')) {
      return `${fieldName.charAt(0).toUpperCase() + fieldName.slice(1)} must be at least ${field.errors?.['minlength'].requiredLength} characters`;
    }
    if (field?.hasError('pattern')) {
      return 'Course code must be in format like CS101, MATH201, etc.';
    }
    if (field?.hasError('min')) {
      return 'Credits must be at least 1';
    }
    if (field?.hasError('max')) {
      return 'Credits cannot exceed 6';
    }
    return '';
  }
}
