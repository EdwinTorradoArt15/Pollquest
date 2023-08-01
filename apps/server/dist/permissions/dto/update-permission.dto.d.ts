import { Types } from 'mongoose';
export declare class UpdatePermissionDto {
    menu: Types.ObjectId;
    name: string;
    url: string;
    status: boolean;
}
