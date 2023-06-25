import { IsOptional } from 'class-validator';

export class UpdateUsuarioDto {
  @IsOptional()
  nombre: string;

  @IsOptional()
  apellido: string;

  @IsOptional()
  celular: string;

  @IsOptional()
  email: string;

  @IsOptional()
  clave: string;

  @IsOptional()
  descripcion: string;

  @IsOptional()
  imagenPerfilUrl: string;

  @IsOptional()
  imagenPortadaUrl: string;
}
