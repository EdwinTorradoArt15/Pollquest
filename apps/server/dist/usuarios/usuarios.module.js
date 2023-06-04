"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UsuariosModule = void 0;
const common_1 = require("@nestjs/common");
const usuarios_service_1 = require("./usuarios.service");
const usuarios_controller_1 = require("./usuarios.controller");
const mongoose_1 = require("@nestjs/mongoose");
const usuario_entity_1 = require("./entities/usuario.entity");
const local_strategy_1 = require("./local.strategy");
const jwt_1 = require("@nestjs/jwt");
const jwt_constans_1 = require("./utils/jwt-constans");
const jwt_strategy_1 = require("./jwt.strategy");
let UsuariosModule = class UsuariosModule {
};
UsuariosModule = __decorate([
    (0, common_1.Module)({
        imports: [
            mongoose_1.MongooseModule.forFeature([{ name: 'User', schema: usuario_entity_1.UserSchema }]),
            jwt_1.JwtModule.register({
                global: true,
                secret: jwt_constans_1.jwtConstants.secret,
                signOptions: { expiresIn: '1d' },
            }),
        ],
        controllers: [usuarios_controller_1.UsuariosController],
        providers: [usuarios_service_1.UsuariosService, local_strategy_1.LocalStrategy, jwt_strategy_1.JwtStrategy],
    })
], UsuariosModule);
exports.UsuariosModule = UsuariosModule;
//# sourceMappingURL=usuarios.module.js.map