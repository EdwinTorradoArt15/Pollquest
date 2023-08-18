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
import { RolesService } from './roles.service';
import { CreateRolesDto } from './dto/create-roles.dto';
import { UpdateRolesDto } from './dto/update-roles.dto';
export declare class RolesController {
    private readonly rolesService;
    constructor(rolesService: RolesService);
    getRoles(): Promise<{
        message: string;
        data: (import("mongoose").Document<unknown, {}, import("./entities/roles.entity").Rol> & Omit<import("./entities/roles.entity").Rol & {
            _id: import("mongoose").Types.ObjectId;
        }, never>)[];
    }>;
    createRole(createRoleDto: CreateRolesDto): Promise<{
        message: string;
        data: import("mongoose").Document<unknown, {}, import("./entities/roles.entity").Rol> & Omit<import("./entities/roles.entity").Rol & {
            _id: import("mongoose").Types.ObjectId;
        }, never>;
    }>;
    updateRole(id: string, updateRoleDto: UpdateRolesDto): Promise<{
        message: string;
        data: import("mongoose").Document<unknown, {}, import("./entities/roles.entity").Rol> & Omit<import("./entities/roles.entity").Rol & {
            _id: import("mongoose").Types.ObjectId;
        }, never>;
    }>;
    deleteRole(id: string): Promise<{
        message: string;
        data: import("mongoose").Document<unknown, {}, import("./entities/roles.entity").Rol> & Omit<import("./entities/roles.entity").Rol & {
            _id: import("mongoose").Types.ObjectId;
        }, never>;
    }>;
}
