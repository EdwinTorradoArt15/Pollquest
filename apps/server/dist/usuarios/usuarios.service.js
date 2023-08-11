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
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UsuariosService = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("mongoose");
const usuario_entity_1 = require("./entities/usuario.entity");
const mongoose_2 = require("@nestjs/mongoose");
const bcrypt = require("bcrypt");
const jwt_1 = require("@nestjs/jwt");
const mailer_1 = require("@nestjs-modules/mailer");
let UsuariosService = class UsuariosService {
    constructor(userModel, jwtService, mailerService) {
        this.userModel = userModel;
        this.jwtService = jwtService;
        this.mailerService = mailerService;
    }
    create(createUsuarioDto) {
        const defaultRole = process.env.ID_ROL_USUARIO;
        return this.userModel.create(Object.assign(Object.assign({}, createUsuarioDto), { clave: bcrypt.hashSync(createUsuarioDto.clave, 10), rol: defaultRole }));
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
    async updateInfoUsuario(id, updateUsuarioDto) {
        const { clave, email } = updateUsuarioDto, rest = __rest(updateUsuarioDto, ["clave", "email"]);
        const existingUser = await this.userModel.findOne({ email });
        if (existingUser && existingUser._id.toString() !== id) {
            throw new common_1.UnauthorizedException('El correo ya está en uso');
        }
        if (clave) {
            const claveHash = bcrypt.hashSync(clave, 10);
            return this.userModel.findByIdAndUpdate(id, {
                $set: Object.assign(Object.assign({}, rest), { clave: claveHash }),
            }, { new: true });
        }
        else {
            return this.userModel.findByIdAndUpdate(id, {
                $set: Object.assign({}, rest),
            }, { new: true });
        }
    }
    updatePerfil(id, updateUsuarioDto) {
        const { imagenPerfilUrl } = updateUsuarioDto;
        return this.userModel.findByIdAndUpdate(id, {
            $set: { imagenPerfilUrl },
        }, { new: true });
    }
    updatePortada(id, updateUsuarioDto) {
        const { imagenPortadaUrl } = updateUsuarioDto;
        return this.userModel.findByIdAndUpdate(id, {
            $set: { imagenPortadaUrl },
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
    async followUser(id, idSeguir) {
        const usuario = await this.userModel.findById(id);
        const usuarioSeguir = await this.userModel.findById(idSeguir);
        if (!usuario || !usuarioSeguir) {
            throw new common_1.UnauthorizedException('Usuario no encontrado');
        }
        if (usuario.seguidores.includes(idSeguir)) {
            throw new common_1.UnauthorizedException('Ya sigues a este usuario');
        }
        usuario.seguidores.push(idSeguir);
        usuarioSeguir.siguiendo.push(id);
        await usuario.save();
        await usuarioSeguir.save();
        return usuario;
    }
    async unfollowUser(id, idSeguir) {
        const usuario = await this.userModel.findById(id);
        const usuarioSeguir = await this.userModel.findById(idSeguir);
        if (!usuario || !usuarioSeguir) {
            throw new common_1.UnauthorizedException('Usuario no encontrado');
        }
        if (!usuario.seguidores.includes(idSeguir)) {
            throw new common_1.UnauthorizedException('No sigues a este usuario');
        }
        usuario.seguidores = usuario.seguidores.filter((userId) => userId.toString() !== idSeguir);
        usuarioSeguir.siguiendo = usuarioSeguir.siguiendo.filter((userId) => userId.toString() !== id);
        await usuario.save();
        await usuarioSeguir.save();
        return usuario;
    }
    async forgotPasswordStep1(email) {
        if (!email) {
            return { error: 'Debe proporcionar un email' };
        }
        const user = await this.userModel.findOne({ email });
        if (!user) {
            throw new common_1.UnauthorizedException('Usuario no encontrado');
        }
        const codigo = this.generateVerificationCode();
        if (email) {
            await this.sendCodeByEmail(email, codigo);
        }
        user.codigoVerificacion = codigo;
        await user.save();
        this.reclaimTimer = setTimeout(async () => {
            user.codigoVerificacion = null;
            await user.save();
        }, 1 * 60 * 1000);
    }
    async forgotPasswordStep2(email, codigo) {
        const user = await this.userModel.findOne({ email });
        if (!user) {
            return {
                message: 'No se encontró ningún usuario con el email',
            };
        }
        if (user.codigoVerificacion !== codigo) {
            return { message: 'Codigo incorrecto' };
        }
        user.codigoVerificacion = null;
        await user.save();
        clearTimeout(this.reclaimTimer);
    }
    async forgotPasswordStep3(email, nuevaClave) {
        const user = await this.userModel.findOne({ email });
        if (!user) {
            return {
                message: 'No se encontró ningún usuario con el email',
            };
        }
        const claveHash = bcrypt.hashSync(nuevaClave, 10);
        user.clave = claveHash;
        await user.save();
    }
    generateVerificationCode() {
        const code = Math.floor(100000 + Math.random() * 900000).toString();
        return code;
    }
    async sendCodeByEmail(email, code) {
        const message = {
            to: email,
            subject: 'Código de verificación',
            text: `Tu código de recuperación de contraseña es: ${code}`,
            html: `
      <div style="background-color: #f5f5f5; padding: 20px;">
      <h2 style="color: #333;">Código de verificación</h2>
      <p>Tu código de recuperación de contraseña es: <strong>${code}</strong></p>
      <p>Utiliza este código para completar el proceso de recuperación de contraseña.</p>
      <p>Si no has solicitado una recuperación de contraseña, puedes ignorar este mensaje.</p>
    </div>
    `,
        };
        await this.mailerService.sendMail(message);
    }
};
UsuariosService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_2.InjectModel)(usuario_entity_1.User.name)),
    __metadata("design:paramtypes", [mongoose_1.Model,
        jwt_1.JwtService,
        mailer_1.MailerService])
], UsuariosService);
exports.UsuariosService = UsuariosService;
//# sourceMappingURL=usuarios.service.js.map