"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppModule = void 0;
const common_1 = require("@nestjs/common");
const app_controller_1 = require("./app.controller");
const app_service_1 = require("./app.service");
const serve_static_1 = require("@nestjs/serve-static");
const path_1 = require("path");
const usuarios_module_1 = require("./usuarios/usuarios.module");
const mongoose_1 = require("@nestjs/mongoose");
const config_1 = require("@nestjs/config");
const categorias_module_1 = require("./categorias/categorias.module");
const cuestionarios_module_1 = require("./cuestionarios/cuestionarios.module");
const mailer_1 = require("@nestjs-modules/mailer");
const permissions_module_1 = require("./permissions/permissions.module");
const menu_module_1 = require("./menu/menu.module");
const roles_module_1 = require("./roles/roles.module");
let AppModule = class AppModule {
};
AppModule = __decorate([
    (0, common_1.Module)({
        imports: [
            serve_static_1.ServeStaticModule.forRoot({
                rootPath: (0, path_1.join)(__dirname, '../../', 'client/dist'),
            }),
            config_1.ConfigModule.forRoot(),
            mongoose_1.MongooseModule.forRoot(process.env.MONGO_URI),
            usuarios_module_1.UsuariosModule,
            categorias_module_1.CategoriasModule,
            mailer_1.MailerModule.forRoot({
                transport: {
                    host: process.env.HOST_NODEMAILER,
                    auth: {
                        user: process.env.USER_NODEMAILER,
                        pass: process.env.PASS_NODEMAILER,
                    },
                },
            }),
            cuestionarios_module_1.CuestionariosModule,
            permissions_module_1.PermissionsModule,
            menu_module_1.MenuModule,
            roles_module_1.RolesModule,
        ],
        controllers: [app_controller_1.AppController],
        providers: [app_service_1.AppService],
    })
], AppModule);
exports.AppModule = AppModule;
//# sourceMappingURL=app.module.js.map