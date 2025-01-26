import { ApiProperty } from '@nestjs/swagger';
import { IsMongoId, IsNotEmpty } from 'class-validator';

export class ChatMessagesDto {
  @ApiProperty({ required: true })
  @IsNotEmpty()
  role: string;

  @ApiProperty({ required: true })
  @IsNotEmpty()
  content: string;
}

export class CreateChatDto {
  @ApiProperty({ required: true })
  @IsNotEmpty()
  @IsMongoId()
  user: string;

  @ApiProperty({ required: true })
  @IsNotEmpty()
  ChatMessages: ChatMessagesDto;
}
