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
import { CreateMenuDto } from './dto/create-menu.dto';
import { UpdateMenuDto } from './dto/update-menu.dto';
import { MenuService } from './menu.service';
export declare class MenuController {
    private readonly menuService;
    constructor(menuService: MenuService);
    getMenus(): Promise<{
        message: string;
        data: (import("mongoose").Document<unknown, {}, import("./entities/menu.entity").Menu> & Omit<import("./entities/menu.entity").Menu & {
            _id: import("mongoose").Types.ObjectId;
        }, never>)[];
    }>;
    createMenu(createMenuDto: CreateMenuDto): Promise<{
        message: string;
        data: import("mongoose").Document<unknown, {}, import("./entities/menu.entity").Menu> & Omit<import("./entities/menu.entity").Menu & {
            _id: import("mongoose").Types.ObjectId;
        }, never>;
    }>;
    updateMenu(id: string, updateMenuDto: UpdateMenuDto): Promise<{
        message: string;
        data: import("mongoose").Document<unknown, {}, import("./entities/menu.entity").Menu> & Omit<import("./entities/menu.entity").Menu & {
            _id: import("mongoose").Types.ObjectId;
        }, never>;
    }>;
    deleteMenu(id: string): Promise<import("mongoose").Document<unknown, {}, import("./entities/menu.entity").Menu> & Omit<import("./entities/menu.entity").Menu & {
        _id: import("mongoose").Types.ObjectId;
    }, never>>;
}
