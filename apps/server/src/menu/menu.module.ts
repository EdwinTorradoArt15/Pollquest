import { Module } from '@nestjs/common';
import { MenuService } from './menu.service';
import { MenuController } from './menu.controller';
import { MenuSchema } from './entities/menu.entity';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  controllers: [MenuController],
  providers: [MenuService],
  imports: [MongooseModule.forFeature([{ name: 'Menu', schema: MenuSchema }])],
})
export class MenuModule {}
