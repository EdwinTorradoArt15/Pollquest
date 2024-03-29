import { IsNotEmpty } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class UpdateRolesDto {
  @ApiProperty({ description: 'name', example: 'name' })
  @IsNotEmpty({ message: 'El nombre es requerido' })
  name: string;

  @ApiProperty({ description: 'status', example: true })
  @IsNotEmpty({ message: 'El estatus es requerido' })
  status: boolean;

  @ApiProperty({ description: 'permissions', example: [1, 2, 3] })
  @IsNotEmpty({ message: 'Permisos requeridos' })
  permissions: string;
}
