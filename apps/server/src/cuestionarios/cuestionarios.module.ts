import { Module } from '@nestjs/common';
import { CuestionariosService } from './cuestionarios.service';
import { CuestionariosController } from './cuestionarios.controller';
import { CuestionarioSchema } from './entities/cuestionario.entity';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  controllers: [CuestionariosController],
  providers: [CuestionariosService],
  imports: [
    MongooseModule.forFeature([{ name: 'Cuestionario', schema: CuestionarioSchema }]),
  ],
})
export class CuestionariosModule { }
