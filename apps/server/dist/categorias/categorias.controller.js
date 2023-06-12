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
exports.CategoriasController = void 0;
const common_1 = require("@nestjs/common");
const categorias_service_1 = require("./categorias.service");
const create_categoria_dto_1 = require("./dto/create-categoria.dto");
const update_categoria_dto_1 = require("./dto/update-categoria.dto");
const categoria_entity_1 = require("./entities/categoria.entity");
const swagger_1 = require("@nestjs/swagger");
const platform_express_1 = require("@nestjs/platform-express");
const multer_1 = require("multer");
const images_helpers_1 = require("./helpers/images.helpers");
const cloudinary_1 = require("cloudinary");
let CategoriasController = class CategoriasController {
    constructor(categoriasService) {
        this.categoriasService = categoriasService;
    }
    findAllCategories() {
        return this.categoriasService.findAllCategories();
    }
    async createCategorie(file, createCategoriaDto) {
        cloudinary_1.v2.config({
            cloud_name: process.env.CLOUD_NAME,
            api_key: process.env.API_KEY,
            api_secret: process.env.API_SECRET,
        });
        if (file) {
            const uploadedImage = await cloudinary_1.v2.uploader.upload(file.path);
            createCategoriaDto.imagenUrl = uploadedImage.secure_url;
        }
        const categoria = await this.categoriasService.createCategorie(createCategoriaDto);
        return categoria;
    }
    async updateCategoria(id, file, updateCategoriaDto) {
        cloudinary_1.v2.config({
            cloud_name: process.env.CLOUD_NAME,
            api_key: process.env.API_KEY,
            api_secret: process.env.API_SECRET,
        });
        if (file) {
            const uploadedImage = await cloudinary_1.v2.uploader.upload(file.path);
            updateCategoriaDto.imagenUrl = uploadedImage.secure_url;
        }
        const categoria = await this.categoriasService.updateCategorie(id, updateCategoriaDto);
        return categoria;
    }
    deleteCategorie(id) {
        return this.categoriasService.deleteCategorie(id);
    }
};
__decorate([
    (0, swagger_1.ApiResponse)({
        status: 200,
        description: 'Categoria creada correctamente.',
        type: categoria_entity_1.Categoria,
    }),
    (0, swagger_1.ApiResponse)({
        status: 400,
        description: 'Hubo un error y no se pudo crear la categoria.',
    }),
    (0, common_1.Get)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], CategoriasController.prototype, "findAllCategories", null);
__decorate([
    (0, common_1.Post)(),
    (0, common_1.UseInterceptors)((0, platform_express_1.FileInterceptor)('file', {
        storage: (0, multer_1.diskStorage)({
            destination: './uploads',
        }),
        fileFilter: images_helpers_1.fileFilter,
    })),
    __param(0, (0, common_1.UploadedFile)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, create_categoria_dto_1.CreateCategoriaDto]),
    __metadata("design:returntype", Promise)
], CategoriasController.prototype, "createCategorie", null);
__decorate([
    (0, common_1.Patch)(':id'),
    (0, common_1.UseInterceptors)((0, platform_express_1.FileInterceptor)('file', {
        storage: (0, multer_1.diskStorage)({
            destination: './uploads',
        }),
        fileFilter: images_helpers_1.fileFilter,
    })),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.UploadedFile)()),
    __param(2, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object, update_categoria_dto_1.UpdateCategoriaDto]),
    __metadata("design:returntype", Promise)
], CategoriasController.prototype, "updateCategoria", null);
__decorate([
    (0, common_1.Delete)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], CategoriasController.prototype, "deleteCategorie", null);
CategoriasController = __decorate([
    (0, swagger_1.ApiBearerAuth)(),
    (0, swagger_1.ApiTags)('Categorias'),
    (0, common_1.Controller)('categorias'),
    __metadata("design:paramtypes", [categorias_service_1.CategoriasService])
], CategoriasController);
exports.CategoriasController = CategoriasController;
//# sourceMappingURL=categorias.controller.js.map