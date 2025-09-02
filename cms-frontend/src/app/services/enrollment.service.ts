import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Enrollment } from '../models/enrollment.model';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class EnrollmentService {
  private readonly apiUrl = `${environment.apiUrl}/enrollments`;

  constructor(private readonly http: HttpClient) { }

  getAllEnrollments(): Observable<Enrollment[]> {
    return this.http.get<Enrollment[]>(this.apiUrl);
  }

  getEnrollmentById(id: number): Observable<Enrollment> {
    return this.http.get<Enrollment>(`${this.apiUrl}/${id}`);
  }

  createEnrollment(studentId: string, courseCode: string, semester: string, academicYear: string): Observable<Enrollment> {
    const payload = { studentId, courseCode, semester, academicYear };
    return this.http.post<Enrollment>(this.apiUrl, payload);
  }

  updateEnrollmentStatus(id: number, status: string): Observable<Enrollment> {
    return this.http.put<Enrollment>(`${this.apiUrl}/${id}/status`, { status });
  }

  updateEnrollmentGrade(id: number, grade: string): Observable<Enrollment> {
    return this.http.put<Enrollment>(`${this.apiUrl}/${id}/grade`, { grade });
  }

  deleteEnrollment(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }

  getEnrollmentsByStudent(studentId: string): Observable<Enrollment[]> {
    return this.http.get<Enrollment[]>(`${this.apiUrl}/student/${studentId}`);
  }

  getEnrollmentsByCourse(courseCode: string): Observable<Enrollment[]> {
    return this.http.get<Enrollment[]>(`${this.apiUrl}/course/${courseCode}`);
  }
}
