import {
  Body,
  Controller,
  ForbiddenException,
  Get,
  Post,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { LoginDto } from './dto/login.dto';
import { RegistrationDto } from './dto/registration.dto';
import { UserService } from './user.service';

@Controller('user')
@ApiTags('User Module')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @ApiOperation({})
  @Post('registration')
  async registration(@Body() payload: RegistrationDto) {
    try {
      return this.userService.registration(payload);
    } catch (error) {
      throw new ForbiddenException('Failed to registration');
    }
  }

  @ApiOperation({})
  @Post('login')
  async login(@Body() payload: LoginDto) {
    return this.userService.login(payload);
  }

  @ApiBearerAuth()
  @ApiOperation({ description: 'Get all users' })
  @UseGuards(AuthGuard())
  @Get('/all-users')
  findAll() {
    return this.userService.findAll();
  }
}
