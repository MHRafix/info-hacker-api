import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import {
  IsArray,
  IsMongoId,
  IsNotEmpty,
  ValidateNested,
} from 'class-validator';

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

  @ApiProperty({
    required: true,
    type: [ChatMessagesDto], // explicitly define the type of array items
  })
  @IsNotEmpty()
  @IsArray()
  @ValidateNested({ each: true }) // validate each item in the array
  @Type(() => ChatMessagesDto) // validation type
  chatMessages: ChatMessagesDto[];
}
