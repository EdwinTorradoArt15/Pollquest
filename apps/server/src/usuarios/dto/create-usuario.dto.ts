import { IsEmail, IsNotEmpty } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateUsuarioDto {
  @ApiProperty({ description: 'nombre', example: 'nombre' })
  @IsNotEmpty({ message: 'El nombre es requerido' })
  nombre: string;

  @ApiProperty({ description: 'apellido', example: 'apellido' })
  @IsNotEmpty({ message: 'El apellido es requerido' })
  apellido: string;

  @ApiProperty({ description: 'celular', example: 'celular' })
  @IsNotEmpty({ message: 'El celular es requerido' })
  celular: string;

  @ApiProperty({ description: 'email', example: 'email' })
  @IsNotEmpty({ message: 'El email es requerido' })
  @IsEmail({}, { message: 'El email no es válido' })
  email: string;

  @ApiProperty({ description: 'clave', example: 'clave' })
  @IsNotEmpty({ message: 'La clave es requerida' })
  clave: string;
}
