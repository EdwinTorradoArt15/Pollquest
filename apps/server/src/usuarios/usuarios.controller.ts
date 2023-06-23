import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  Req,
  UseInterceptors,
  UploadedFiles,
} from '@nestjs/common';
import { UsuariosService } from './usuarios.service';
import { CreateUsuarioDto } from './dto/create-usuario.dto';
import { UpdateUsuarioDto } from './dto/update-usuario.dto';
import { LoginUserDto } from './dto/login-user.dto';
import { LocalAuthGuard } from './local-auth-guards';
import { JwtAuthGuard } from './jwt-auth-guards';
import { ApiBearerAuth, ApiResponse, ApiTags } from '@nestjs/swagger';
import { User } from './entities/usuario.entity';
import { CloudinaryService } from 'src/cloudinary/cloudinary.service';
import {
  FileFieldsInterceptor,
} from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { fileFilter } from 'src/categorias/helpers/images.helpers';

@ApiBearerAuth()
@ApiTags('Usuarios')
@Controller('usuarios')
export class UsuariosController {
  private cloudinaryService: CloudinaryService;
  constructor(private readonly usuariosService: UsuariosService) {
    this.cloudinaryService = new CloudinaryService();
  }

  @ApiResponse({
    status: 201,
    description: 'El usuario fue creado exitosamente.',
    type: User,
  })
  @ApiResponse({
    status: 400,
    description: 'Hubo un error y no se pudo crear el usuario.',
  })
  @Post()
  create(@Body() createUsuarioDto: CreateUsuarioDto) {
    return this.usuariosService.create(createUsuarioDto);
  }

  @UseGuards(LocalAuthGuard)
  @Post('/login')
  login(@Body() loginUserDto: LoginUserDto, @Req() req) {
    return this.usuariosService.login(req.user);
  }

  @UseGuards(JwtAuthGuard)
  @Get()
  findAll(@Req() req) {
    return this.usuariosService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.usuariosService.findOne(id);
  }

  @Patch(':id')
  @UseInterceptors(
    FileFieldsInterceptor(
      [
        { name: 'perfil', maxCount: 1 },
        { name: 'portada', maxCount: 1 },
      ],
      {
        storage: diskStorage({
          destination: './uploads',
        }),
        fileFilter: fileFilter,
      },
    ),
  )
  async updateUser(
    @Param('id') id: string,
    @UploadedFiles()
    files: { perfil?: Express.Multer.File[]; portada?: Express.Multer.File[] },
    @Body() updateUsuarioDto: UpdateUsuarioDto,
  ) {
    if (files.perfil) {
      updateUsuarioDto.imagenPerfilUrl =
        await this.cloudinaryService.uploadImage(files.perfil[0]);
    }
    if (files.portada) {
      updateUsuarioDto.imagenPortadaUrl =
        await this.cloudinaryService.uploadImage(files.portada[0]);
    }
    const user = await this.usuariosService.updateUser(id, updateUsuarioDto);
    return user;
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.usuariosService.remove(+id);
  }
}
