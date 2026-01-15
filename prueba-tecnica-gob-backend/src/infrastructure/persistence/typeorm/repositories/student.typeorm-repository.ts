// Infrastructure Layer - Repository Implementation (Adapter)
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ILike, Repository } from 'typeorm';
import { Student } from '../../../../domain/entities/student.entity';
import {
  FindAllOptions,
  IStudentRepository,
  PaginatedResult,
} from '../../../../domain/repositories/student.repository';
import { StudentOrmEntity } from '../entities/student.orm-entity';

@Injectable()
export class StudentTypeOrmRepository implements IStudentRepository {
  constructor(
    @InjectRepository(StudentOrmEntity)
    private readonly repository: Repository<StudentOrmEntity>,
  ) {}

  async findById(id: string): Promise<Student | null> {
    const entity = await this.repository.findOne({ where: { id } });
    return entity ? entity.toDomain() : null;
  }

  async findByNue(nue: string): Promise<Student | null> {
    const entity = await this.repository.findOne({ where: { nue } });
    return entity ? entity.toDomain() : null;
  }

  async findByName(name: string): Promise<Student | null> {
    const entity = await this.repository.findOne({
      where: { nombreEstudiante: ILike(name.trim()) },
    });
    return entity ? entity.toDomain() : null;
  }

  async findAll(options: FindAllOptions): Promise<PaginatedResult<Student>> {
    const page = options.page ?? 1;
    const limit = options.limit ?? 10;
    const skip = (page - 1) * limit;

    const queryBuilder = this.repository.createQueryBuilder('student');

    if (options.search) {
      queryBuilder.andWhere(
        '(student.nombreEstudiante ILIKE :search OR student.nue ILIKE :search)',
        { search: `%${options.search}%` },
      );
    }

    if (options.graduado !== undefined) {
      queryBuilder.andWhere('student.graduado = :graduado', {
        graduado: options.graduado,
      });
    }

    const [entities, total] = await queryBuilder
      .orderBy('student.createdAt', 'DESC')
      .skip(skip)
      .take(limit)
      .getManyAndCount();

    return {
      data: entities.map((e) => e.toDomain()),
      total,
      page,
      limit,
      totalPages: Math.ceil(total / limit),
    };
  }

  async save(student: Student): Promise<Student> {
    const entity = StudentOrmEntity.fromDomain(student);
    const saved = await this.repository.save(entity);
    return saved.toDomain();
  }

  async saveMany(students: Student[]): Promise<Student[]> {
    const entities = students.map((s) => StudentOrmEntity.fromDomain(s));
    const saved = await this.repository.save(entities);
    return saved.map((e) => e.toDomain());
  }

  async update(student: Student): Promise<Student> {
    const entity = StudentOrmEntity.fromDomain(student);
    const updated = await this.repository.save(entity);
    return updated.toDomain();
  }

  async delete(id: string): Promise<void> {
    await this.repository.delete(id);
  }

  async count(): Promise<number> {
    return this.repository.count();
  }

  async countByGraduado(graduado: boolean): Promise<number> {
    return this.repository.count({ where: { graduado } });
  }

  async getAverageScore(): Promise<number> {
    const result = await this.repository
      .createQueryBuilder('student')
      .select('AVG(student.promedioActual)', 'avg')
      .getRawOne();
    return result?.avg ? parseFloat(result.avg) : 0;
  }

  async countByGenero(): Promise<Record<string, number>> {
    const result = await this.repository
      .createQueryBuilder('student')
      .select('student.genero', 'genero')
      .addSelect('COUNT(*)', 'count')
      .groupBy('student.genero')
      .getRawMany();

    return result.reduce(
      (acc, item) => {
        acc[item.genero] = parseInt(item.count, 10);
        return acc;
      },
      {} as Record<string, number>,
    );
  }

  async countByAnioInicio(): Promise<Record<number, number>> {
    const result = await this.repository
      .createQueryBuilder('student')
      .select('student.anioInicio', 'anio')
      .addSelect('COUNT(*)', 'count')
      .groupBy('student.anioInicio')
      .orderBy('student.anioInicio', 'ASC')
      .getRawMany();

    return result.reduce(
      (acc, item) => {
        acc[item.anio] = parseInt(item.count, 10);
        return acc;
      },
      {} as Record<number, number>,
    );
  }
}
