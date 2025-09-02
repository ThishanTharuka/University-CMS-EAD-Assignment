import { Course } from './course.model';
import { Student } from './student.model';

export interface Enrollment {
  id?: number;
  student: Student;
  course: Course;
  enrollmentDate: string;
  status: EnrollmentStatus;
  grade?: string;
  semester?: string;
  academicYear?: string;
  createdAt?: string;
  updatedAt?: string;
}

export enum EnrollmentStatus {
  ENROLLED = 'ENROLLED',
  COMPLETED = 'COMPLETED',
  DROPPED = 'DROPPED',
  FAILED = 'FAILED',
  IN_PROGRESS = 'IN_PROGRESS'
}
