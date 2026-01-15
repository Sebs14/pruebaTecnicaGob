// Infrastructure Layer - TypeORM Entity (Database model)
import {
  Entity,
  Column,
  PrimaryColumn,
  CreateDateColumn,
  UpdateDateColumn,
  Index,
} from 'typeorm';
import { Genero, Student } from '../../../../domain/entities/student.entity';

@Entity('students')
export class StudentOrmEntity {
  @PrimaryColumn('uuid')
  id: string;

  @Column({ name: 'nombre_estudiante' })
  @Index()
  nombreEstudiante: string;

  @Column({ name: 'anio_inicio' })
  anioInicio: number;

  @Column({ unique: true })
  @Index()
  nue: string;

  @Column({ type: 'enum', enum: Genero })
  genero: Genero;

  @Column({ name: 'promedio_actual', type: 'decimal', precision: 4, scale: 2 })
  promedioActual: number;

  @Column({ default: false })
  graduado: boolean;

  @Column({
    name: 'promedio_graduacion',
    type: 'decimal',
    precision: 4,
    scale: 2,
    nullable: true,
  })
  promedioGraduacion: number | null;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date;

  // Mapper to Domain Entity
  toDomain(): Student {
    return new Student(
      this.id,
      this.nombreEstudiante,
      this.anioInicio,
      this.nue,
      this.genero,
      Number(this.promedioActual),
      this.graduado,
      this.promedioGraduacion ? Number(this.promedioGraduacion) : null,
      this.createdAt,
      this.updatedAt,
    );
  }

  // Mapper from Domain Entity
  static fromDomain(student: Student): StudentOrmEntity {
    const entity = new StudentOrmEntity();
    entity.id = student.id;
    entity.nombreEstudiante = student.nombreEstudiante;
    entity.anioInicio = student.anioInicio;
    entity.nue = student.nue;
    entity.genero = student.genero;
    entity.promedioActual = student.promedioActual;
    entity.graduado = student.graduado;
    entity.promedioGraduacion = student.promedioGraduacion;
    entity.createdAt = student.createdAt;
    entity.updatedAt = student.updatedAt;
    return entity;
  }
}
