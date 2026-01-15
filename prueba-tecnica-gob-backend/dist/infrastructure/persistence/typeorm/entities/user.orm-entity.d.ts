import { User, UserRole } from '../../../../domain/entities/user.entity';
export declare class UserOrmEntity {
    id: string;
    email: string;
    name: string;
    passwordHash: string;
    role: UserRole;
    createdAt: Date;
    updatedAt: Date;
    toDomain(): User;
    static fromDomain(user: User): UserOrmEntity;
}
