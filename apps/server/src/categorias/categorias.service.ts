import { Injectable, UnauthorizedException } from '@nestjs/common';
import { Model } from 'mongoose';
import { Categoria } from './entities/categoria.entity';
import { CreateCategoriaDto } from './dto/create-categoria.dto';
import { InjectModel } from '@nestjs/mongoose';

@Injectable()
export class CategoriasService {
  constructor(
    @InjectModel(Categoria.name) private categoriaModel: Model<Categoria>,
  ) {}

  // Obtener todas las categorias
  findAllCategories() {
    return this.categoriaModel.find().exec();
  }

  // Crear una categoria
  async createCategorie(createCategoriaDto: CreateCategoriaDto) {
    const { nombre } = createCategoriaDto;

    // Convertir el nombre a minúsculas
    const nombreLowerCase = nombre.toLowerCase();

    // Verificar categoría existente
    const existingCategoria = await this.categoriaModel.findOne({
      nombre: nombreLowerCase,
    });
    if (existingCategoria) {
      throw new UnauthorizedException(
        `Ya existe una categoría con el nombre ${nombre}`,
      );
    }

    // Crear la categoría con el nombre en minúsculas
    const categoria = new this.categoriaModel({
      ...createCategoriaDto,
      nombre: nombreLowerCase,
    });

    return categoria.save();
  }

  // Eliminar categoria
  deleteCategorie(id: string) {
    return this.categoriaModel.findByIdAndDelete(id).exec();
  }
}
