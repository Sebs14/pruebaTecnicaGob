import { UploadStudentsUseCase } from '../../../application/use-cases/students/upload-students.use-case';
import { GetStudentsUseCase } from '../../../application/use-cases/students/get-students.use-case';
import { GetStudentStatsUseCase } from '../../../application/use-cases/students/get-student-stats.use-case';
import { GetStudentsQueryDto, BulkUploadDto } from '../dtos/students.dto';
export declare class StudentsController {
    private readonly uploadStudentsUseCase;
    private readonly getStudentsUseCase;
    private readonly getStudentStatsUseCase;
    constructor(uploadStudentsUseCase: UploadStudentsUseCase, getStudentsUseCase: GetStudentsUseCase, getStudentStatsUseCase: GetStudentStatsUseCase);
    getStudents(query: GetStudentsQueryDto): Promise<import("../../../domain/repositories/student.repository").PaginatedResult<import("../../../domain/entities/student.entity").Student>>;
    getStats(): Promise<import("../../../application/use-cases/students/get-student-stats.use-case").StudentStats>;
    bulkUploadJson(body: BulkUploadDto): Promise<import("../../../application/use-cases/students/upload-students.use-case").UploadStudentsOutput>;
    bulkUpload(file: Express.Multer.File): Promise<import("../../../application/use-cases/students/upload-students.use-case").UploadStudentsOutput>;
    private parseBoolean;
}
