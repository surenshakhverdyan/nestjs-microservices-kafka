import { Model } from 'mongoose';
import { User } from './user.schema';
import { CreateUserDto } from './dtos/create-user.dto';
export declare class AppService {
    private readonly userModel;
    constructor(userModel: Model<User>);
    createUser(dto: CreateUserDto): Promise<string>;
    getUser(email: string): Promise<string | null>;
}
