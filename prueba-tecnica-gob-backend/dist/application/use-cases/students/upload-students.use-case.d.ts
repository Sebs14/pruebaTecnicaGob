import type { IStudentRepository } from '../../../domain/repositories/student.repository';
export interface StudentRow {
    nombre_estudiante: string;
    anio_inicio: number;
    nue: string;
    genero: string;
    promedio_actual: number;
    graduado: boolean;
    promedio_graduacion?: number;
}
export interface UploadStudentsInput {
    rows: StudentRow[];
}
export interface RowError {
    row: number;
    field: string;
    message: string;
}
export interface UploadStudentsOutput {
    success: boolean;
    inserted: number;
    errors: RowError[];
}
export declare class UploadStudentsUseCase {
    private readonly studentRepository;
    constructor(studentRepository: IStudentRepository);
    execute(input: UploadStudentsInput): Promise<UploadStudentsOutput>;
    private validateRow;
    private mapToStudent;
}
