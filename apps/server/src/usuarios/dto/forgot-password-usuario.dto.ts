import { IsEmail, IsNotEmpty, IsOptional } from 'class-validator';

export class ForgotPasswordUsuarioDto {
  @IsOptional()
  @IsEmail()
  email: string;

  @IsOptional()
  celular: string;

  @IsOptional()
  codigo: string;

  @IsOptional()
  clave: string;
}
