import type { IStudentRepository } from '../../../domain/repositories/student.repository';
export interface StudentStats {
    totalStudents: number;
    activeStudents: number;
    graduatedStudents: number;
    averageScore: number;
    byGender: Record<string, number>;
    byYear: Record<number, number>;
}
export declare class GetStudentStatsUseCase {
    private readonly studentRepository;
    constructor(studentRepository: IStudentRepository);
    execute(): Promise<StudentStats>;
}
