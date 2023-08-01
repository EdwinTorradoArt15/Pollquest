import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';
import { Document, Schema as Esquema, Types } from 'mongoose';

@Schema()
export class User extends Document {
  @Prop({ required: true })
  nombre: string;

  @Prop({ required: true })
  apellido: string;

  @Prop({ required: true })
  celular: string;

  @Prop({ required: true, unique: true })
  email: string;

  @Prop({ required: true })
  clave: string;

  @Prop()
  descripcion?: string;

  @Prop()
  imagenPerfilUrl?: string;

  @Prop()
  imagenPortadaUrl?: string;

  @Prop({ type: [{ type: String }] })
  seguidores?: string[];

  @Prop({ type: [{ type: String }] })
  siguiendo?: string[];

  @Prop()
  codigoVerificacion?: string;
}

export const UserSchema = SchemaFactory.createForClass(User);
