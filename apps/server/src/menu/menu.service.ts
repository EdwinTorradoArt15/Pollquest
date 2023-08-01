import { Injectable, ConflictException } from '@nestjs/common';
import { CreateMenuDto } from './dto/create-menu.dto';
import { UpdateMenuDto } from './dto/update-menu.dto';
import { Menu } from './entities/menu.entity';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

@Injectable()
export class MenuService {
  constructor(
    @InjectModel(Menu.name)
    private menuModel: Model<Menu>,
  ) {}

  async getMenus() {
    const menus = await this.menuModel.find().exec();
    return {
      message: 'Lista de menús',
      data: menus,
    };
  }

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

  async updateMenu(id: string, updateMenuDto: UpdateMenuDto) {
    const menu = await this.menuModel.findById(id).exec();
    if (!menu) {
      throw new ConflictException('El menú no existe');
    }

    const { icon, name, status } = updateMenuDto;
    if (icon) {
      menu.icon = icon;
    }
    if (name) {
      menu.name = name;
    }
    if (status !== undefined) {
      menu.status = status;
    }

    try {
      const updatedMenu = await menu.save();
      return {
        message: 'Menú actualizado',
        data: updatedMenu,
      };
    } catch (error) {
      throw new ConflictException('Error al actualizar el menú');
    }
  }

  async deleteMenu(id: string) {
    const menu = await this.menuModel.findById(id).exec();
    if (!menu) {
      throw new ConflictException('El menú no existe');
    }

    menu.status = false;

    try {
      const deletedMenu = await menu.save();
      return deletedMenu
    } catch (error) {
      throw new ConflictException('Error al eliminar el menú');
    }
  }
}
