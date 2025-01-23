import { OnModuleInit } from '@nestjs/common';
import { ClientKafka } from '@nestjs/microservices';
import { SignUpDto } from './dtos/sign-up.dto';
import { SignInDto } from './dtos/sign-in.dto';
export declare class AuthController implements OnModuleInit {
    private readonly clientKafka;
    constructor(clientKafka: ClientKafka);
    onModuleInit(): Promise<void>;
    signUp(dto: SignUpDto): import("rxjs").Observable<any>;
    signIn(dto: SignInDto): import("rxjs").Observable<any>;
}
