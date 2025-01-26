import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type UserDocument = User & Document;

export enum Role {
  User = 'USER',
  Admin = 'ADMIN',
}

@Schema({ timestamps: true })
export class User {
  @Prop({ required: false })
  name: string;

  @Prop({
    unique: [true, 'This email already used try with another email!'],
  })
  email: string;

  @Prop({ required: true })
  password: string;
}

export const UserSchema = SchemaFactory.createForClass(User);
