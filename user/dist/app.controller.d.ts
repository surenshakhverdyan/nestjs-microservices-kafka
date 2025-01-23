import { AppService } from './app.service';
import { CreateUserDto } from './dtos/create-user.dto';
export declare class AppController {
    private readonly appService;
    constructor(appService: AppService);
    createUser(dto: CreateUserDto): Promise<string>;
    getUser(email: string): Promise<string | null>;
}
