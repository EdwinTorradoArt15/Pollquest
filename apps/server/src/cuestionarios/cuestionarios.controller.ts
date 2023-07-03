import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Req, Request } from '@nestjs/common';
import { CuestionariosService } from './cuestionarios.service';
import { CreateCuestionarioDto } from './dto/create-cuestionario.dto';
import { UpdateCuestionarioDto } from './dto/update-cuestionario.dto';
import { JwtAuthGuard } from 'src/usuarios/jwt-auth-guards';
import { ApiBearerAuth } from '@nestjs/swagger';

@Controller('cuestionarios')

@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
export class CuestionariosController {
  constructor(private readonly cuestionariosService: CuestionariosService) { }

  @Post()
  create(@Body() createCuestionarioDto: CreateCuestionarioDto, @Request() req: any) {

    let idUsuario: string = String(req.user._id);
    const cuestionarioCreado: CreateCuestionarioDto = {
      nombre: createCuestionarioDto.nombre,
      descripcion: createCuestionarioDto.descripcion,
      categoria: createCuestionarioDto.categoria,
      tipoCuestionario: createCuestionarioDto.tipoCuestionario,
      preguntas: createCuestionarioDto.preguntas,
      idUsuario: idUsuario,
    };


    return this.cuestionariosService.create(cuestionarioCreado);
  }

  @Get()
  findAll(@Request() req: any) {
    const idUsuario = String(req.user._id);
    return this.cuestionariosService.findCuestionariosByUserId(idUsuario)
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.cuestionariosService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateCuestionarioDto: UpdateCuestionarioDto) {
    return this.cuestionariosService.update(id, updateCuestionarioDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.cuestionariosService.remove(id);
  }
}
