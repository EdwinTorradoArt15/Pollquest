import {
  Controller,
  UseGuards,
  Get,
  Post,
  Body,
  Delete,
  Patch,
  Param,
} from '@nestjs/common';
import { JwtAuthGuard } from 'src/usuarios/jwt-auth-guards';
import { CreatePermissionDto } from './dto/create-permission.dto';
import { UpdatePermissionDto } from './dto/update-permission.dto';
import { PermissionsService } from './permissions.service';
import {Types} from "mongoose"

@Controller('permissions')
@UseGuards(JwtAuthGuard)
export class PermissionsController {
  constructor(private readonly permissionsService: PermissionsService) {}

  @Get()
  getAll() {
    return this.permissionsService.getAll();
  }

  @Post()
  createPermission(@Body() createPermissionDto: CreatePermissionDto) {
    return this.permissionsService.createPermission(createPermissionDto);
  }

  @Patch(':id')
  updatePermission(
    @Param('id') id: Types.ObjectId,
    @Body() updatePermissionDto: UpdatePermissionDto,
  ) {

    return this.permissionsService.updatePermission(id, updatePermissionDto);
  }

  @Delete(":id")
  deletePermission(@Param('id') id: string) {
    console.log("id", id)
    return this.permissionsService.deletePermission(id);
  }
}
