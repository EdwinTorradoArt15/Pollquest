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
exports.UsuariosController = void 0;
const common_1 = require("@nestjs/common");
const usuarios_service_1 = require("./usuarios.service");
const create_usuario_dto_1 = require("./dto/create-usuario.dto");
const update_usuario_dto_1 = require("./dto/update-usuario.dto");
const forgot_password_usuario_dto_1 = require("./dto/forgot-password-usuario.dto");
const login_user_dto_1 = require("./dto/login-user.dto");
const local_auth_guards_1 = require("./local-auth-guards");
const jwt_auth_guards_1 = require("./jwt-auth-guards");
const swagger_1 = require("@nestjs/swagger");
const usuario_entity_1 = require("./entities/usuario.entity");
const cloudinary_service_1 = require("../cloudinary/cloudinary.service");
const platform_express_1 = require("@nestjs/platform-express");
const multer_1 = require("multer");
const images_helpers_1 = require("../categorias/helpers/images.helpers");
let UsuariosController = class UsuariosController {
    constructor(usuariosService) {
        this.usuariosService = usuariosService;
        this.cloudinaryService = new cloudinary_service_1.CloudinaryService();
    }
    create(createUsuarioDto) {
        return this.usuariosService.create(createUsuarioDto);
    }
    login(loginUserDto, req) {
        return this.usuariosService.login(req.user);
    }
    findAll(req) {
        return this.usuariosService.findAll();
    }
    findOne(id) {
        return this.usuariosService.findOne(id);
    }
    async updateInfoUsuario(id, updateUsuarioDto) {
        const user = await this.usuariosService.updateInfoUsuario(id, updateUsuarioDto);
        return user;
    }
    async updatePerfil(id, file, updateUsuarioDto) {
        if (file) {
            updateUsuarioDto.imagenPerfilUrl =
                await this.cloudinaryService.uploadImage(file);
        }
        const user = await this.usuariosService.updatePerfil(id, updateUsuarioDto);
        return user;
    }
    async updatePortada(id, file, updateUsuarioDto) {
        if (file) {
            updateUsuarioDto.imagenPortadaUrl =
                await this.cloudinaryService.uploadImage(file);
        }
        const user = await this.usuariosService.updatePortada(id, updateUsuarioDto);
        return user;
    }
    remove(id) {
        return this.usuariosService.remove(+id);
    }
    followUser(id, req) {
        return this.usuariosService.followUser(id, req.user._id);
    }
    unfollowUser(id, req) {
        return this.usuariosService.unfollowUser(id, req.user._id);
    }
    forgotPasswordStep1(forgotPasswordUsuarioDto) {
        const { email } = forgotPasswordUsuarioDto;
        return this.usuariosService.forgotPasswordStep1(email);
    }
    forgotPasswordStep2(forgotPasswordUsuarioDto) {
        const { email, codigo } = forgotPasswordUsuarioDto;
        return this.usuariosService.forgotPasswordStep2(email, codigo);
    }
    async forgotPasswordStep3(forgotPasswordUsuarioDto) {
        const { email, clave } = forgotPasswordUsuarioDto;
        return this.usuariosService.forgotPasswordStep3(email, clave);
    }
};
__decorate([
    (0, swagger_1.ApiResponse)({
        status: 201,
        description: 'El usuario fue creado exitosamente.',
        type: usuario_entity_1.User,
    }),
    (0, swagger_1.ApiResponse)({
        status: 400,
        description: 'Hubo un error y no se pudo crear el usuario.',
    }),
    (0, common_1.Post)(),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_usuario_dto_1.CreateUsuarioDto]),
    __metadata("design:returntype", void 0)
], UsuariosController.prototype, "create", null);
__decorate([
    (0, common_1.UseGuards)(local_auth_guards_1.LocalAuthGuard),
    (0, common_1.Post)('/login'),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [login_user_dto_1.LoginUserDto, Object]),
    __metadata("design:returntype", void 0)
], UsuariosController.prototype, "login", null);
__decorate([
    (0, common_1.UseGuards)(jwt_auth_guards_1.JwtAuthGuard),
    (0, common_1.Get)(),
    __param(0, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], UsuariosController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], UsuariosController.prototype, "findOne", null);
__decorate([
    (0, common_1.Patch)('info/:id'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, update_usuario_dto_1.UpdateUsuarioDto]),
    __metadata("design:returntype", Promise)
], UsuariosController.prototype, "updateInfoUsuario", null);
__decorate([
    (0, common_1.Patch)('perfil/:id'),
    (0, common_1.UseInterceptors)((0, platform_express_1.FileInterceptor)('perfil', {
        storage: (0, multer_1.diskStorage)({
            destination: './uploads',
        }),
        fileFilter: images_helpers_1.fileFilter,
    })),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.UploadedFile)()),
    __param(2, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object, update_usuario_dto_1.UpdateUsuarioDto]),
    __metadata("design:returntype", Promise)
], UsuariosController.prototype, "updatePerfil", null);
__decorate([
    (0, common_1.Patch)('portada/:id'),
    (0, common_1.UseInterceptors)((0, platform_express_1.FileInterceptor)('portada', {
        storage: (0, multer_1.diskStorage)({
            destination: './uploads',
        }),
        fileFilter: images_helpers_1.fileFilter,
    })),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.UploadedFile)()),
    __param(2, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object, update_usuario_dto_1.UpdateUsuarioDto]),
    __metadata("design:returntype", Promise)
], UsuariosController.prototype, "updatePortada", null);
__decorate([
    (0, common_1.Delete)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], UsuariosController.prototype, "remove", null);
__decorate([
    (0, common_1.Post)('follow/:id'),
    (0, common_1.UseGuards)(jwt_auth_guards_1.JwtAuthGuard),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", void 0)
], UsuariosController.prototype, "followUser", null);
__decorate([
    (0, common_1.Post)('unfollow/:id'),
    (0, common_1.UseGuards)(jwt_auth_guards_1.JwtAuthGuard),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", void 0)
], UsuariosController.prototype, "unfollowUser", null);
__decorate([
    (0, common_1.Patch)('forgot-password/step1'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [forgot_password_usuario_dto_1.ForgotPasswordUsuarioDto]),
    __metadata("design:returntype", void 0)
], UsuariosController.prototype, "forgotPasswordStep1", null);
__decorate([
    (0, common_1.Patch)('forgot-password/step2'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [forgot_password_usuario_dto_1.ForgotPasswordUsuarioDto]),
    __metadata("design:returntype", void 0)
], UsuariosController.prototype, "forgotPasswordStep2", null);
__decorate([
    (0, common_1.Patch)('forgot-password/step3'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [forgot_password_usuario_dto_1.ForgotPasswordUsuarioDto]),
    __metadata("design:returntype", Promise)
], UsuariosController.prototype, "forgotPasswordStep3", null);
UsuariosController = __decorate([
    (0, swagger_1.ApiBearerAuth)(),
    (0, swagger_1.ApiTags)('Usuarios'),
    (0, common_1.Controller)('usuarios'),
    __metadata("design:paramtypes", [usuarios_service_1.UsuariosService])
], UsuariosController);
exports.UsuariosController = UsuariosController;
//# sourceMappingURL=usuarios.controller.js.map