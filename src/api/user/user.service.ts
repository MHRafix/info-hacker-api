import {
  ForbiddenException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectModel } from '@nestjs/mongoose';
import * as bcrypt from 'bcryptjs';
import { Model } from 'mongoose';
import { LoginDto } from './dto/login.dto';
import { RegistrationDto } from './dto/registration.dto';
import { User, UserDocument } from './entities/user.entity';

@Injectable()
export class UserService {
  constructor(
    @InjectModel(User.name)
    private readonly userModel: Model<UserDocument>,
    private readonly jwtService: JwtService,
  ) {}

  /**
   * registration
   * @param payload RegistrationDto
   * @returns
   */
  async registration(payload: RegistrationDto) {
    const user = await this.userModel.findOne({ email: payload?.email });
    if (user) {
      return new ForbiddenException('User is already registered');
    }

    payload.password = bcrypt.hashSync(payload.password, 10);
    const newUser = await this.userModel.create(payload);

    // make token and return
    const token = this.jwtService.sign({
      id: newUser._id,
      email: newUser?.email,
    });

    return { token, _id: newUser._id };
  }

  /**
   * login
   * @param payload LoginDto
   * @returns
   */
  async login(payload: LoginDto) {
    const user = await this.userModel.findOne({ email: payload?.email });

    // if user is not exist
    if (!user) {
      throw new UnauthorizedException('Email is not correct!');
    }

    // check is password matched
    const isMatchedPass = await bcrypt.compare(
      payload?.password,
      user.password,
    );

    // if password is incorrect
    if (!isMatchedPass) {
      throw new UnauthorizedException('Incorrect credential.');
    }

    // make token and return
    const token = this.jwtService.sign({
      id: user._id,
      email: user?.email,
    });

    return { token, _id: user?._id };
  }

  /**
   * find all users
   * _id: string
   * @returns
   */
  async findOneUserById(_id: string) {
    const user = await this.userModel.findOne(
      { _id },
      '-__v -password -createdAt -updatedAt',
    );

    if (!user) {
      return new UnauthorizedException();
    }

    return user;
  }

  /**
   * find all users
   * @returns
   */
  findAll() {
    return this.userModel.find({}, '-__v -password -createdAt -updatedAt');
  }
}
