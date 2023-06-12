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
import { CategoriasService } from './categorias.service';
import { CreateCategoriaDto } from './dto/create-categoria.dto';
import { UpdateCategoriaDto } from './dto/update-categoria.dto';
import { Categoria } from './entities/categoria.entity';
import { ApiBearerAuth, ApiResponse, ApiTags } from '@nestjs/swagger';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { fileFilter } from './helpers/images.helpers';
import { v2 } from 'cloudinary';
@ApiBearerAuth()
@ApiTags('Categorias')
@Controller('categorias')
export class CategoriasController {
  constructor(private readonly categoriasService: CategoriasService) {}

  @ApiResponse({
    status: 200,
    description: 'Categoria creada correctamente.',
    type: Categoria,
  })
  @ApiResponse({
    status: 400,
    description: 'Hubo un error y no se pudo crear la categoria.',
  })

  // Obtener todas las categorias
  @Get()
  findAllCategories() {
    return this.categoriasService.findAllCategories();
  }

  // Obtener una categoria
  @Get(':id')
  findOneCategorie(@Param('id') id: string) {
    return this.categoriasService.findOneCategorie(id);
  }

  // Crear una categoria
  @Post()
  @UseInterceptors(
    FileInterceptor('file', {
      storage: diskStorage({
        destination: './uploads',
      }),
      fileFilter: fileFilter,
    }),
  )
  async createCategorie(
    @UploadedFile() file: Express.Multer.File,
    @Body() createCategoriaDto: CreateCategoriaDto,
  ) {
    v2.config({
      cloud_name: process.env.CLOUD_NAME,
      api_key: process.env.API_KEY,
      api_secret: process.env.API_SECRET,
    });
    if (file) {
      const uploadedImage = await v2.uploader.upload(file.path);
      createCategoriaDto.imagenUrl = uploadedImage.secure_url;
    }

    const categoria = await this.categoriasService.createCategorie(
      createCategoriaDto,
    );
    return categoria;
  }

  // Actualizar categoria
  @Patch(':id')
  @UseInterceptors(
    FileInterceptor('file', {
      storage: diskStorage({
        destination: './uploads',
      }),
      fileFilter: fileFilter,
    }),
  )
  async updateCategoria(
    @Param('id') id: string,
    @UploadedFile() file: Express.Multer.File,
    @Body() updateCategoriaDto: UpdateCategoriaDto,
  ) {
    v2.config({
      cloud_name: process.env.CLOUD_NAME,
      api_key: process.env.API_KEY,
      api_secret: process.env.API_SECRET,
    });

    if (file) {
      const uploadedImage = await v2.uploader.upload(file.path);
      updateCategoriaDto.imagenUrl = uploadedImage.secure_url;
    }

    const categoria = await this.categoriasService.updateCategorie(
      id,
      updateCategoriaDto,
    );
    return categoria;
  }

  // Eliminar categoria
  @Delete(':id')
  deleteCategorie(@Param('id') id: string) {
    return this.categoriasService.deleteCategorie(id);
  }
}
