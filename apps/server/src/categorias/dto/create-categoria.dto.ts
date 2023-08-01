import { IsNotEmpty, IsOptional } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';


export class CreateCategoriaDto {
  @ApiProperty({ description: 'nombre', example: 'nombre' })
  @IsNotEmpty({ message: 'El nombre es requerido' })
  nombre: string;

  @ApiProperty({ description: 'descripcion', example: 'descripcion' })
  @IsNotEmpty({ message: 'La descripcion es requerida' })
  descripcion: string;

  @ApiProperty({ description: 'imagenUrl', example: 'imagenUrl' })
  @IsOptional()
  imagenUrl: string;
}
