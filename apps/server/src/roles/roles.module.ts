import { Module } from '@nestjs/common';
import { RolesController } from './roles.controller';
import { RolesService } from './roles.service';
import { RolSchema } from './entities/roles.entity';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  controllers: [RolesController],
  providers: [RolesService],
  imports: [MongooseModule.forFeature([{ name: 'Rol', schema: RolSchema }])],
})
export class RolesModule {}
