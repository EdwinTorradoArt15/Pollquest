/// <reference types="multer" />
/// <reference types="mongoose/types/aggregate" />
/// <reference types="mongoose/types/callback" />
/// <reference types="mongoose/types/collection" />
/// <reference types="mongoose/types/connection" />
/// <reference types="mongoose/types/cursor" />
/// <reference types="mongoose/types/document" />
/// <reference types="mongoose/types/error" />
/// <reference types="mongoose/types/expressions" />
/// <reference types="mongoose/types/helpers" />
/// <reference types="mongoose/types/middlewares" />
/// <reference types="mongoose/types/indexes" />
/// <reference types="mongoose/types/models" />
/// <reference types="mongoose/types/mongooseoptions" />
/// <reference types="mongoose/types/pipelinestage" />
/// <reference types="mongoose/types/populate" />
/// <reference types="mongoose/types/query" />
/// <reference types="mongoose/types/schemaoptions" />
/// <reference types="mongoose/types/schematypes" />
/// <reference types="mongoose/types/session" />
/// <reference types="mongoose/types/types" />
/// <reference types="mongoose/types/utility" />
/// <reference types="mongoose/types/validation" />
/// <reference types="mongoose/types/virtuals" />
/// <reference types="mongoose" />
/// <reference types="mongoose/types/inferschematype" />
import { CategoriasService } from './categorias.service';
import { CreateCategoriaDto } from './dto/create-categoria.dto';
import { UpdateCategoriaDto } from './dto/update-categoria.dto';
import { Categoria } from './entities/categoria.entity';
export declare class CategoriasController {
    private readonly categoriasService;
    constructor(categoriasService: CategoriasService);
    findAllCategories(): Promise<(import("mongoose").Document<unknown, {}, Categoria> & Omit<Categoria & {
        _id: import("mongoose").Types.ObjectId;
    }, never>)[]>;
    findOneCategorie(id: string): Promise<import("mongoose").Document<unknown, {}, Categoria> & Omit<Categoria & {
        _id: import("mongoose").Types.ObjectId;
    }, never>>;
    createCategorie(file: Express.Multer.File, createCategoriaDto: CreateCategoriaDto): Promise<import("mongoose").Document<unknown, {}, Categoria> & Omit<Categoria & {
        _id: import("mongoose").Types.ObjectId;
    }, never>>;
    updateCategoria(id: string, file: Express.Multer.File, updateCategoriaDto: UpdateCategoriaDto): Promise<import("mongoose").Document<unknown, {}, Categoria> & Omit<Categoria & {
        _id: import("mongoose").Types.ObjectId;
    }, never>>;
    deleteCategorie(id: string): Promise<import("mongoose").Document<unknown, {}, Categoria> & Omit<Categoria & {
        _id: import("mongoose").Types.ObjectId;
    }, never>>;
}
