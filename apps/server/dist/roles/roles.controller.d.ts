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
