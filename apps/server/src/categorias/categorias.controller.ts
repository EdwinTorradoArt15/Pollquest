import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
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
import { CloudinaryService } from 'src/cloudinary/cloudinary.service';
@ApiBearerAuth()
@ApiTags('Categorias')
@Controller('categorias')
export class CategoriasController {
  private cloudinaryService: CloudinaryService;
  constructor(private readonly categoriasService: CategoriasService) {
    this.cloudinaryService = new CloudinaryService();
  }

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
    if (file) {
      createCategoriaDto.imagenUrl = await this.cloudinaryService.uploadImage(
        file,
      );
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
    if (file) {
      updateCategoriaDto.imagenUrl = await this.cloudinaryService.uploadImage(
        file,
      );
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
