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
exports.StudentTypeOrmRepository = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const student_orm_entity_1 = require("../entities/student.orm-entity");
let StudentTypeOrmRepository = class StudentTypeOrmRepository {
    repository;
    constructor(repository) {
        this.repository = repository;
    }
    async findById(id) {
        const entity = await this.repository.findOne({ where: { id } });
        return entity ? entity.toDomain() : null;
    }
    async findByNue(nue) {
        const entity = await this.repository.findOne({ where: { nue } });
        return entity ? entity.toDomain() : null;
    }
    async findByName(name) {
        const entity = await this.repository.findOne({
            where: { nombreEstudiante: (0, typeorm_2.ILike)(name.trim()) },
        });
        return entity ? entity.toDomain() : null;
    }
    async findAll(options) {
        const page = options.page ?? 1;
        const limit = options.limit ?? 10;
        const skip = (page - 1) * limit;
        const queryBuilder = this.repository.createQueryBuilder('student');
        if (options.search) {
            queryBuilder.andWhere('(student.nombreEstudiante ILIKE :search OR student.nue ILIKE :search)', { search: `%${options.search}%` });
        }
        if (options.graduado !== undefined) {
            queryBuilder.andWhere('student.graduado = :graduado', {
                graduado: options.graduado,
            });
        }
        const [entities, total] = await queryBuilder
            .orderBy('student.createdAt', 'DESC')
            .skip(skip)
            .take(limit)
            .getManyAndCount();
        return {
            data: entities.map((e) => e.toDomain()),
            total,
            page,
            limit,
            totalPages: Math.ceil(total / limit),
        };
    }
    async save(student) {
        const entity = student_orm_entity_1.StudentOrmEntity.fromDomain(student);
        const saved = await this.repository.save(entity);
        return saved.toDomain();
    }
    async saveMany(students) {
        const entities = students.map((s) => student_orm_entity_1.StudentOrmEntity.fromDomain(s));
        const saved = await this.repository.save(entities);
        return saved.map((e) => e.toDomain());
    }
    async update(student) {
        const entity = student_orm_entity_1.StudentOrmEntity.fromDomain(student);
        const updated = await this.repository.save(entity);
        return updated.toDomain();
    }
    async delete(id) {
        await this.repository.delete(id);
    }
    async count() {
        return this.repository.count();
    }
    async countByGraduado(graduado) {
        return this.repository.count({ where: { graduado } });
    }
    async getAverageScore() {
        const result = await this.repository
            .createQueryBuilder('student')
            .select('AVG(student.promedioActual)', 'avg')
            .getRawOne();
        return result?.avg ? parseFloat(result.avg) : 0;
    }
    async countByGenero() {
        const result = await this.repository
            .createQueryBuilder('student')
            .select('student.genero', 'genero')
            .addSelect('COUNT(*)', 'count')
            .groupBy('student.genero')
            .getRawMany();
        return result.reduce((acc, item) => {
            acc[item.genero] = parseInt(item.count, 10);
            return acc;
        }, {});
    }
    async countByAnioInicio() {
        const result = await this.repository
            .createQueryBuilder('student')
            .select('student.anioInicio', 'anio')
            .addSelect('COUNT(*)', 'count')
            .groupBy('student.anioInicio')
            .orderBy('student.anioInicio', 'ASC')
            .getRawMany();
        return result.reduce((acc, item) => {
            acc[item.anio] = parseInt(item.count, 10);
            return acc;
        }, {});
    }
};
exports.StudentTypeOrmRepository = StudentTypeOrmRepository;
exports.StudentTypeOrmRepository = StudentTypeOrmRepository = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(student_orm_entity_1.StudentOrmEntity)),
    __metadata("design:paramtypes", [typeorm_2.Repository])
], StudentTypeOrmRepository);
//# sourceMappingURL=student.typeorm-repository.js.map