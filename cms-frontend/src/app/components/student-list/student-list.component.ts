import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatCardModule } from '@angular/material/card';
import { MatChipsModule } from '@angular/material/chips';
import { MatDialogModule, MatDialog } from '@angular/material/dialog';
import { MatSnackBarModule, MatSnackBar } from '@angular/material/snack-bar';
import { StudentService } from '../../services/student.service';
import { Student } from '../../models/student.model';
import { StudentFormComponent } from '../student-form/student-form.component';

@Component({
  selector: 'app-student-list',
  imports: [
    CommonModule,
    MatTableModule, 
    MatButtonModule, 
    MatIconModule, 
    MatCardModule,
    MatChipsModule,
    MatDialogModule,
    MatSnackBarModule
  ],
  templateUrl: './student-list.component.html',
  styleUrl: './student-list.component.scss'
})
export class StudentListComponent implements OnInit {
  students: Student[] = [];
  displayedColumns: string[] = ['id', 'studentId', 'firstName', 'lastName', 'email', 'department', 'yearOfStudy', 'actions'];

  constructor(
    private readonly studentService: StudentService,
    private readonly dialog: MatDialog,
    private readonly snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    this.loadStudents();
  }

  loadStudents(): void {
    this.studentService.getAllStudents().subscribe({
      next: (students) => {
        this.students = students;
      },
      error: (error) => {
        console.error('Error loading students:', error);
        this.snackBar.open('Error loading students', 'Close', { duration: 3000 });
      }
    });
  }

  openStudentForm(student?: Student): void {
    const dialogRef = this.dialog.open(StudentFormComponent, {
      width: '600px',
      data: { student }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.loadStudents();
      }
    });
  }

  editStudent(student: Student): void {
    this.openStudentForm(student);
  }

  deleteStudent(student: Student): void {
    if (confirm(`Are you sure you want to delete the student "${student.firstName} ${student.lastName}"?`)) {
      this.studentService.deleteStudent(student.id!).subscribe({
        next: () => {
          this.snackBar.open('Student deleted successfully', 'Close', { duration: 3000 });
          this.loadStudents();
        },
        error: (error) => {
          console.error('Error deleting student:', error);
          this.snackBar.open('Error deleting student', 'Close', { duration: 3000 });
        }
      });
    }
  }
}
