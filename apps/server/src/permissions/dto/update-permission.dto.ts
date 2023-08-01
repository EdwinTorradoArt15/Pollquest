import { IsOptional, IsBoolean, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { Types } from 'mongoose';

export class UpdatePermissionDto {
  @ApiProperty({
    description: 'ID del menú',
    example: '60c6c1eb1f7a19182486fcb1',
  })
  @IsOptional()
  @IsString()
  menu: Types.ObjectId;

  @ApiProperty({ description: 'Nombre del permiso', example: 'Crear usuarios' })
  @IsOptional()
  @IsString()
  name: string;

  @ApiProperty({
    description: 'URL asociada al permiso',
    example: '/users/create',
  })
  @IsOptional()
  @IsString()
  url: string;

  @ApiProperty({
    description: 'Estado del permiso (activo o inactivo)',
    example: true,
  })
  @IsOptional()
  @IsBoolean()
  status: boolean;
}
