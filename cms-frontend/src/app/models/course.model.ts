export interface Course {
  id?: number;
  code: string;
  title: string;
  description?: string;
  credits: number;
  semester?: string;
  department?: string;
  createdAt?: string;
  updatedAt?: string;
}
