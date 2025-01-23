import { OnModuleInit } from '@nestjs/common';
import { ClientKafka } from '@nestjs/microservices';
import { TokenService } from './token/token.service';
import { SignUpDto } from './dtos/sign-up.dto';
import { IUser } from './user.interface';
import { SignInDto } from './dtos/sign-in.dto';
export declare class AppService implements OnModuleInit {
    private readonly clientKafka;
    private readonly tokenService;
    constructor(clientKafka: ClientKafka, tokenService: TokenService);
    onModuleInit(): Promise<void>;
    signUp(dto: SignUpDto): Promise<string>;
    signIn(dto: SignInDto): Promise<string>;
    userResponseGen(user: IUser): IUser;
}
