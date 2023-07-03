export declare class OpcionDto {
    nombre: string;
    descripcion: string;
}
export declare class PreguntaDto {
    nombre: string;
    descripcion: string;
    opciones: string[];
}
export declare class CreateCuestionarioDto {
    nombre: string;
    descripcion: string;
    categoria: string;
    tipoCuestionario: string;
    idUsuario: string;
    preguntas: PreguntaDto[];
}
