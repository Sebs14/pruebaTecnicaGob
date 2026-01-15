"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UploadStudentsUseCase = void 0;
const common_1 = require("@nestjs/common");
const student_entity_1 = require("../../../domain/entities/student.entity");
const student_repository_1 = require("../../../domain/repositories/student.repository");
let UploadStudentsUseCase = class UploadStudentsUseCase {
    studentRepository;
    constructor(studentRepository) {
        this.studentRepository = studentRepository;
    }
    async execute(input) {
        const errors = [];
        const validStudents = [];
        const seenNues = new Set();
        for (let i = 0; i < input.rows.length; i++) {
            const row = input.rows[i];
            const rowNumber = i + 2;
            const rowErrors = await this.validateRow(row, rowNumber, seenNues);
            if (rowErrors.length > 0) {
                errors.push(...rowErrors);
            }
            else {
                const student = this.mapToStudent(row);
                validStudents.push(student);
                seenNues.add(row.nue);
            }
        }
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
    async validateRow(row, rowNumber, seenNues) {
        const errors = [];
        const currentYear = new Date().getFullYear();
        if (!row.nombre_estudiante || row.nombre_estudiante.trim() === '') {
            errors.push({
                row: rowNumber,
                field: 'nombre_estudiante',
                message: 'El nombre del estudiante es requerido',
            });
        }
        if (!row.anio_inicio) {
            errors.push({
                row: rowNumber,
                field: 'anio_inicio',
                message: 'El año de inicio es requerido',
            });
        }
        else if (row.anio_inicio > currentYear) {
            errors.push({
                row: rowNumber,
                field: 'anio_inicio',
                message: `El año de inicio no puede ser mayor a ${currentYear}`,
            });
        }
        if (!row.nue || row.nue.trim() === '') {
            errors.push({
                row: rowNumber,
                field: 'nue',
                message: 'El NUE es requerido',
            });
        }
        else if (!/^\d+$/.test(row.nue)) {
            errors.push({
                row: rowNumber,
                field: 'nue',
                message: 'El NUE debe ser un número positivo',
            });
        }
        else if (seenNues.has(row.nue)) {
            errors.push({
                row: rowNumber,
                field: 'nue',
                message: 'NUE duplicado en el archivo',
            });
        }
        else {
            const existingByNue = await this.studentRepository.findByNue(row.nue);
            if (existingByNue) {
                errors.push({
                    row: rowNumber,
                    field: 'nue',
                    message: 'Ya existe un estudiante con este NUE',
                });
            }
        }
        const validGeneros = Object.values(student_entity_1.Genero);
        if (!row.genero || !validGeneros.includes(row.genero)) {
            errors.push({
                row: rowNumber,
                field: 'genero',
                message: `Género debe ser: ${validGeneros.join(', ')}`,
            });
        }
        if (row.promedio_actual === undefined || row.promedio_actual === null) {
            errors.push({
                row: rowNumber,
                field: 'promedio_actual',
                message: 'El promedio actual es requerido',
            });
        }
        else if (row.promedio_actual < 0 || row.promedio_actual > 10) {
            errors.push({
                row: rowNumber,
                field: 'promedio_actual',
                message: 'El promedio debe estar entre 0 y 10',
            });
        }
        if (row.graduado === true) {
            if (row.promedio_graduacion !== undefined &&
                row.promedio_graduacion !== row.promedio_actual) {
                errors.push({
                    row: rowNumber,
                    field: 'promedio_graduacion',
                    message: 'El promedio de graduación debe ser igual al promedio actual si está graduado',
                });
            }
        }
        return errors;
    }
    mapToStudent(row) {
        const props = {
            nombreEstudiante: row.nombre_estudiante,
            anioInicio: row.anio_inicio,
            nue: row.nue,
            genero: row.genero,
            promedioActual: row.promedio_actual,
            graduado: row.graduado,
        };
        return student_entity_1.Student.create(props);
    }
};
exports.UploadStudentsUseCase = UploadStudentsUseCase;
exports.UploadStudentsUseCase = UploadStudentsUseCase = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, common_1.Inject)(student_repository_1.STUDENT_REPOSITORY)),
    __metadata("design:paramtypes", [Object])
], UploadStudentsUseCase);
//# sourceMappingURL=upload-students.use-case.js.map