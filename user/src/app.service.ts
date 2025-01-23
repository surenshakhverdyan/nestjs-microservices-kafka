import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import { User } from './user.schema';
import { CreateUserDto } from './dtos/create-user.dto';

@Injectable()
export class AppService {
  constructor(
    @InjectModel(User.name) private readonly userModel: Model<User>,
  ) {}

  async createUser(dto: CreateUserDto): Promise<string> {
    const user = await this.userModel.create(dto);
    return JSON.stringify(user);
  }

  async getUser(email: string): Promise<string | null> {
    const user = await this.userModel.findOne({ email });
    return JSON.stringify(user);
  }
}
