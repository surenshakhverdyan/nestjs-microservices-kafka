import { Body, Controller, Inject, OnModuleInit, Post } from '@nestjs/common';
import { ClientKafka } from '@nestjs/microservices';

import { SignUpDto } from './dtos/sign-up.dto';
import { SignInDto } from './dtos/sign-in.dto';

@Controller('auth')
export class AuthController implements OnModuleInit {
  constructor(
    @Inject('AUTH_SERVICE') private readonly clientKafka: ClientKafka,
  ) {}

  async onModuleInit() {
    this.clientKafka.subscribeToResponseOf('auth.sign-up');
    this.clientKafka.subscribeToResponseOf('auth.sign-in');
    await this.clientKafka.connect();
  }

  @Post('sign-up')
  signUp(@Body() dto: SignUpDto) {
    return this.clientKafka.send('auth.sign-up', dto);
  }

  @Post('sign-in')
  signIn(@Body() dto: SignInDto) {
    return this.clientKafka.send('auth.sign-in', dto);
  }
}
