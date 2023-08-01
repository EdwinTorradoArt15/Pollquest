import {
  Controller,
  UseGuards,
  Get,
  Post,
  Request,
  Body,
} from '@nestjs/common';
import { JwtAuthGuard } from 'src/usuarios/jwt-auth-guards';
import { CreateMenuDto } from './dto/create-menu.dto';
import { MenuService } from './menu.service';

@Controller('menu')
@UseGuards(JwtAuthGuard)
export class MenuController {
  constructor(private readonly menuService: MenuService) {}

  @Post()
  createMenu(@Body() createMenuDto: CreateMenuDto) {
    return this.menuService.createMenu(createMenuDto);
  }
}
