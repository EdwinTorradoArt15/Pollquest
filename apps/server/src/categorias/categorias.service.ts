import { Injectable, UnauthorizedException } from '@nestjs/common';
import { Model } from 'mongoose';
import { Categoria } from './entities/categoria.entity';
import { CreateCategoriaDto } from './dto/create-categoria.dto';
import { UpdateCategoriaDto } from './dto/update-categoria.dto';
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

  // Obtener una categoria
  findOneCategorie(id: string) {
    return this.categoriaModel.findOne({ _id: id }).exec();
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

  // Actualizar categoria
  async updateCategorie(id: string, updateCategoriaDto: UpdateCategoriaDto) {
    const { nombre } = updateCategoriaDto;

    // Convertir el nombre a minúsculas
    const nombreLowerCase = nombre.toLowerCase();

    // Verificar si ya existe una categoría con el nuevo nombre
    const existingCategoria = await this.categoriaModel.findOne({
      nombre: nombreLowerCase,
      _id: { $ne: id },
    });
    if (existingCategoria) {
      throw new UnauthorizedException(
        `Ya existe una categoría con el nombre ${nombre}`,
      );
    }

    // Actualizar la categoría con el nuevo nombre en minúsculas
    return this.categoriaModel.findByIdAndUpdate(
      id,
      { $set: { ...updateCategoriaDto, nombre: nombreLowerCase } },
      { new: true },
    );
  }

  // Eliminar categoria
  deleteCategorie(id: string) {
    return this.categoriaModel.findByIdAndDelete(id).exec();
  }
}
