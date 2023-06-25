import { Document } from 'mongoose';
import { Prop, SchemaFactory, Schema } from '@nestjs/mongoose';
import { ApiProperty } from '@nestjs/swagger';

@Schema()
export class User extends Document {
  @ApiProperty({
    example: 'Cristiano ',
  })
  @Prop({ required: true })
  nombre: string;

  @ApiProperty({ example: 'Ronaldo' })
  @Prop({ required: true })
  apellido: string;

  @ApiProperty({ example: '3112123123' })
  @Prop({ required: true })
  celular: string;

  @ApiProperty({ example: 'victorbond@email.com' })
  @Prop({ required: true, unique: true })
  email: string;

  @ApiProperty({ example: '123456' })
  @Prop({ required: true })
  clave: string;

  @Prop()
  descripcion?: string;

  @Prop()
  imagenPerfilUrl?: string;

  @Prop()
  imagenPortadaUrl?: string;
}

export const UserSchema = SchemaFactory.createForClass(User);
