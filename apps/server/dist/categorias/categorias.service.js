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
exports.CategoriasService = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("mongoose");
const categoria_entity_1 = require("./entities/categoria.entity");
const mongoose_2 = require("@nestjs/mongoose");
let CategoriasService = class CategoriasService {
    constructor(categoriaModel) {
        this.categoriaModel = categoriaModel;
    }
    findAllCategories() {
        return this.categoriaModel.find().exec();
    }
    findOneCategorie(id) {
        return this.categoriaModel.findOne({ _id: id }).exec();
    }
    async createCategorie(createCategoriaDto) {
        const { nombre } = createCategoriaDto;
        const nombreLowerCase = nombre.toLowerCase();
        const existingCategoria = await this.categoriaModel.findOne({
            nombre: nombreLowerCase,
        });
        if (existingCategoria) {
            throw new common_1.UnauthorizedException(`Ya existe una categoría con el nombre ${nombre}`);
        }
        const categoria = new this.categoriaModel(Object.assign(Object.assign({}, createCategoriaDto), { nombre: nombreLowerCase }));
        return categoria.save();
    }
    async updateCategorie(id, updateCategoriaDto) {
        const { nombre } = updateCategoriaDto;
        const nombreLowerCase = nombre.toLowerCase();
        const existingCategoria = await this.categoriaModel.findOne({
            nombre: nombreLowerCase,
            _id: { $ne: id },
        });
        if (existingCategoria) {
            throw new common_1.UnauthorizedException(`Ya existe una categoría con el nombre ${nombre}`);
        }
        return this.categoriaModel.findByIdAndUpdate(id, { $set: Object.assign(Object.assign({}, updateCategoriaDto), { nombre: nombreLowerCase }) }, { new: true });
    }
    deleteCategorie(id) {
        return this.categoriaModel.findByIdAndDelete(id).exec();
    }
};
CategoriasService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_2.InjectModel)(categoria_entity_1.Categoria.name)),
    __metadata("design:paramtypes", [mongoose_1.Model])
], CategoriasService);
exports.CategoriasService = CategoriasService;
//# sourceMappingURL=categorias.service.js.map