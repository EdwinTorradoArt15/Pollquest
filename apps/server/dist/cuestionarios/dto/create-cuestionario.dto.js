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
exports.CreateCuestionarioDto = exports.PreguntaDto = exports.OpcionDto = void 0;
const swagger_1 = require("@nestjs/swagger");
const class_validator_1 = require("class-validator");
const class_transformer_1 = require("class-transformer");
class OpcionDto {
}
__decorate([
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], OpcionDto.prototype, "nombre", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], OpcionDto.prototype, "descripcion", void 0);
exports.OpcionDto = OpcionDto;
class PreguntaDto {
}
__decorate([
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], PreguntaDto.prototype, "nombre", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], PreguntaDto.prototype, "descripcion", void 0);
__decorate([
    (0, class_validator_1.IsArray)(),
    (0, class_validator_1.IsString)({ each: true }),
    (0, swagger_1.ApiProperty)({
        type: String,
        isArray: true,
        example: ['París', 'Londres', 'Madrid', 'Roma'],
    }),
    __metadata("design:type", Array)
], PreguntaDto.prototype, "opciones", void 0);
exports.PreguntaDto = PreguntaDto;
class CreateCuestionarioDto {
}
__decorate([
    (0, class_validator_1.IsString)(),
    (0, swagger_1.ApiProperty)({ example: 'Cuestionario de prueba' }),
    __metadata("design:type", String)
], CreateCuestionarioDto.prototype, "nombre", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, swagger_1.ApiProperty)({ example: 'Este es un cuestionario de prueba' }),
    __metadata("design:type", String)
], CreateCuestionarioDto.prototype, "descripcion", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, swagger_1.ApiProperty)({ example: '64863d0763544f7ca9b0c55e' }),
    __metadata("design:type", String)
], CreateCuestionarioDto.prototype, "categoria", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, swagger_1.ApiProperty)({ example: 'Opción múltiple' }),
    __metadata("design:type", String)
], CreateCuestionarioDto.prototype, "tipoCuestionario", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    (0, swagger_1.ApiProperty)({ required: false }),
    __metadata("design:type", String)
], CreateCuestionarioDto.prototype, "idUsuario", void 0);
__decorate([
    (0, class_validator_1.IsArray)(),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.ValidateNested)({ each: true }),
    (0, class_transformer_1.Type)(() => PreguntaDto),
    (0, swagger_1.ApiProperty)({
        type: [PreguntaDto],
        example: [
            {
                nombre: 'Pregunta 1',
                descripcion: '¿Cuál es la capital de Francia?',
                opciones: ['París', 'Londres', 'Madrid', 'Roma'],
            },
            {
                nombre: 'Pregunta 2',
                descripcion: '¿Cuál es el color del cielo?',
                opciones: ['Azul', 'Verde', 'Rojo', 'Amarillo'],
            },
        ],
    }),
    __metadata("design:type", Array)
], CreateCuestionarioDto.prototype, "preguntas", void 0);
exports.CreateCuestionarioDto = CreateCuestionarioDto;
//# sourceMappingURL=create-cuestionario.dto.js.map