import { IsEmail, IsNotEmpty, IsOptional } from 'class-validator';

export class ForgotPasswordUsuarioDto {
  @IsNotEmpty()
  @IsEmail()
  email: string;

  @IsOptional()
  codigo: string;

  @IsOptional()
  clave: string;
}
