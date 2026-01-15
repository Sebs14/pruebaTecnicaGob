import { Repository } from 'typeorm';
import { Student } from '../../../../domain/entities/student.entity';
import { FindAllOptions, IStudentRepository, PaginatedResult } from '../../../../domain/repositories/student.repository';
import { StudentOrmEntity } from '../entities/student.orm-entity';
export declare class StudentTypeOrmRepository implements IStudentRepository {
    private readonly repository;
    constructor(repository: Repository<StudentOrmEntity>);
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
