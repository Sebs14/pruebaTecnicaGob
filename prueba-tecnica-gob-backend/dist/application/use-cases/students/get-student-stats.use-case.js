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
exports.GetStudentStatsUseCase = void 0;
const common_1 = require("@nestjs/common");
const student_repository_1 = require("../../../domain/repositories/student.repository");
let GetStudentStatsUseCase = class GetStudentStatsUseCase {
    studentRepository;
    constructor(studentRepository) {
        this.studentRepository = studentRepository;
    }
    async execute() {
        const [totalStudents, activeStudents, graduatedStudents, averageScore, byGender, byYear,] = await Promise.all([
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
};
exports.GetStudentStatsUseCase = GetStudentStatsUseCase;
exports.GetStudentStatsUseCase = GetStudentStatsUseCase = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, common_1.Inject)(student_repository_1.STUDENT_REPOSITORY)),
    __metadata("design:paramtypes", [Object])
], GetStudentStatsUseCase);
//# sourceMappingURL=get-student-stats.use-case.js.map