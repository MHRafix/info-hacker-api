import {
  Body,
  Controller,
  Delete,
  ForbiddenException,
  Get,
  Param,
  Post,
  Put,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { ChatService } from './chat.service';
import { CreateChatDto } from './dto/create-chat.dto';
import { UpdateChatDto } from './dto/update-chat.dto';

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

  @ApiOperation({ description: 'Update chat' })
  @Put(':_id')
  update(@Param('_id') _id: string, @Body() updateChatDto: UpdateChatDto) {
    return this.chatService.update(_id, updateChatDto);
  }

  @ApiOperation({ description: 'Remove specific chat' })
  @ApiBearerAuth()
  @UseGuards(AuthGuard())
  @Delete(':_id')
  async remove(@Param('_id') _id: string) {
    try {
      await this.chatService.remove(_id);
      return { isSuccess: true };
    } catch (error) {
      return new ForbiddenException({ message: error?.message });
    }
  }
}
//  @Get(':_id')
//   findOne(@Param('_id') _id: string) {
//     return this.chatService.findOne(_id);
//   }
