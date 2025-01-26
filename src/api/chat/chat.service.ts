import { Injectable } from '@nestjs/common';
import { CreateChatDto } from './dto/create-chat.dto';
import { UpdateChatDto } from './dto/update-chat.dto';

@Injectable()
export class ChatService {
  create(payload: CreateChatDto) {
    return 'This action adds a new chat';
  }

  findAll() {
    return `This action returns all chat`;
  }

  findOne(_id: string) {
    return `This action returns a #${_id} chat`;
  }

  update(_id: string, payload: UpdateChatDto) {
    return `This action updates a #${_id} chat`;
  }

  remove(_id: string) {
    return `This action removes a #${_id} chat`;
  }
}
