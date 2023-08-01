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
exports.RolesService = void 0;
const common_1 = require("@nestjs/common");
const roles_entity_1 = require("./entities/roles.entity");
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
let RolesService = class RolesService {
    constructor(rolModel) {
        this.rolModel = rolModel;
    }
    async getRoles() {
        const roles = await this.rolModel.find().exec();
        return {
            message: 'Lista de roles',
            data: roles,
        };
    }
    async createRole(createRoleDto) {
        const { name } = createRoleDto;
        const verifyRol = await this.rolModel.findOne({ name }).exec();
        if (verifyRol) {
            throw new common_1.ConflictException('El rol ya existe');
        }
        const newRol = new this.rolModel({
            name,
            status: true,
        });
        await newRol.save();
        return {
            message: 'Rol creado',
            data: newRol,
        };
    }
    async updateRole(id, updateRoleDto) {
        const { name, status } = updateRoleDto;
        const existingRol = await this.rolModel.findById(id).exec();
        if (!existingRol) {
            throw new common_1.NotFoundException('Rol no encontrado');
        }
        if (name) {
            const verifyRol = await this.rolModel.findOne({ name }).exec();
            if (verifyRol && verifyRol._id.toString() !== id) {
                throw new common_1.ConflictException('El nombre del rol ya existe');
            }
            existingRol.name = name;
        }
        existingRol.status = status;
        await existingRol.save();
        return {
            message: 'Rol actualizado',
            data: existingRol,
        };
    }
    async deleteRole(id) {
        const existingRol = await this.rolModel.findById(id).exec();
        if (!existingRol) {
            throw new common_1.NotFoundException('Rol no encontrado');
        }
        existingRol.status = false;
        await existingRol.save();
        return {
            message: 'Rol eliminado (estado cambiado a false)',
            data: existingRol,
        };
    }
};
RolesService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)(roles_entity_1.Rol.name)),
    __metadata("design:paramtypes", [mongoose_2.Model])
], RolesService);
exports.RolesService = RolesService;
//# sourceMappingURL=roles.service.js.map