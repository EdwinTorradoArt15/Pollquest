import { IsNotEmpty, IsOptional } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateMenuDto {
  @ApiProperty({ description: 'name', example: 'name' })
  @IsNotEmpty({ message: 'El nombre es requerido' })
  name: string;

  @ApiProperty({ description: 'icon', example: 'AiFillUser' })
  @IsNotEmpty({ message: 'El icono es requerido' })
  icon: string;

  @ApiProperty({ description: 'status', example: true })
  @IsOptional({ message: 'El estatus es requerido' })
  status: boolean;
}
