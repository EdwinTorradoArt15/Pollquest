import { IsOptional } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class UpdateMenuDto {
  @ApiProperty({ description: 'name', example: 'name' })
  @IsOptional({ message: 'El nombre es requerido' })
  name: string;

  @ApiProperty({ description: 'icon', example: 'AiFillUser' })
  @IsOptional({ message: 'El icono es requerido' })
  icon: string;

  @ApiProperty({ description: 'status', example: true })
  @IsOptional({ message: 'El estatus es requerido' })
  status: boolean;
}
