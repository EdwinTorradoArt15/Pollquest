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
exports.UsuariosService = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("mongoose");
const usuario_entity_1 = require("./entities/usuario.entity");
const mongoose_2 = require("@nestjs/mongoose");
const bcrypt = require("bcrypt");
const jwt_1 = require("@nestjs/jwt");
let UsuariosService = class UsuariosService {
    constructor(userModel, jwtService) {
        this.userModel = userModel;
        this.jwtService = jwtService;
    }
    create(createUsuarioDto) {
        return this.userModel.create(Object.assign(Object.assign({}, createUsuarioDto), { clave: bcrypt.hashSync(createUsuarioDto.clave, 10) }));
    }
    findAll() {
        return this.userModel.find().select('-clave');
    }
    findOne(id) {
        const user = this.userModel.findById(id).select('-clave');
        if (!user) {
            throw new common_1.UnauthorizedException('Usuario no encontrado');
        }
        return user;
    }
    updateUser(id, updateUsuarioDto) {
        const { clave } = updateUsuarioDto;
        const claveHash = bcrypt.hashSync(clave, 10);
        return this.userModel.findByIdAndUpdate(id, {
            $set: Object.assign(Object.assign({}, updateUsuarioDto), { clave: claveHash }),
        }, { new: true });
    }
    remove(id) {
        return `This action removes a #${id} usuario`;
    }
    async validateUser(loginUserDTO) {
        const { email, clave } = loginUserDTO;
        const user = await this.userModel.findOne({ email }).select('email clave');
        if (!user) {
            throw new common_1.UnauthorizedException('Usuario no encontrado');
        }
        const isMatch = bcrypt.compareSync(clave, user.clave);
        if (!isMatch) {
            throw new common_1.UnauthorizedException('Clave incorrecta');
        }
        return user;
    }
    async login(user) {
        const token = await this.createPayload(user);
        return { access_token: token };
    }
    createPayload(user) {
        const payload = { correo: user.email, _id: user._id };
        return this.jwtService.sign(payload);
    }
};
UsuariosService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_2.InjectModel)(usuario_entity_1.User.name)),
    __metadata("design:paramtypes", [mongoose_1.Model,
        jwt_1.JwtService])
], UsuariosService);
exports.UsuariosService = UsuariosService;
//# sourceMappingURL=usuarios.service.js.map