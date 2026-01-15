import type { IStudentRepository, PaginatedResult } from '../../../domain/repositories/student.repository';
import type { Student } from '../../../domain/entities/student.entity';
export interface GetStudentsInput {
    page?: number;
    limit?: number;
    search?: string;
    graduado?: boolean;
}
export declare class GetStudentsUseCase {
    private readonly studentRepository;
    constructor(studentRepository: IStudentRepository);
    execute(input: GetStudentsInput): Promise<PaginatedResult<Student>>;
}
