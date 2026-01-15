"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Genero = exports.Student = void 0;
class Student {
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
    constructor(id, nombreEstudiante, anioInicio, nue, genero, promedioActual, graduado, promedioGraduacion, createdAt, updatedAt) {
        this.id = id;
        this.nombreEstudiante = nombreEstudiante;
        this.anioInicio = anioInicio;
        this.nue = nue;
        this.genero = genero;
        this.promedioActual = promedioActual;
        this.graduado = graduado;
        this.promedioGraduacion = promedioGraduacion;
        this.createdAt = createdAt;
        this.updatedAt = updatedAt;
    }
    static create(props) {
        const promedioGraduacion = props.graduado ? props.promedioActual : null;
        return new Student(crypto.randomUUID(), props.nombreEstudiante.trim(), props.anioInicio, props.nue.trim(), props.genero, props.promedioActual, props.graduado, promedioGraduacion, new Date(), new Date());
    }
    isActive() {
        return !this.graduado;
    }
    getYearsEnrolled() {
        return new Date().getFullYear() - this.anioInicio;
    }
    hasHighPerformance() {
        return this.promedioActual >= 9.0;
    }
}
exports.Student = Student;
var Genero;
(function (Genero) {
    Genero["MASCULINO"] = "masculino";
    Genero["FEMENINO"] = "femenino";
    Genero["OTRO"] = "otro";
    Genero["NO_ESPECIFICADO"] = "no especificado";
})(Genero || (exports.Genero = Genero = {}));
//# sourceMappingURL=student.entity.js.map