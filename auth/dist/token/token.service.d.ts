import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { JwtPayload } from 'jsonwebtoken';
export declare class TokenService {
    private readonly configService;
    private readonly jwtService;
    constructor(configService: ConfigService, jwtService: JwtService);
    signAuthToken(payload: JwtPayload): string;
    verifyToken(token: string): JwtPayload | Error;
}
