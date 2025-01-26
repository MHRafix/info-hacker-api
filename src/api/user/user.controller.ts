import {
  Body,
  Controller,
  ForbiddenException,
  Get,
  Param,
  Post,
  UnauthorizedException,
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

  @ApiOperation({ description: 'Registration user' })
  @Post('registration')
  async registration(@Body() payload: RegistrationDto) {
    try {
      return this.userService.registration(payload);
    } catch (error) {
      throw new UnauthorizedException('Failed to registration');
    }
  }

  @ApiOperation({ description: 'Login user' })
  @Post('login')
  async login(@Body() payload: LoginDto) {
    try {
      return this.userService.login(payload);
    } catch (error) {
      return new UnauthorizedException('Failed to login');
    }
  }

  @ApiBearerAuth()
  @ApiOperation({ description: 'Get all users' })
  @UseGuards(AuthGuard())
  @Get('/user/:_id')
  findOne(@Param('_id') _id: string) {
    try {
      return this.userService.findOneUserById(_id);
    } catch (error) {
      return new ForbiddenException({
        message: 'Failed to get user',
      });
    }
  }

  @ApiBearerAuth()
  @ApiOperation({ description: 'Get all users' })
  @UseGuards(AuthGuard())
  @Get('/all-users')
  findAll() {
    try {
      return this.userService.findAll();
    } catch (error) {
      return new ForbiddenException({
        message: 'Failed to get users',
      });
    }
  }
}
