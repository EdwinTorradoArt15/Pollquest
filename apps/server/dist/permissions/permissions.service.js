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
exports.PermissionsService = void 0;
const common_1 = require("@nestjs/common");
const permissions_entity_1 = require("./entities/permissions.entity");
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
let PermissionsService = class PermissionsService {
    constructor(permissionsModel) {
        this.permissionsModel = permissionsModel;
    }
    async getAll() {
        return await this.permissionsModel.find().populate('menu').exec();
    }
    async createPermission(createPermissionDto) {
        const newPermission = new this.permissionsModel(createPermissionDto);
        return await newPermission.save();
    }
    async updatePermission(id, updatePermissionDto) {
        const permission = await this.permissionsModel.findById(id).exec();
        if (!permission) {
            throw new common_1.ConflictException('El permiso no existe');
        }
        const { menu, name, url, status } = updatePermissionDto;
        if (menu) {
            permission.menu = menu;
        }
        if (name) {
            permission.name = name;
        }
        if (url) {
            permission.url = url;
        }
        if (status !== undefined) {
            permission.status = status;
        }
        try {
            const updatedPermission = await permission.save();
            return updatedPermission;
        }
        catch (error) {
            throw new common_1.ConflictException('Error al actualizar el permiso');
        }
    }
    async deletePermission(id) {
        const permission = await this.permissionsModel.findById(id).exec();
        if (!permission) {
            throw new common_1.ConflictException('El permiso no existe');
        }
        permission.status = false;
        try {
            const updatedPermission = await permission.save();
            return updatedPermission;
        }
        catch (error) {
            throw new common_1.ConflictException('Error al cambiar el estado del permiso');
        }
    }
};
PermissionsService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)(permissions_entity_1.Permission.name)),
    __metadata("design:paramtypes", [mongoose_2.Model])
], PermissionsService);
exports.PermissionsService = PermissionsService;
//# sourceMappingURL=permissions.service.js.map