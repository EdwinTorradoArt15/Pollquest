import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import { CreateCuestionarioDto } from './dto/create-cuestionario.dto';
import { UpdateCuestionarioDto } from './dto/update-cuestionario.dto';
import { Cuestionario } from './entities/cuestionario.entity';

@Injectable()
export class CuestionariosService {
  constructor(
    @InjectModel(Cuestionario.name) private cuestionarioModel: Model<Cuestionario>,
  ) { }

  async create(createCuestionarioDto: CreateCuestionarioDto): Promise<Cuestionario> {
    const createdCuestionario = new this.cuestionarioModel(createCuestionarioDto);
    return createdCuestionario.save();
  }

  async findAll(): Promise<Cuestionario[]> {
    return this.cuestionarioModel.find().exec();
  }

  async findOne(id: string): Promise<Cuestionario> {
    return this.cuestionarioModel.findById(id).exec();
  }

  // Hazme una funcion que busque la lista de cuestionarios a partir del id del usuario
  async findCuestionariosByUserId(idUsuario: string): Promise<Cuestionario[]> {
    return this.cuestionarioModel.find({ idUsuario: idUsuario }).exec();
  }


  async update(id: string, updateCuestionarioDto: UpdateCuestionarioDto): Promise<Cuestionario> {
    return this.cuestionarioModel.findByIdAndUpdate(id, updateCuestionarioDto, { new: true }).exec();
  }

  async remove(id: string): Promise<Cuestionario> {
    return this.cuestionarioModel.findByIdAndRemove(id).exec();
  }
}
