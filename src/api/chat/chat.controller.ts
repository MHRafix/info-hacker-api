import {
  Body,
  Controller,
  Delete,
  ForbiddenException,
  Get,
  Param,
  Post,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { ChatService } from './chat.service';
import { CreateChatDto } from './dto/create-chat.dto';

@ApiTags('Chat Module')
@Controller('chat')
export class ChatController {
  constructor(private readonly chatService: ChatService) {}

  @ApiOperation({ description: 'Create chat' })
  @Post('/create-chat')
  create(@Body() payload: CreateChatDto) {
    try {
      return this.chatService.create(payload);
    } catch (error) {
      return new ForbiddenException({ message: error?.message });
    }
  }

  @ApiOperation({ description: 'Get chat by specific user' })
  @ApiBearerAuth()
  @UseGuards(AuthGuard())
  @Get('/get-all-chats/:userId')
  findAll(@Param('userId') userId: string) {
    try {
      return this.chatService.findAll(userId);
    } catch (error) {
      return new ForbiddenException({ message: error?.message });
    }
  }

  @ApiOperation({ description: 'Remove specific chat' })
  @ApiBearerAuth()
  @UseGuards(AuthGuard())
  @Delete(':_id')
  remove(@Param('_id') _id: string) {
    try {
      return this.chatService.remove(_id);
    } catch (error) {
      return new ForbiddenException({ message: error?.message });
    }
  }
}
//  @Get(':_id')
//   findOne(@Param('_id') _id: string) {
//     return this.chatService.findOne(_id);
//   }

//   @Patch(':_id')
//   update(@Param('_id') _id: string, @Body() updateChatDto: UpdateChatDto) {
//     return this.chatService.update(_id, updateChatDto);
//   }
