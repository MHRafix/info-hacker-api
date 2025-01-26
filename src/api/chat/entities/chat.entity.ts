import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { Document } from 'mongoose';
import { User } from 'src/api/user/entities/user.entity';

export type ChatDocument = Chat & Document;

export class ChatMessages {
  @Prop({ required: true })
  role: string;

  @Prop({ required: true })
  content: string;
}

@Schema({ timestamps: true })
export class Chat {
  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: User.name })
  user: string;

  @Prop({ required: true })
  ChatMessages: ChatMessages;
}

export const ChatSchema = SchemaFactory.createForClass(Chat);
