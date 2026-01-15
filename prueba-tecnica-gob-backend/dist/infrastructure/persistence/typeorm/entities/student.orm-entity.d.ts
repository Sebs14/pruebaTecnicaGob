import { Genero, Student } from '../../../../domain/entities/student.entity';
export declare class StudentOrmEntity {
    id: string;
    nombreEstudiante: string;
    anioInicio: number;
    nue: string;
    genero: Genero;
    promedioActual: number;
    graduado: boolean;
    promedioGraduacion: number | null;
    createdAt: Date;
    updatedAt: Date;
    toDomain(): Student;
    static fromDomain(student: Student): StudentOrmEntity;
}
