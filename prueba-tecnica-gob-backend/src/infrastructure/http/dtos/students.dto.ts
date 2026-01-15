// Infrastructure Layer - DTOs for validation
import {
  IsOptional,
  IsString,
  IsArray,
  ValidateNested,
  IsNumber,
  IsBoolean,
} from 'class-validator';
import { Type } from 'class-transformer';

export class GetStudentsQueryDto {
  @IsOptional()
  @IsString()
  page?: string;

  @IsOptional()
  @IsString()
  limit?: string;

  @IsOptional()
  @IsString()
  search?: string;

  @IsOptional()
  @IsString()
  graduado?: string;
}

export class StudentUploadRowDto {
  nombre_estudiante: string;
  anio_inicio: number;
  nue: string | number;
  genero?: string;
  promedio_actual: number;
  graduado?: boolean;
  promedio_graduacion?: number;
}

export class BulkUploadDto {
  @IsArray()
  students: StudentUploadRowDto[];
}
