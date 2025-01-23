import { Controller } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';

import { AppService } from './app.service';
import { CreateUserDto } from './dtos/create-user.dto';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @MessagePattern('user.create')
  createUser(@Payload() dto: CreateUserDto): Promise<string> {
    return this.appService.createUser(dto);
  }

  @MessagePattern('user.get-user')
  getUser(@Payload() email: string): Promise<string | null> {
    return this.appService.getUser(email);
  }
}
