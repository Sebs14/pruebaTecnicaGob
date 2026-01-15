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
var StudentOrmEntity_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.StudentOrmEntity = void 0;
const typeorm_1 = require("typeorm");
const student_entity_1 = require("../../../../domain/entities/student.entity");
let StudentOrmEntity = StudentOrmEntity_1 = class StudentOrmEntity {
    id;
    nombreEstudiante;
    anioInicio;
    nue;
    genero;
    promedioActual;
    graduado;
    promedioGraduacion;
    createdAt;
    updatedAt;
    toDomain() {
        return new student_entity_1.Student(this.id, this.nombreEstudiante, this.anioInicio, this.nue, this.genero, Number(this.promedioActual), this.graduado, this.promedioGraduacion ? Number(this.promedioGraduacion) : null, this.createdAt, this.updatedAt);
    }
    static fromDomain(student) {
        const entity = new StudentOrmEntity_1();
        entity.id = student.id;
        entity.nombreEstudiante = student.nombreEstudiante;
        entity.anioInicio = student.anioInicio;
        entity.nue = student.nue;
        entity.genero = student.genero;
        entity.promedioActual = student.promedioActual;
        entity.graduado = student.graduado;
        entity.promedioGraduacion = student.promedioGraduacion;
        entity.createdAt = student.createdAt;
        entity.updatedAt = student.updatedAt;
        return entity;
    }
};
exports.StudentOrmEntity = StudentOrmEntity;
__decorate([
    (0, typeorm_1.PrimaryColumn)('uuid'),
    __metadata("design:type", String)
], StudentOrmEntity.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'nombre_estudiante' }),
    (0, typeorm_1.Index)(),
    __metadata("design:type", String)
], StudentOrmEntity.prototype, "nombreEstudiante", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'anio_inicio' }),
    __metadata("design:type", Number)
], StudentOrmEntity.prototype, "anioInicio", void 0);
__decorate([
    (0, typeorm_1.Column)({ unique: true }),
    (0, typeorm_1.Index)(),
    __metadata("design:type", String)
], StudentOrmEntity.prototype, "nue", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'enum', enum: student_entity_1.Genero }),
    __metadata("design:type", String)
], StudentOrmEntity.prototype, "genero", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'promedio_actual', type: 'decimal', precision: 4, scale: 2 }),
    __metadata("design:type", Number)
], StudentOrmEntity.prototype, "promedioActual", void 0);
__decorate([
    (0, typeorm_1.Column)({ default: false }),
    __metadata("design:type", Boolean)
], StudentOrmEntity.prototype, "graduado", void 0);
__decorate([
    (0, typeorm_1.Column)({
        name: 'promedio_graduacion',
        type: 'decimal',
        precision: 4,
        scale: 2,
        nullable: true,
    }),
    __metadata("design:type", Object)
], StudentOrmEntity.prototype, "promedioGraduacion", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)({ name: 'created_at' }),
    __metadata("design:type", Date)
], StudentOrmEntity.prototype, "createdAt", void 0);
__decorate([
    (0, typeorm_1.UpdateDateColumn)({ name: 'updated_at' }),
    __metadata("design:type", Date)
], StudentOrmEntity.prototype, "updatedAt", void 0);
exports.StudentOrmEntity = StudentOrmEntity = StudentOrmEntity_1 = __decorate([
    (0, typeorm_1.Entity)('students')
], StudentOrmEntity);
//# sourceMappingURL=student.orm-entity.js.map