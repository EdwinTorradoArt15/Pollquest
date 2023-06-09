import { IsNotEmpty, IsOptional } from 'class-validator';

export class CreateCategoriaDto {
  @IsNotEmpty({ message: 'El nombre es requerido' })
  nombre: string;

  @IsNotEmpty({ message: 'La descripcion es requerida' })
  descripcion: string;

  @IsOptional()
  imagenUrl: string;
}
