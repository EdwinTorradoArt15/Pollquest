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
  UploadedFile,
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
import { FileInterceptor } from '@nestjs/platform-express';
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

  @Patch('info/:id')
  async updateInfoUsuario(
    @Param('id') id: string,
    @Body() updateUsuarioDto: UpdateUsuarioDto,
  ) {
    const user = await this.usuariosService.updateInfoUsuario(
      id,
      updateUsuarioDto,
    );
    return user;
  }

  @Patch('perfil/:id')
  @UseInterceptors(
    FileInterceptor('perfil', {
      storage: diskStorage({
        destination: './uploads',
      }),
      fileFilter: fileFilter,
    }),
  )
  async updatePerfil(
    @Param('id') id: string,
    @UploadedFile() file: Express.Multer.File,
    @Body() updateUsuarioDto: UpdateUsuarioDto,
  ) {
    if (file) {
      updateUsuarioDto.imagenPerfilUrl =
        await this.cloudinaryService.uploadImage(file);
    }
    const user = await this.usuariosService.updatePerfil(id, updateUsuarioDto);
    return user;
  }

  @Patch('portada/:id')
  @UseInterceptors(
    FileInterceptor('portada', {
      storage: diskStorage({
        destination: './uploads',
      }),
      fileFilter: fileFilter,
    }),
  )
  async updatePortada(
    @Param('id') id: string,
    @UploadedFile() file: Express.Multer.File,
    @Body() updateUsuarioDto: UpdateUsuarioDto,
  ) {
    if (file) {
      updateUsuarioDto.imagenPortadaUrl =
        await this.cloudinaryService.uploadImage(file);
    }
    const user = await this.usuariosService.updatePortada(id, updateUsuarioDto);
    return user;
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.usuariosService.remove(+id);
  }

  @Post('follow/:id')
  @UseGuards(JwtAuthGuard)
  followUser(@Param('id') id: string, @Req() req) {
    return this.usuariosService.followUser(id, req.user._id);
  }

  @Post('unfollow/:id')
  @UseGuards(JwtAuthGuard)
  unfollowUser(@Param('id') id: string, @Req() req) {
    return this.usuariosService.unfollowUser(id, req.user._id);
  }
}
