export declare class Student {
    readonly id: string;
    readonly nombreEstudiante: string;
    readonly anioInicio: number;
    readonly nue: string;
    readonly genero: Genero;
    readonly promedioActual: number;
    readonly graduado: boolean;
    readonly promedioGraduacion: number | null;
    readonly createdAt: Date;
    readonly updatedAt: Date;
    constructor(id: string, nombreEstudiante: string, anioInicio: number, nue: string, genero: Genero, promedioActual: number, graduado: boolean, promedioGraduacion: number | null, createdAt: Date, updatedAt: Date);
    static create(props: CreateStudentProps): Student;
    isActive(): boolean;
    getYearsEnrolled(): number;
    hasHighPerformance(): boolean;
}
export declare enum Genero {
    MASCULINO = "masculino",
    FEMENINO = "femenino",
    OTRO = "otro",
    NO_ESPECIFICADO = "no especificado"
}
export interface CreateStudentProps {
    nombreEstudiante: string;
    anioInicio: number;
    nue: string;
    genero: Genero;
    promedioActual: number;
    graduado: boolean;
}
