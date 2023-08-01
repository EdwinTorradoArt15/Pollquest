import { IsOptional } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class UpdateCategoriaDto {
  @ApiProperty({ description: 'nombre', example: 'nombre' })
  @IsOptional()
  nombre: string;

  @ApiProperty({ description: 'descripcion', example: 'descripcion' })
  @IsOptional()
  descripcion: string;

  @ApiProperty({ description: 'imagenUrl', example: 'imagenUrl' })
  @IsOptional()
  imagenUrl: string;
}
