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
exports.GetStudentsUseCase = void 0;
const common_1 = require("@nestjs/common");
const student_repository_1 = require("../../../domain/repositories/student.repository");
let GetStudentsUseCase = class GetStudentsUseCase {
    studentRepository;
    constructor(studentRepository) {
        this.studentRepository = studentRepository;
    }
    async execute(input) {
        const options = {
            page: input.page ?? 1,
            limit: input.limit ?? 10,
            search: input.search,
            graduado: input.graduado,
        };
        return this.studentRepository.findAll(options);
    }
};
exports.GetStudentsUseCase = GetStudentsUseCase;
exports.GetStudentsUseCase = GetStudentsUseCase = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, common_1.Inject)(student_repository_1.STUDENT_REPOSITORY)),
    __metadata("design:paramtypes", [Object])
], GetStudentsUseCase);
//# sourceMappingURL=get-students.use-case.js.map