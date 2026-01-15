import type { Response } from 'express';
import { LoginUseCase } from '../../../application/use-cases/auth/login.use-case';
import { GetCurrentUserUseCase } from '../../../application/use-cases/auth/get-current-user.use-case';
import { LoginDto } from '../dtos/auth.dto';
import type { JwtPayload } from '../strategies/jwt.strategy';
export declare class AuthController {
    private readonly loginUseCase;
    private readonly getCurrentUserUseCase;
    constructor(loginUseCase: LoginUseCase, getCurrentUserUseCase: GetCurrentUserUseCase);
    login(loginDto: LoginDto, response: Response): Promise<{
        message: string;
        user: {
            id: string;
            email: string;
            name: string;
            role: string;
        };
        accessToken: string;
    }>;
    logout(response: Response): Promise<{
        message: string;
    }>;
    me(user: JwtPayload): Promise<import("../../../application/use-cases/auth/get-current-user.use-case").GetCurrentUserOutput>;
}
