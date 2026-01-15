// Application Layer - Use Case
import { Inject, Injectable } from '@nestjs/common';
import { Genero, Student } from '../../../domain/entities/student.entity';
import type { CreateStudentProps } from '../../../domain/entities/student.entity';
import type { IStudentRepository } from '../../../domain/repositories/student.repository';
import { STUDENT_REPOSITORY } from '../../../domain/repositories/student.repository';

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

@Injectable()
export class UploadStudentsUseCase {
  constructor(
    @Inject(STUDENT_REPOSITORY)
    private readonly studentRepository: IStudentRepository,
  ) {}

  async execute(input: UploadStudentsInput): Promise<UploadStudentsOutput> {
    const errors: RowError[] = [];
    const validStudents: Student[] = [];
    const seenNues = new Set<string>();

    // Validate each row
    for (let i = 0; i < input.rows.length; i++) {
      const row = input.rows[i];
      const rowNumber = i + 2; // +2 because row 1 is header

      const rowErrors = await this.validateRow(
        row,
        rowNumber,
        seenNues,
      );

      if (rowErrors.length > 0) {
        errors.push(...rowErrors);
      } else {
        const student = this.mapToStudent(row);
        validStudents.push(student);
        seenNues.add(row.nue);
      }
    }

    // Insertar estudiantes válidos (aunque haya errores en otros)
    let inserted = 0;
    if (validStudents.length > 0) {
      await this.studentRepository.saveMany(validStudents);
      inserted = validStudents.length;
    }

    return {
      success: errors.length === 0,
      inserted,
      errors,
    };
  }

  private async validateRow(
    row: StudentRow,
    rowNumber: number,
    seenNues: Set<string>,
  ): Promise<RowError[]> {
    const errors: RowError[] = [];
    const currentYear = new Date().getFullYear();

    // Validate nombre_estudiante (solo requerido, NO único)
    if (!row.nombre_estudiante || row.nombre_estudiante.trim() === '') {
      errors.push({
        row: rowNumber,
        field: 'nombre_estudiante',
        message: 'El nombre del estudiante es requerido',
      });
    }

    // Validate anio_inicio
    if (!row.anio_inicio) {
      errors.push({
        row: rowNumber,
        field: 'anio_inicio',
        message: 'El año de inicio es requerido',
      });
    } else if (row.anio_inicio > currentYear) {
      errors.push({
        row: rowNumber,
        field: 'anio_inicio',
        message: `El año de inicio no puede ser mayor a ${currentYear}`,
      });
    }

    // Validate NUE
    if (!row.nue || row.nue.trim() === '') {
      errors.push({
        row: rowNumber,
        field: 'nue',
        message: 'El NUE es requerido',
      });
    } else if (!/^\d+$/.test(row.nue)) {
      errors.push({
        row: rowNumber,
        field: 'nue',
        message: 'El NUE debe ser un número positivo',
      });
    } else if (seenNues.has(row.nue)) {
      errors.push({
        row: rowNumber,
        field: 'nue',
        message: 'NUE duplicado en el archivo',
      });
    } else {
      const existingByNue = await this.studentRepository.findByNue(row.nue);
      if (existingByNue) {
        errors.push({
          row: rowNumber,
          field: 'nue',
          message: 'Ya existe un estudiante con este NUE',
        });
      }
    }

    // Validate genero
    const validGeneros = Object.values(Genero);
    if (!row.genero || !validGeneros.includes(row.genero as Genero)) {
      errors.push({
        row: rowNumber,
        field: 'genero',
        message: `Género debe ser: ${validGeneros.join(', ')}`,
      });
    }

    // Validate promedio_actual
    if (row.promedio_actual === undefined || row.promedio_actual === null) {
      errors.push({
        row: rowNumber,
        field: 'promedio_actual',
        message: 'El promedio actual es requerido',
      });
    } else if (row.promedio_actual < 0 || row.promedio_actual > 10) {
      errors.push({
        row: rowNumber,
        field: 'promedio_actual',
        message: 'El promedio debe estar entre 0 y 10',
      });
    }

    // Validate graduado and promedio_graduacion
    if (row.graduado === true) {
      if (
        row.promedio_graduacion !== undefined &&
        row.promedio_graduacion !== row.promedio_actual
      ) {
        errors.push({
          row: rowNumber,
          field: 'promedio_graduacion',
          message:
            'El promedio de graduación debe ser igual al promedio actual si está graduado',
        });
      }
    }

    return errors;
  }

  private mapToStudent(row: StudentRow): Student {
    const props: CreateStudentProps = {
      nombreEstudiante: row.nombre_estudiante,
      anioInicio: row.anio_inicio,
      nue: row.nue,
      genero: row.genero as Genero,
      promedioActual: row.promedio_actual,
      graduado: row.graduado,
    };

    return Student.create(props);
  }
}
