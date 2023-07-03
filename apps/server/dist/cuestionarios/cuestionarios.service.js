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
exports.CuestionariosService = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
const cuestionario_entity_1 = require("./entities/cuestionario.entity");
let CuestionariosService = class CuestionariosService {
    constructor(cuestionarioModel) {
        this.cuestionarioModel = cuestionarioModel;
    }
    async create(createCuestionarioDto) {
        const createdCuestionario = new this.cuestionarioModel(createCuestionarioDto);
        return createdCuestionario.save();
    }
    async findAll() {
        return this.cuestionarioModel.find().exec();
    }
    async findOne(id) {
        return this.cuestionarioModel.findById(id).exec();
    }
    async findCuestionariosByUserId(idUsuario) {
        return this.cuestionarioModel.find({ idUsuario: idUsuario }).exec();
    }
    async update(id, updateCuestionarioDto) {
        return this.cuestionarioModel.findByIdAndUpdate(id, updateCuestionarioDto, { new: true }).exec();
    }
    async remove(id) {
        return this.cuestionarioModel.findByIdAndRemove(id).exec();
    }
};
CuestionariosService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)(cuestionario_entity_1.Cuestionario.name)),
    __metadata("design:paramtypes", [mongoose_2.Model])
], CuestionariosService);
exports.CuestionariosService = CuestionariosService;
//# sourceMappingURL=cuestionarios.service.js.map