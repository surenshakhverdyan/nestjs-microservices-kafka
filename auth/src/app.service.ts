import { Inject, Injectable, OnModuleInit } from '@nestjs/common';
import { ClientKafka } from '@nestjs/microservices';
import { lastValueFrom } from 'rxjs';
import * as bcrypt from 'bcrypt';

import { TokenService } from './token/token.service';
import { SignUpDto } from './dtos/sign-up.dto';
import { IUser } from './user.interface';
import { SignInDto } from './dtos/sign-in.dto';

@Injectable()
export class AppService implements OnModuleInit {
  constructor(
    @Inject('USER_SERVICE') private readonly clientKafka: ClientKafka,
    private readonly tokenService: TokenService,
  ) {}

  async onModuleInit() {
    this.clientKafka.subscribeToResponseOf('user.create');
    this.clientKafka.subscribeToResponseOf('user.get-user');
    await this.clientKafka.connect();
  }

  async signUp(dto: SignUpDto): Promise<string> {
    const hashedPassword = await bcrypt.hash(dto.password, 10);
    dto.password = hashedPassword;
    const _user: IUser = await lastValueFrom(
      this.clientKafka.send('user.create', dto),
    );
    // check if (_user !== null)
    const payload = { sub: _user._id };
    const authToken = this.tokenService.signAuthToken(payload);
    _user.authToken = authToken;
    const user = this.userResponseGen(_user);
    return JSON.stringify(user);
  }

  async signIn(dto: SignInDto): Promise<string> {
    const _user: IUser = await lastValueFrom(
      this.clientKafka.send('user.get-user', dto.email),
    );
    // const isValidPassword = await bcrypt.compare(dto.password, _user.password!);
    // check if (!isValidPassword)
    const payload = { sub: _user._id };
    const authToken = this.tokenService.signAuthToken(payload);
    _user.authToken = authToken;
    const user = this.userResponseGen(_user);
    return JSON.stringify(user);
  }

  userResponseGen(user: IUser): IUser {
    return {
      _id: user._id,
      name: user.name,
      email: user.email,
      authToken: user.authToken,
    };
  }
}
