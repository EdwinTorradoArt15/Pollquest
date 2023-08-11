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
exports.CreateUsuarioDto = void 0;
const class_validator_1 = require("class-validator");
const swagger_1 = require("@nestjs/swagger");
class CreateUsuarioDto {
}
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'nombre', example: 'nombre' }),
    (0, class_validator_1.IsNotEmpty)({ message: 'El nombre es requerido' }),
    __metadata("design:type", String)
], CreateUsuarioDto.prototype, "nombre", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'apellido', example: 'apellido' }),
    (0, class_validator_1.IsNotEmpty)({ message: 'El apellido es requerido' }),
    __metadata("design:type", String)
], CreateUsuarioDto.prototype, "apellido", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'celular', example: 'celular' }),
    (0, class_validator_1.IsNotEmpty)({ message: 'El celular es requerido' }),
    __metadata("design:type", String)
], CreateUsuarioDto.prototype, "celular", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'email', example: 'email' }),
    (0, class_validator_1.IsNotEmpty)({ message: 'El email es requerido' }),
    (0, class_validator_1.IsEmail)({}, { message: 'El email no es válido' }),
    __metadata("design:type", String)
], CreateUsuarioDto.prototype, "email", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'clave', example: 'clave' }),
    (0, class_validator_1.IsNotEmpty)({ message: 'La clave es requerida' }),
    __metadata("design:type", String)
], CreateUsuarioDto.prototype, "clave", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'rol', example: 'ID rol' }),
    __metadata("design:type", String)
], CreateUsuarioDto.prototype, "rol", void 0);
exports.CreateUsuarioDto = CreateUsuarioDto;
//# sourceMappingURL=create-usuario.dto.js.map