// Domain Layer - Repository Interface (Port)
// This is the contract that infrastructure must implement
import { Student } from '../entities/student.entity';

export interface FindAllOptions {
  page?: number;
  limit?: number;
  search?: string;
  graduado?: boolean;
}

export interface PaginatedResult<T> {
  data: T[];
  total: number;
  page: number;
  limit: number;
  totalPages: number;
}

export interface IStudentRepository {
  findById(id: string): Promise<Student | null>;
  findByNue(nue: string): Promise<Student | null>;
  findByName(name: string): Promise<Student | null>;
  findAll(options: FindAllOptions): Promise<PaginatedResult<Student>>;
  save(student: Student): Promise<Student>;
  saveMany(students: Student[]): Promise<Student[]>;
  update(student: Student): Promise<Student>;
  delete(id: string): Promise<void>;
  count(): Promise<number>;
  countByGraduado(graduado: boolean): Promise<number>;
  getAverageScore(): Promise<number>;
  countByGenero(): Promise<Record<string, number>>;
  countByAnioInicio(): Promise<Record<number, number>>;
}

// Token for dependency injection
export const STUDENT_REPOSITORY = Symbol('STUDENT_REPOSITORY');
