import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';
import { Document ,Schema as Esquema} from 'mongoose';

@Schema()
export class Cuestionario extends Document {
  @Prop({ required: true })
  nombre: string;

  @Prop({ required: true })
  descripcion: string;

  @Prop({ required: true, type: Esquema.Types.ObjectId })
  categoria: string;

  @Prop({ required: true })
  tipoCuestionario: string;

  @Prop({ required: true, type: Esquema.Types.ObjectId }) // Agregar el campo idUsuario
  idUsuario: string;

  @Prop([{
    nombre: { type: String, required: true },
    descripcion: { type: String, required: true },
    opciones: [{ type: String, required: true }],
  }])
  preguntas: {
    nombre: string;
    descripcion: string;
    opciones: string[];
  }[];
}

export const CuestionarioSchema = SchemaFactory.createForClass(Cuestionario);
