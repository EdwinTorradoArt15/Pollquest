import { IsEmail, IsNotEmpty } from 'class-validator';

export class CreateUsuarioDto {
  @IsNotEmpty({ message: 'El nombre es requerido' })
  nombre: string;

  @IsNotEmpty({ message: 'El apellido es requerido' })
  apellido: string;

  @IsNotEmpty({ message: 'El celular es requerido' })
  celular: string;

  @IsNotEmpty({ message: 'El email es requerido' })
  @IsEmail({}, { message: 'El email no es válido' })
  email: string;

  @IsNotEmpty({ message: 'La clave es requerida' })
  clave: string;
}
