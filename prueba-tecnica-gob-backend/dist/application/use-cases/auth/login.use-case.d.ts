import { JwtService } from '@nestjs/jwt';
import type { IUserRepository } from '../../../domain/repositories/user.repository';
export interface LoginInput {
    email: string;
    password: string;
}
export interface LoginOutput {
    accessToken: string;
    user: {
        id: string;
        email: string;
        name: string;
        role: string;
    };
}
export declare class LoginUseCase {
    private readonly userRepository;
    private readonly jwtService;
    constructor(userRepository: IUserRepository, jwtService: JwtService);
    execute(input: LoginInput): Promise<LoginOutput>;
}
