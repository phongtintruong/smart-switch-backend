import { Inject, Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import { CreateUserDto, User } from 'src/interfaces/user.interface';

@Injectable()
export class UserService {
  constructor(
    @Inject('USER_MODEL')
    private userModel: Model<User>,
  ) {}

  async createOne(createUserDto: CreateUserDto): Promise<User | undefined> {
    const createdUser = new this.userModel(createUserDto);
    await createdUser.save();
    return createdUser;
  }

  async findOne(username: string): Promise<User | undefined> {
    return await this.userModel.findOne({ username: username });
  }
}
