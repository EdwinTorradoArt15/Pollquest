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
exports.MenuService = void 0;
const common_1 = require("@nestjs/common");
const menu_entity_1 = require("./entities/menu.entity");
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
let MenuService = class MenuService {
    constructor(menuModel) {
        this.menuModel = menuModel;
    }
    async getMenus() {
        const menus = await this.menuModel.find().exec();
        return {
            message: 'Lista de menús',
            data: menus,
        };
    }
    async createMenu(createMenuDto) {
        const { icon, name, status } = createMenuDto;
        const existingMenu = await this.menuModel.findOne({ name }).exec();
        if (existingMenu) {
            throw new common_1.ConflictException('Ya existe un menú con ese nombre');
        }
        const newMenu = new this.menuModel({
            icon,
            name,
            status,
        });
        await newMenu.save();
        return {
            message: 'Menú creado',
            data: newMenu,
        };
    }
    async updateMenu(id, updateMenuDto) {
        const menu = await this.menuModel.findById(id).exec();
        if (!menu) {
            throw new common_1.ConflictException('El menú no existe');
        }
        const { icon, name, status } = updateMenuDto;
        if (icon) {
            menu.icon = icon;
        }
        if (name) {
            menu.name = name;
        }
        if (status !== undefined) {
            menu.status = status;
        }
        try {
            const updatedMenu = await menu.save();
            return {
                message: 'Menú actualizado',
                data: updatedMenu,
            };
        }
        catch (error) {
            throw new common_1.ConflictException('Error al actualizar el menú');
        }
    }
    async deleteMenu(id) {
        const menu = await this.menuModel.findById(id).exec();
        if (!menu) {
            throw new common_1.ConflictException('El menú no existe');
        }
        menu.status = false;
        try {
            const deletedMenu = await menu.save();
            return deletedMenu;
        }
        catch (error) {
            throw new common_1.ConflictException('Error al eliminar el menú');
        }
    }
};
MenuService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)(menu_entity_1.Menu.name)),
    __metadata("design:paramtypes", [mongoose_2.Model])
], MenuService);
exports.MenuService = MenuService;
//# sourceMappingURL=menu.service.js.map