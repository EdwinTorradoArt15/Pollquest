import { Model } from 'mongoose';
import { CreateCuestionarioDto } from './dto/create-cuestionario.dto';
import { UpdateCuestionarioDto } from './dto/update-cuestionario.dto';
import { Cuestionario } from './entities/cuestionario.entity';
export declare class CuestionariosService {
    private cuestionarioModel;
    constructor(cuestionarioModel: Model<Cuestionario>);
    create(createCuestionarioDto: CreateCuestionarioDto): Promise<Cuestionario>;
    findAll(): Promise<Cuestionario[]>;
    findOne(id: string): Promise<Cuestionario>;
    findCuestionariosByUserId(idUsuario: string): Promise<Cuestionario[]>;
    update(id: string, updateCuestionarioDto: UpdateCuestionarioDto): Promise<Cuestionario>;
    remove(id: string): Promise<Cuestionario>;
}
