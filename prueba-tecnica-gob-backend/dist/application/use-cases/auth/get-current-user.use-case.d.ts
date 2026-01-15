import type { IUserRepository } from '../../../domain/repositories/user.repository';
export interface GetCurrentUserOutput {
    id: string;
    email: string;
    name: string;
    role: string;
}
export declare class GetCurrentUserUseCase {
    private readonly userRepository;
    constructor(userRepository: IUserRepository);
    execute(userId: string): Promise<GetCurrentUserOutput>;
}
