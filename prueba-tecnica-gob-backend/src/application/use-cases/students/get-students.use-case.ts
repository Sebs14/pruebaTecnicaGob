// Application Layer - Use Case
import { Inject, Injectable } from '@nestjs/common';
import type {
  FindAllOptions,
  IStudentRepository,
  PaginatedResult,
} from '../../../domain/repositories/student.repository';
import { STUDENT_REPOSITORY } from '../../../domain/repositories/student.repository';
import type { Student } from '../../../domain/entities/student.entity';

export interface GetStudentsInput {
  page?: number;
  limit?: number;
  search?: string;
  graduado?: boolean;
}

@Injectable()
export class GetStudentsUseCase {
  constructor(
    @Inject(STUDENT_REPOSITORY)
    private readonly studentRepository: IStudentRepository,
  ) {}

  async execute(input: GetStudentsInput): Promise<PaginatedResult<Student>> {
    const options: FindAllOptions = {
      page: input.page ?? 1,
      limit: input.limit ?? 10,
      search: input.search,
      graduado: input.graduado,
    };

    return this.studentRepository.findAll(options);
  }
}
