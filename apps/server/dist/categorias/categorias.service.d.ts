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
/// <reference types="mongoose/types/inferschematype" />
import { Model } from 'mongoose';
import { Categoria } from './entities/categoria.entity';
import { CreateCategoriaDto } from './dto/create-categoria.dto';
import { UpdateCategoriaDto } from './dto/update-categoria.dto';
export declare class CategoriasService {
    private categoriaModel;
    constructor(categoriaModel: Model<Categoria>);
    findAllCategories(): Promise<(import("mongoose").Document<unknown, {}, Categoria> & Omit<Categoria & {
        _id: import("mongoose").Types.ObjectId;
    }, never>)[]>;
    findOneCategorie(id: string): Promise<import("mongoose").Document<unknown, {}, Categoria> & Omit<Categoria & {
        _id: import("mongoose").Types.ObjectId;
    }, never>>;
    createCategorie(createCategoriaDto: CreateCategoriaDto): Promise<import("mongoose").Document<unknown, {}, Categoria> & Omit<Categoria & {
        _id: import("mongoose").Types.ObjectId;
    }, never>>;
    updateCategorie(id: string, updateCategoriaDto: UpdateCategoriaDto): Promise<import("mongoose").Document<unknown, {}, Categoria> & Omit<Categoria & {
        _id: import("mongoose").Types.ObjectId;
    }, never>>;
    deleteCategorie(id: string): Promise<import("mongoose").Document<unknown, {}, Categoria> & Omit<Categoria & {
        _id: import("mongoose").Types.ObjectId;
    }, never>>;
}
