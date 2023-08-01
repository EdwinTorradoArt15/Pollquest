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
import { Permission } from './entities/permissions.entity';
import { Model } from 'mongoose';
import { CreatePermissionDto } from './dto/create-permission.dto';
import { UpdatePermissionDto } from './dto/update-permission.dto';
import { Types } from 'mongoose';
export declare class PermissionsService {
    private permissionsModel;
    constructor(permissionsModel: Model<Permission>);
    getAll(): Promise<Omit<import("mongoose").Document<unknown, {}, Permission> & Omit<Permission & {
        _id: Types.ObjectId;
    }, never>, never>[]>;
    createPermission(createPermissionDto: CreatePermissionDto): Promise<import("mongoose").Document<unknown, {}, Permission> & Omit<Permission & {
        _id: Types.ObjectId;
    }, never>>;
    updatePermission(id: Types.ObjectId, updatePermissionDto: UpdatePermissionDto): Promise<import("mongoose").Document<unknown, {}, Permission> & Omit<Permission & {
        _id: Types.ObjectId;
    }, never>>;
    deletePermission(id: string): Promise<import("mongoose").Document<unknown, {}, Permission> & Omit<Permission & {
        _id: Types.ObjectId;
    }, never>>;
}
