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
Object.defineProperty(exports, "__esModule", { value: true });
exports.CuestionarioSchema = exports.Cuestionario = void 0;
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
let Cuestionario = class Cuestionario extends mongoose_2.Document {
};
__decorate([
    (0, mongoose_1.Prop)({ required: true }),
    __metadata("design:type", String)
], Cuestionario.prototype, "nombre", void 0);
__decorate([
    (0, mongoose_1.Prop)({ required: true }),
    __metadata("design:type", String)
], Cuestionario.prototype, "descripcion", void 0);
__decorate([
    (0, mongoose_1.Prop)({ required: true, type: mongoose_2.Schema.Types.ObjectId }),
    __metadata("design:type", String)
], Cuestionario.prototype, "categoria", void 0);
__decorate([
    (0, mongoose_1.Prop)({ required: true }),
    __metadata("design:type", String)
], Cuestionario.prototype, "tipoCuestionario", void 0);
__decorate([
    (0, mongoose_1.Prop)({ required: true, type: mongoose_2.Schema.Types.ObjectId }),
    __metadata("design:type", String)
], Cuestionario.prototype, "idUsuario", void 0);
__decorate([
    (0, mongoose_1.Prop)([{
            nombre: { type: String, required: true },
            descripcion: { type: String, required: true },
            opciones: [{ type: String, required: true }],
        }]),
    __metadata("design:type", Array)
], Cuestionario.prototype, "preguntas", void 0);
Cuestionario = __decorate([
    (0, mongoose_1.Schema)()
], Cuestionario);
exports.Cuestionario = Cuestionario;
exports.CuestionarioSchema = mongoose_1.SchemaFactory.createForClass(Cuestionario);
//# sourceMappingURL=cuestionario.entity.js.map