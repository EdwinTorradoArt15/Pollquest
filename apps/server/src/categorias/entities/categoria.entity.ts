import { Document } from 'mongoose';
import { Prop, SchemaFactory, Schema } from '@nestjs/mongoose';

@Schema()
export class Categoria extends Document {
  @Prop({ required: true, unique: true })
  nombre: string;

  @Prop({ required: true })
  descripcion: string;

  @Prop()
  imagenUrl?: string;
}

export const CategoriaSchema = SchemaFactory.createForClass(Categoria);
