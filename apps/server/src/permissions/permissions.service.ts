import { Injectable, ConflictException } from '@nestjs/common';
import { Permission } from './entities/permissions.entity';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreatePermissionDto } from './dto/create-permission.dto';
import { UpdatePermissionDto } from './dto/update-permission.dto';
import { Types } from 'mongoose';

@Injectable()
export class PermissionsService {
  constructor(
    @InjectModel(Permission.name)
    private permissionsModel: Model<Permission>,
  ) {}

  async getAll() {
    return await this.permissionsModel.find().populate('menu').exec();
  }

  async createPermission(createPermissionDto: CreatePermissionDto) {
    const newPermission = new this.permissionsModel(createPermissionDto);
    return await newPermission.save();
  }

  async updatePermission(
    id: Types.ObjectId,
    updatePermissionDto: UpdatePermissionDto,
  ) {
    const permission = await this.permissionsModel.findById(id).exec();
    if (!permission) {
      throw new ConflictException('El permiso no existe');
    }

    const { menu, name, url, status } = updatePermissionDto;
    if (menu) {
      permission.menu = menu;
    }
    if (name) {
      permission.name = name;
    }
    if (url) {
      permission.url = url;
    }
    if (status !== undefined) {
      permission.status = status;
    }

    try {
      const updatedPermission = await permission.save();
      return updatedPermission;
    } catch (error) {
      throw new ConflictException('Error al actualizar el permiso');
    }
  }

  async deletePermission(id: string) {
    const permission = await this.permissionsModel.findById(id).exec();
    if (!permission) {
      throw new ConflictException('El permiso no existe');
    }

    permission.status = false;

    try {
      const updatedPermission = await permission.save();
      return updatedPermission;
    } catch (error) {
      throw new ConflictException('Error al cambiar el estado del permiso');
    }
  }
}
