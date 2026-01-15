"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.StudentsModule = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const students_controller_1 = require("../infrastructure/http/controllers/students.controller");
const upload_students_use_case_1 = require("../application/use-cases/students/upload-students.use-case");
const get_students_use_case_1 = require("../application/use-cases/students/get-students.use-case");
const get_student_stats_use_case_1 = require("../application/use-cases/students/get-student-stats.use-case");
const student_orm_entity_1 = require("../infrastructure/persistence/typeorm/entities/student.orm-entity");
const student_typeorm_repository_1 = require("../infrastructure/persistence/typeorm/repositories/student.typeorm-repository");
const student_repository_1 = require("../domain/repositories/student.repository");
const auth_module_1 = require("./auth.module");
let StudentsModule = class StudentsModule {
};
exports.StudentsModule = StudentsModule;
exports.StudentsModule = StudentsModule = __decorate([
    (0, common_1.Module)({
        imports: [typeorm_1.TypeOrmModule.forFeature([student_orm_entity_1.StudentOrmEntity]), auth_module_1.AuthModule],
        controllers: [students_controller_1.StudentsController],
        providers: [
            upload_students_use_case_1.UploadStudentsUseCase,
            get_students_use_case_1.GetStudentsUseCase,
            get_student_stats_use_case_1.GetStudentStatsUseCase,
            {
                provide: student_repository_1.STUDENT_REPOSITORY,
                useClass: student_typeorm_repository_1.StudentTypeOrmRepository,
            },
        ],
    })
], StudentsModule);
//# sourceMappingURL=students.module.js.map