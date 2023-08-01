import { IsNotEmpty, IsBoolean, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreatePermissionDto {
  @ApiProperty({
    description: 'ID del menú',
    example: '60c6c1eb1f7a19182486fcb1',
  })
  @IsNotEmpty()
  @IsString()
  menu: string;

  @ApiProperty({ description: 'Nombre del permiso', example: 'Crear usuarios' })
  @IsNotEmpty()
  @IsString()
  name: string;

  @ApiProperty({
    description: 'URL asociada al permiso',
    example: '/users/create',
  })
  @IsNotEmpty()
  @IsString()
  url: string;

  @ApiProperty({
    description: 'Estado del permiso (activo o inactivo)',
    example: true,
  })
  @IsNotEmpty()
  @IsBoolean()
  status: boolean;
}
