import { IsEmail, IsNotEmpty, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class LoginUserDto {
  @ApiProperty({ description: 'email', example: 'email' })
  @IsNotEmpty({ message: 'El email es requerido' })
  @IsEmail({}, { message: 'El email no es válido' })
  email: string;

  @ApiProperty({ description: 'clave', example: 'clave' })
  @IsNotEmpty({ message: 'La clave es requerida' })
  @IsString({ message: 'La clave debe ser un texto' })
  clave: string;
}
