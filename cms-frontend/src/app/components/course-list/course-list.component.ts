import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatCardModule } from '@angular/material/card';
import { MatDialogModule, MatDialog } from '@angular/material/dialog';
import { MatSnackBarModule, MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { CourseService } from '../../services/course.service';
import { Course } from '../../models/course.model';
import { CourseFormComponent } from '../course-form/course-form.component';

@Component({
  selector: 'app-course-list',
  imports: [
    CommonModule,
    FormsModule,
    MatTableModule, 
    MatButtonModule, 
    MatIconModule, 
    MatCardModule,
    MatDialogModule,
    MatSnackBarModule
  ],
  templateUrl: './course-list.component.html',
  styleUrl: './course-list.component.scss'
})
export class CourseListComponent implements OnInit {
  courses: Course[] = [];
  filteredCourses: Course[] = [];
  searchTerm: string = '';
  displayedColumns: string[] = ['id', 'title', 'code', 'description', 'credits', 'department', 'actions'];

  constructor(
    private readonly courseService: CourseService,
    private readonly dialog: MatDialog,
    private readonly snackBar: MatSnackBar,
    private readonly router: Router
  ) {}

  ngOnInit(): void {
    this.loadCourses();
  }

  loadCourses(): void {
    this.courseService.getAllCourses().subscribe({
      next: (courses) => {
        this.courses = courses;
        this.filteredCourses = courses;
      },
      error: (error) => {
        console.error('Error loading courses:', error);
        this.snackBar.open('Error loading courses', 'Close', { duration: 3000 });
      }
    });
  }

  onSearch(): void {
    if (!this.searchTerm.trim()) {
      this.filteredCourses = this.courses;
    } else {
      const searchTermLower = this.searchTerm.toLowerCase();
      this.filteredCourses = this.courses.filter(course =>
        course.title.toLowerCase().includes(searchTermLower) ||
        course.code.toLowerCase().includes(searchTermLower) ||
        (course.description && course.description.toLowerCase().includes(searchTermLower)) ||
        (course.department && course.department.toLowerCase().includes(searchTermLower))
      );
    }
  }

  viewCourse(course: Course): void {
    if (course.id) {
      this.router.navigate(['/courses', course.id]);
    }
  }

  openCourseForm(course?: Course): void {
    const dialogRef = this.dialog.open(CourseFormComponent, {
      width: '600px',
      data: { course }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.loadCourses();
      }
    });
  }

  editCourse(course: Course): void {
    this.openCourseForm(course);
  }

  deleteCourse(course: Course): void {
    if (confirm(`Are you sure you want to delete the course "${course.title}"?`)) {
      this.courseService.deleteCourse(course.id!).subscribe({
        next: () => {
          this.snackBar.open('Course deleted successfully', 'Close', { duration: 3000 });
          this.loadCourses();
        },
        error: (error) => {
          console.error('Error deleting course:', error);
          this.snackBar.open('Error deleting course', 'Close', { duration: 3000 });
        }
      });
    }
  }
}
