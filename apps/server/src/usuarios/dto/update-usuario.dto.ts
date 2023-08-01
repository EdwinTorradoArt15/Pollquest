import { IsOptional } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class UpdateUsuarioDto {
  @ApiProperty({ description: 'nombre', example: 'nombre' })
  @IsOptional()
  nombre: string;

  @ApiProperty({ description: 'apellido', example: 'apellido' })
  @IsOptional()
  apellido: string;

  @ApiProperty({ description: 'celular', example: 'celular' })
  @IsOptional()
  celular: string;

  @ApiProperty({ description: 'email', example: 'email' })
  @IsOptional()
  email: string;

  @ApiProperty({ description: 'clave', example: 'clave' })
  @IsOptional()
  clave: string;

  @ApiProperty({ description: 'descripcion', example: 'descripcion' })
  @IsOptional()
  descripcion: string;

  @ApiProperty({ description: 'imagenPerfilUrl', example: 'imagenPerfilUrl' })
  @IsOptional()
  imagenPerfilUrl: string;

  @ApiProperty({ description: 'imagenPortadaUrl', example: 'imagenPortadaUrl' })
  @IsOptional()
  imagenPortadaUrl: string;
}
