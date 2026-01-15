// Infrastructure Layer - HTTP Controller
import {
  Controller,
  Post,
  Get,
  Query,
  Body,
  UseGuards,
  UseInterceptors,
  UploadedFile,
  BadRequestException,
  ParseFilePipe,
  FileTypeValidator,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import * as XLSX from 'xlsx';
import { UploadStudentsUseCase } from '../../../application/use-cases/students/upload-students.use-case';
import { GetStudentsUseCase } from '../../../application/use-cases/students/get-students.use-case';
import { GetStudentStatsUseCase } from '../../../application/use-cases/students/get-student-stats.use-case';
import { JwtAuthGuard } from '../guards/jwt-auth.guard';
import { GetStudentsQueryDto, BulkUploadDto } from '../dtos/students.dto';

@Controller('students')
@UseGuards(JwtAuthGuard)
export class StudentsController {
  constructor(
    private readonly uploadStudentsUseCase: UploadStudentsUseCase,
    private readonly getStudentsUseCase: GetStudentsUseCase,
    private readonly getStudentStatsUseCase: GetStudentStatsUseCase,
  ) {}

  @Get()
  async getStudents(@Query() query: GetStudentsQueryDto) {
    return this.getStudentsUseCase.execute({
      page: query.page ? parseInt(query.page, 10) : 1,
      limit: query.limit ? parseInt(query.limit, 10) : 10,
      search: query.search,
      graduado:
        query.graduado !== undefined ? query.graduado === 'true' : undefined,
    });
  }

  @Get('stats')
  async getStats() {
    return this.getStudentStatsUseCase.execute();
  }

  // Endpoint para recibir datos JSON parseados desde el frontend
  @Post('bulk')
  async bulkUploadJson(@Body() body: BulkUploadDto) {
    if (!body.students || body.students.length === 0) {
      throw new BadRequestException('No se proporcionaron estudiantes');
    }

    const normalizedRows = body.students.map((row: any) => ({
      nombre_estudiante: String(row.nombre_estudiante || '').trim(),
      anio_inicio: parseInt(row.anio_inicio, 10) || 0,
      nue: String(row.nue || '').trim(),
      genero: row.genero
        ? String(row.genero).toLowerCase().trim()
        : 'no especificado',
      promedio_actual: parseFloat(row.promedio_actual) || 0,
      graduado: this.parseBoolean(row.graduado),
      promedio_graduacion: row.promedio_graduacion
        ? parseFloat(row.promedio_graduacion)
        : undefined,
    }));

    return this.uploadStudentsUseCase.execute({ rows: normalizedRows });
  }

  // Endpoint alternativo para subir archivo directamente
  @Post('bulk/file')
  @UseInterceptors(FileInterceptor('file'))
  async bulkUpload(
    @UploadedFile(
      new ParseFilePipe({
        validators: [
          new FileTypeValidator({
            fileType:
              /(text\/csv|application\/vnd\.ms-excel|application\/vnd\.openxmlformats-officedocument\.spreadsheetml\.sheet)/,
          }),
        ],
        fileIsRequired: true,
      }),
    )
    file: Express.Multer.File,
  ) {
    try {
      // Parse the file (CSV or XLSX)
      const workbook = XLSX.read(file.buffer, { type: 'buffer' });
      const sheetName = workbook.SheetNames[0];
      const sheet = workbook.Sheets[sheetName];
      const rows = XLSX.utils.sheet_to_json(sheet);

      if (rows.length === 0) {
        throw new BadRequestException('El archivo está vacío');
      }

      // Map and normalize the data
      const normalizedRows = rows.map((row: any) => ({
        nombre_estudiante: String(row.nombre_estudiante || '').trim(),
        anio_inicio: parseInt(row.anio_inicio, 10) || 0,
        nue: String(row.nue || '').trim(),
        genero: String(row.genero || '')
          .toLowerCase()
          .trim(),
        promedio_actual: parseFloat(row.promedio_actual) || 0,
        graduado: this.parseBoolean(row.graduado),
        promedio_graduacion: row.promedio_graduacion
          ? parseFloat(row.promedio_graduacion)
          : undefined,
      }));

      return this.uploadStudentsUseCase.execute({ rows: normalizedRows });
    } catch (error) {
      if (error instanceof BadRequestException) {
        throw error;
      }
      throw new BadRequestException('Error al procesar el archivo');
    }
  }

  private parseBoolean(value: any): boolean {
    if (typeof value === 'boolean') return value;
    if (typeof value === 'string') {
      return ['true', 'si', 'sí', '1', 'yes'].includes(value.toLowerCase());
    }
    if (typeof value === 'number') return value === 1;
    return false;
  }
}
