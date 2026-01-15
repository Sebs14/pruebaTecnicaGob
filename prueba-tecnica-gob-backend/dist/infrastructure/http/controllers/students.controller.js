"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.StudentsController = void 0;
const common_1 = require("@nestjs/common");
const platform_express_1 = require("@nestjs/platform-express");
const XLSX = __importStar(require("xlsx"));
const upload_students_use_case_1 = require("../../../application/use-cases/students/upload-students.use-case");
const get_students_use_case_1 = require("../../../application/use-cases/students/get-students.use-case");
const get_student_stats_use_case_1 = require("../../../application/use-cases/students/get-student-stats.use-case");
const jwt_auth_guard_1 = require("../guards/jwt-auth.guard");
const students_dto_1 = require("../dtos/students.dto");
let StudentsController = class StudentsController {
    uploadStudentsUseCase;
    getStudentsUseCase;
    getStudentStatsUseCase;
    constructor(uploadStudentsUseCase, getStudentsUseCase, getStudentStatsUseCase) {
        this.uploadStudentsUseCase = uploadStudentsUseCase;
        this.getStudentsUseCase = getStudentsUseCase;
        this.getStudentStatsUseCase = getStudentStatsUseCase;
    }
    async getStudents(query) {
        return this.getStudentsUseCase.execute({
            page: query.page ? parseInt(query.page, 10) : 1,
            limit: query.limit ? parseInt(query.limit, 10) : 10,
            search: query.search,
            graduado: query.graduado !== undefined ? query.graduado === 'true' : undefined,
        });
    }
    async getStats() {
        return this.getStudentStatsUseCase.execute();
    }
    async bulkUploadJson(body) {
        if (!body.students || body.students.length === 0) {
            throw new common_1.BadRequestException('No se proporcionaron estudiantes');
        }
        const normalizedRows = body.students.map((row) => ({
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
    async bulkUpload(file) {
        try {
            const workbook = XLSX.read(file.buffer, { type: 'buffer' });
            const sheetName = workbook.SheetNames[0];
            const sheet = workbook.Sheets[sheetName];
            const rows = XLSX.utils.sheet_to_json(sheet);
            if (rows.length === 0) {
                throw new common_1.BadRequestException('El archivo está vacío');
            }
            const normalizedRows = rows.map((row) => ({
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
        }
        catch (error) {
            if (error instanceof common_1.BadRequestException) {
                throw error;
            }
            throw new common_1.BadRequestException('Error al procesar el archivo');
        }
    }
    parseBoolean(value) {
        if (typeof value === 'boolean')
            return value;
        if (typeof value === 'string') {
            return ['true', 'si', 'sí', '1', 'yes'].includes(value.toLowerCase());
        }
        if (typeof value === 'number')
            return value === 1;
        return false;
    }
};
exports.StudentsController = StudentsController;
__decorate([
    (0, common_1.Get)(),
    __param(0, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [students_dto_1.GetStudentsQueryDto]),
    __metadata("design:returntype", Promise)
], StudentsController.prototype, "getStudents", null);
__decorate([
    (0, common_1.Get)('stats'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], StudentsController.prototype, "getStats", null);
__decorate([
    (0, common_1.Post)('bulk'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [students_dto_1.BulkUploadDto]),
    __metadata("design:returntype", Promise)
], StudentsController.prototype, "bulkUploadJson", null);
__decorate([
    (0, common_1.Post)('bulk/file'),
    (0, common_1.UseInterceptors)((0, platform_express_1.FileInterceptor)('file')),
    __param(0, (0, common_1.UploadedFile)(new common_1.ParseFilePipe({
        validators: [
            new common_1.FileTypeValidator({
                fileType: /(text\/csv|application\/vnd\.ms-excel|application\/vnd\.openxmlformats-officedocument\.spreadsheetml\.sheet)/,
            }),
        ],
        fileIsRequired: true,
    }))),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], StudentsController.prototype, "bulkUpload", null);
exports.StudentsController = StudentsController = __decorate([
    (0, common_1.Controller)('students'),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    __metadata("design:paramtypes", [upload_students_use_case_1.UploadStudentsUseCase,
        get_students_use_case_1.GetStudentsUseCase,
        get_student_stats_use_case_1.GetStudentStatsUseCase])
], StudentsController);
//# sourceMappingURL=students.controller.js.map