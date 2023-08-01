import { CreateRolesDto } from './dto/create-roles.dto';
import { Rol } from './entities/roles.entity';
import { Model } from 'mongoose';
import { UpdateRolesDto } from './dto/update-roles.dto';
export declare class RolesService {
    private rolModel;
    constructor(rolModel: Model<Rol>);
    getRoles(): Promise<{
        message: string;
        data: (import("mongoose").Document<unknown, {}, Rol> & Omit<Rol & {
            _id: import("mongoose").Types.ObjectId;
        }, never>)[];
    }>;
    createRole(createRoleDto: CreateRolesDto): Promise<{
        message: string;
        data: import("mongoose").Document<unknown, {}, Rol> & Omit<Rol & {
            _id: import("mongoose").Types.ObjectId;
        }, never>;
    }>;
    updateRole(id: string, updateRoleDto: UpdateRolesDto): Promise<{
        message: string;
        data: import("mongoose").Document<unknown, {}, Rol> & Omit<Rol & {
            _id: import("mongoose").Types.ObjectId;
        }, never>;
    }>;
    deleteRole(id: string): Promise<{
        message: string;
        data: import("mongoose").Document<unknown, {}, Rol> & Omit<Rol & {
            _id: import("mongoose").Types.ObjectId;
        }, never>;
    }>;
}
