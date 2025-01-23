import { AppService } from './app.service';
import { SignUpDto } from './dtos/sign-up.dto';
import { SignInDto } from './dtos/sign-in.dto';
export declare class AppController {
    private readonly appService;
    constructor(appService: AppService);
    signUp(dto: SignUpDto): Promise<string>;
    signIn(dto: SignInDto): Promise<string>;
}
