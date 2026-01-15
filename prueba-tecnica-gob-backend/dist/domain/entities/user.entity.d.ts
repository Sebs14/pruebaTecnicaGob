export declare class User {
    readonly id: string;
    readonly email: string;
    readonly name: string;
    readonly passwordHash: string;
    readonly role: UserRole;
    readonly createdAt: Date;
    readonly updatedAt: Date;
    constructor(id: string, email: string, name: string, passwordHash: string, role: UserRole, createdAt: Date, updatedAt: Date);
    static create(props: CreateUserProps): User;
    isAdmin(): boolean;
}
export declare enum UserRole {
    ADMIN = "admin",
    USER = "user"
}
export interface CreateUserProps {
    email: string;
    name: string;
    passwordHash: string;
    role?: UserRole;
}
