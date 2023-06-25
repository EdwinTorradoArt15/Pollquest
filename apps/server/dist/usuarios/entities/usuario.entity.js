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
exports.UserSchema = exports.User = void 0;
const mongoose_1 = require("mongoose");
const mongoose_2 = require("@nestjs/mongoose");
const swagger_1 = require("@nestjs/swagger");
let User = class User extends mongoose_1.Document {
};
__decorate([
    (0, swagger_1.ApiProperty)({
        example: 'Cristiano ',
    }),
    (0, mongoose_2.Prop)({ required: true }),
    __metadata("design:type", String)
], User.prototype, "nombre", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'Ronaldo' }),
    (0, mongoose_2.Prop)({ required: true }),
    __metadata("design:type", String)
], User.prototype, "apellido", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: '3112123123' }),
    (0, mongoose_2.Prop)({ required: true }),
    __metadata("design:type", String)
], User.prototype, "celular", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'victorbond@email.com' }),
    (0, mongoose_2.Prop)({ required: true, unique: true }),
    __metadata("design:type", String)
], User.prototype, "email", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: '123456' }),
    (0, mongoose_2.Prop)({ required: true }),
    __metadata("design:type", String)
], User.prototype, "clave", void 0);
__decorate([
    (0, mongoose_2.Prop)(),
    __metadata("design:type", String)
], User.prototype, "descripcion", void 0);
__decorate([
    (0, mongoose_2.Prop)(),
    __metadata("design:type", String)
], User.prototype, "imagenPerfilUrl", void 0);
__decorate([
    (0, mongoose_2.Prop)(),
    __metadata("design:type", String)
], User.prototype, "imagenPortadaUrl", void 0);
User = __decorate([
    (0, mongoose_2.Schema)()
], User);
exports.User = User;
exports.UserSchema = mongoose_2.SchemaFactory.createForClass(User);
//# sourceMappingURL=usuario.entity.js.map