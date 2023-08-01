import {
  Controller,
  UseGuards,
  Get,
  Post,
  Patch,
  Delete,
  Body,
  Param,
} from '@nestjs/common';
import { JwtAuthGuard } from 'src/usuarios/jwt-auth-guards';
import { RolesService } from './roles.service';
import { CreateRolesDto } from './dto/create-roles.dto';
import { UpdateRolesDto } from './dto/update-roles.dto';

@Controller('roles')
@UseGuards(JwtAuthGuard)
export class RolesController {
  constructor(private readonly rolesService: RolesService) {}

  @Get()
  getRoles() {
    return this.rolesService.getRoles();
  }

  @Post()
  createRole(@Body() createRoleDto: CreateRolesDto) {
    return this.rolesService.createRole(createRoleDto);
  }

  @Patch(':id')
  updateRole(@Param('id') id: string, @Body() updateRoleDto: UpdateRolesDto) {
    return this.rolesService.updateRole(id, updateRoleDto);
  }

  @Delete(':id')
  deleteRole(@Param('id') id: string) {
    return this.rolesService.deleteRole(id);
  }
}
