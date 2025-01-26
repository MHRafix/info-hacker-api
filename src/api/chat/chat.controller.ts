import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { ChatService } from './chat.service';
import { CreateChatDto } from './dto/create-chat.dto';
import { UpdateChatDto } from './dto/update-chat.dto';

@ApiTags('Chat Module')
@Controller('chat')
export class ChatController {
  constructor(private readonly chatService: ChatService) {}

  @Post('/create-chat')
  create(@Body() payload: CreateChatDto) {
    return this.chatService.create(payload);
  }

  @Get('/get-all-chats/:userId')
  findAll(@Param('userId') userId: string) {
    return this.chatService.findAll(userId);
  }

  @Get(':_id')
  findOne(@Param('_id') _id: string) {
    return this.chatService.findOne(_id);
  }

  @Patch(':_id')
  update(@Param('_id') _id: string, @Body() updateChatDto: UpdateChatDto) {
    return this.chatService.update(_id, updateChatDto);
  }

  @Delete(':_id')
  remove(@Param('_id') _id: string) {
    return this.chatService.remove(_id);
  }
}
