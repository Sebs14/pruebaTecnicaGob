export declare class GetStudentsQueryDto {
    page?: string;
    limit?: string;
    search?: string;
    graduado?: string;
}
export declare class StudentUploadRowDto {
    nombre_estudiante: string;
    anio_inicio: number;
    nue: string | number;
    genero?: string;
    promedio_actual: number;
    graduado?: boolean;
    promedio_graduacion?: number;
}
export declare class BulkUploadDto {
    students: StudentUploadRowDto[];
}
