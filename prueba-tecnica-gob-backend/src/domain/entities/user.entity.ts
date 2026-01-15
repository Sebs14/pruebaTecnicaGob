// Domain Layer - Entity (Pure business logic, no framework dependencies)
export class User {
  constructor(
    public readonly id: string,
    public readonly email: string,
    public readonly name: string,
    public readonly passwordHash: string,
    public readonly role: UserRole,
    public readonly createdAt: Date,
    public readonly updatedAt: Date,
  ) {}

  static create(props: CreateUserProps): User {
    return new User(
      crypto.randomUUID(),
      props.email.toLowerCase().trim(),
      props.name.trim(),
      props.passwordHash,
      props.role ?? UserRole.USER,
      new Date(),
      new Date(),
    );
  }

  isAdmin(): boolean {
    return this.role === UserRole.ADMIN;
  }
}

export enum UserRole {
  ADMIN = 'admin',
  USER = 'user',
}

export interface CreateUserProps {
  email: string;
  name: string;
  passwordHash: string;
  role?: UserRole;
}
