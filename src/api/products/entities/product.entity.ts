import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type ProductDocument = Product & Document;

@Schema({ timestamps: true })
export class Product {
  @Prop({ required: true })
  title: string;

  @Prop({ required: true })
  regularPrice: number;

  @Prop()
  salePrice?: number;

  @Prop()
  image?: string;

  @Prop()
  description?: string;

  @Prop()
  size?: string[]; // Example: [S, M, L, XL]

  @Prop()
  color?: string[]; // Example: [Red, Blue, Green]
}

export const ProductSchema = SchemaFactory.createForClass(Product);
