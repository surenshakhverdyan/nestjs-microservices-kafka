import { Controller } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';

import { AppService } from './app.service';
import { SignUpDto } from './dtos/sign-up.dto';
import { SignInDto } from './dtos/sign-in.dto';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @MessagePattern('auth.sign-up')
  signUp(@Payload() dto: SignUpDto): Promise<string> {
    return this.appService.signUp(dto);
  }

  @MessagePattern('auth.sign-in')
  signIn(@Payload() dto: SignInDto): Promise<string> {
    return this.appService.signIn(dto);
  }
}
