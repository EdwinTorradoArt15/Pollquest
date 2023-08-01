import { Controller, UseGuards, Get} from '@nestjs/common';
import { JwtAuthGuard } from 'src/usuarios/jwt-auth-guards';
import { PermissionsService } from './permissions.service';

@Controller('permissions')
@UseGuards(JwtAuthGuard)
export class PermissionsController {
  constructor(private readonly permissionsService: PermissionsService) {}

  @Get()
  getAll() {
    return this.permissionsService.getAll();
  }
}
