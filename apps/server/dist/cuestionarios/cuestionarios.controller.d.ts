import { CuestionariosService } from './cuestionarios.service';
import { CreateCuestionarioDto } from './dto/create-cuestionario.dto';
import { UpdateCuestionarioDto } from './dto/update-cuestionario.dto';
export declare class CuestionariosController {
    private readonly cuestionariosService;
    constructor(cuestionariosService: CuestionariosService);
    create(createCuestionarioDto: CreateCuestionarioDto, req: any): Promise<import("./entities/cuestionario.entity").Cuestionario>;
    findAll(req: any): Promise<import("./entities/cuestionario.entity").Cuestionario[]>;
    findOne(id: string): Promise<import("./entities/cuestionario.entity").Cuestionario>;
    update(id: string, updateCuestionarioDto: UpdateCuestionarioDto): Promise<import("./entities/cuestionario.entity").Cuestionario>;
    remove(id: string): Promise<import("./entities/cuestionario.entity").Cuestionario>;
}
