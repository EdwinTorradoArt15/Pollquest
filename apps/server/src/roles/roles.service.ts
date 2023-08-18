import {
  Injectable,
  ConflictException,
  NotFoundException,
} from '@nestjs/common';
import { CreateRolesDto } from './dto/create-roles.dto';
import { Rol } from './entities/roles.entity';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { UpdateRolesDto } from './dto/update-roles.dto';

@Injectable()
export class RolesService {
  constructor(@InjectModel(Rol.name) private rolModel: Model<Rol>) {}

  async getRoles() {
    const roles = await this.rolModel.find().exec();
    return {
      message: 'Lista de roles',
      data: roles,
    };
  }

  async createRole(createRoleDto: CreateRolesDto) {
    const { name, permissions } = createRoleDto;

    const verifyRol = await this.rolModel.findOne({ name }).exec();

    if (verifyRol) {
      throw new ConflictException('El rol ya existe');
    }

    const newRol = new this.rolModel({
      name,
      status: true,
      permissions,
    });

    await newRol.save();
    return {
      message: 'Rol creado',
      data: newRol,
    };
  }

  async updateRole(id: string, updateRoleDto: UpdateRolesDto) {
    const { name, status, permissions } = updateRoleDto;

    const existingRol = await this.rolModel.findById(id).exec();
    if (!existingRol) {
      throw new NotFoundException('Rol no encontrado');
    }

    if (name) {
      const verifyRol = await this.rolModel.findOne({ name }).exec();
      if (verifyRol && verifyRol._id.toString() !== id) {
        throw new ConflictException('El nombre del rol ya existe');
      }
      existingRol.name = name;
    }

    if (permissions && existingRol.permissions.indexOf(permissions) === -1) {
      existingRol.permissions.push(permissions);
    } else {
      throw new ConflictException('El permiso ya está asignado al rol');
    }

    existingRol.status = status;
    await existingRol.save();
    return {
      message: 'Rol actualizado',
      data: existingRol,
    };
  }

  async deleteRole(id: string) {
    const existingRol = await this.rolModel.findById(id).exec();
    if (!existingRol) {
      throw new NotFoundException('Rol no encontrado');
    }

    existingRol.status = false;
    await existingRol.save();

    return {
      message: 'Rol eliminado (estado cambiado a false)',
      data: existingRol,
    };
  }
}
