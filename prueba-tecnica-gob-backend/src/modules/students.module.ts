// Module for Students feature
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { StudentsController } from '../infrastructure/http/controllers/students.controller';

import { UploadStudentsUseCase } from '../application/use-cases/students/upload-students.use-case';
import { GetStudentsUseCase } from '../application/use-cases/students/get-students.use-case';
import { GetStudentStatsUseCase } from '../application/use-cases/students/get-student-stats.use-case';

import { StudentOrmEntity } from '../infrastructure/persistence/typeorm/entities/student.orm-entity';
import { StudentTypeOrmRepository } from '../infrastructure/persistence/typeorm/repositories/student.typeorm-repository';
import { STUDENT_REPOSITORY } from '../domain/repositories/student.repository';

import { AuthModule } from './auth.module';

@Module({
  imports: [TypeOrmModule.forFeature([StudentOrmEntity]), AuthModule],
  controllers: [StudentsController],
  providers: [
    // Use Cases
    UploadStudentsUseCase,
    GetStudentsUseCase,
    GetStudentStatsUseCase,

    // Repository implementation (Dependency Injection)
    {
      provide: STUDENT_REPOSITORY,
      useClass: StudentTypeOrmRepository,
    },
  ],
})
export class StudentsModule {}
