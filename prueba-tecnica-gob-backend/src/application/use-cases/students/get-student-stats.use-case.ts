// Application Layer - Use Case
import { Inject, Injectable } from '@nestjs/common';
import type { IStudentRepository } from '../../../domain/repositories/student.repository';
import { STUDENT_REPOSITORY } from '../../../domain/repositories/student.repository';

export interface StudentStats {
  totalStudents: number;
  activeStudents: number;
  graduatedStudents: number;
  averageScore: number;
  byGender: Record<string, number>;
  byYear: Record<number, number>;
}

@Injectable()
export class GetStudentStatsUseCase {
  constructor(
    @Inject(STUDENT_REPOSITORY)
    private readonly studentRepository: IStudentRepository,
  ) {}

  async execute(): Promise<StudentStats> {
    const [
      totalStudents,
      activeStudents,
      graduatedStudents,
      averageScore,
      byGender,
      byYear,
    ] = await Promise.all([
      this.studentRepository.count(),
      this.studentRepository.countByGraduado(false),
      this.studentRepository.countByGraduado(true),
      this.studentRepository.getAverageScore(),
      this.studentRepository.countByGenero(),
      this.studentRepository.countByAnioInicio(),
    ]);

    return {
      totalStudents,
      activeStudents,
      graduatedStudents,
      averageScore: Math.round(averageScore * 100) / 100,
      byGender,
      byYear,
    };
  }
}
