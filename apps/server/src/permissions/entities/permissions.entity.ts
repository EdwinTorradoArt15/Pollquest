import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';
import { Document, Schema as Esquema, Types } from 'mongoose';

@Schema()
export class Permission extends Document {
  @Prop({ required: true })
  menu: string;

  @Prop({ required: true })
  name: string;

  @Prop({ required: true })
  url: string;

  @Prop({ required: true })
  status: boolean;
}

export const PermissionSchema = SchemaFactory.createForClass(Permission);
