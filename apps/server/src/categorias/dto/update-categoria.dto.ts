import { IsOptional } from 'class-validator';

export class UpdateCategoriaDto {
  @IsOptional()
  nombre: string;

  @IsOptional()
  descripcion: string;

  @IsOptional()
  imagenUrl: string;
}
