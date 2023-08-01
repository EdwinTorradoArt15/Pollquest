import { Injectable, ConflictException } from '@nestjs/common';
import { CreateMenuDto } from './dto/create-menu.dto';
import { Menu } from './entities/menu.entity';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

@Injectable()
export class MenuService {
  constructor(
    @InjectModel(Menu.name)
    private menuModel: Model<Menu>,
  ) {}

  async createMenu(createMenuDto: CreateMenuDto) {
    const { icon, name, status } = createMenuDto;

    // Verificar si el menú ya existe
    const existingMenu = await this.menuModel.findOne({ name }).exec();
    if (existingMenu) {
      throw new ConflictException('Ya existe un menú con ese nombre');
    }

    const newMenu = new this.menuModel({
      icon,
      name,
      status,
    });

    await newMenu.save();
    return {
      message: 'Menú creado',
      data: newMenu,
    };
  }
}
