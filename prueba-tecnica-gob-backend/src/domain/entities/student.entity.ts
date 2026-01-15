// Domain Layer - Entity (Pure business logic, no framework dependencies)
export class Student {
  constructor(
    public readonly id: string,
    public readonly nombreEstudiante: string,
    public readonly anioInicio: number,
    public readonly nue: string,
    public readonly genero: Genero,
    public readonly promedioActual: number,
    public readonly graduado: boolean,
    public readonly promedioGraduacion: number | null,
    public readonly createdAt: Date,
    public readonly updatedAt: Date,
  ) {}

  static create(props: CreateStudentProps): Student {
    // Business rule: If graduated, graduation average must equal current average
    const promedioGraduacion = props.graduado ? props.promedioActual : null;

    return new Student(
      crypto.randomUUID(),
      props.nombreEstudiante.trim(),
      props.anioInicio,
      props.nue.trim(),
      props.genero,
      props.promedioActual,
      props.graduado,
      promedioGraduacion,
      new Date(),
      new Date(),
    );
  }

  // Business rules
  isActive(): boolean {
    return !this.graduado;
  }

  getYearsEnrolled(): number {
    return new Date().getFullYear() - this.anioInicio;
  }

  hasHighPerformance(): boolean {
    return this.promedioActual >= 9.0;
  }
}

export enum Genero {
  MASCULINO = 'masculino',
  FEMENINO = 'femenino',
  OTRO = 'otro',
  NO_ESPECIFICADO = 'no especificado',
}

export interface CreateStudentProps {
  nombreEstudiante: string;
  anioInicio: number;
  nue: string;
  genero: Genero;
  promedioActual: number;
  graduado: boolean;
}
