import { CreateMenuDto } from './dto/create-menu.dto';
import { Menu } from './entities/menu.entity';
import { Model } from 'mongoose';
export declare class MenuService {
    private menuModel;
    constructor(menuModel: Model<Menu>);
    createMenu(createMenuDto: CreateMenuDto): Promise<{
        message: string;
        data: import("mongoose").Document<unknown, {}, Menu> & Omit<Menu & {
            _id: import("mongoose").Types.ObjectId;
        }, never>;
    }>;
}
