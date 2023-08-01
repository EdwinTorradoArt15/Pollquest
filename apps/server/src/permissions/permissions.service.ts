import { Injectable, ConflictException } from '@nestjs/common';
import { Permission } from './entities/permissions.entity';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

@Injectable()
export class PermissionsService {
  constructor(
    @InjectModel(Permission.name)
    private permissionsModel: Model<Permission>,
  ) {}

  async getAll() {
    return await this.permissionsModel.find().exec();
  }
}
