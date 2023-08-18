import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema()
export class Rol extends Document {
  @Prop({ required: true })
  name: string;

  @Prop({ required: true })
  status: boolean;

  @Prop({ type: [{ type: String }] })
  permissions: string[];
}

export const RolSchema = SchemaFactory.createForClass(Rol);
