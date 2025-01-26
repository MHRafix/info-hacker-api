import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User } from '../user/entities/user.entity';
import { CreateChatDto } from './dto/create-chat.dto';
import { Chat, ChatDocument } from './entities/chat.entity';

@Injectable()
export class ChatService {
  constructor(
    @InjectModel(Chat.name)
    private readonly chatModel: Model<ChatDocument>,
  ) {}

  /**
   * create chat
   * @param payload CreateChatDto
   * @returns
   */
  create(payload: CreateChatDto) {
    return this.chatModel.create(payload);
  }

  /**
   * find chats by specific user
   * @param userId Object ID of the user
   * @returns
   */
  async findAll(userId: string) {
    const chatsByUser = this.chatModel.find(
      { user: userId },
      { __v: 0, createdAt: 0, updatedAt: 0 }, // exclude top-level fields
    );

    // populate the 'user' field and exclude sensitive fields
    const chats = await chatsByUser.populate({
      path: 'user',
      model: User.name, // reference to the User model
      select: '-__v -password -createdAt -updatedAt', // exclude fields from the populated user
    });

    return chats;
  }

  /**
   * remove single chat
   * @param _id objectId
   * @returns
   */
  remove(_id: string) {
    return this.chatModel.findByIdAndRemove(_id);
  }
}
