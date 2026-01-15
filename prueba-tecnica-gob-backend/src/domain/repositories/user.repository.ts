// Domain Layer - Repository Interface (Port)
// This is the contract that infrastructure must implement
import { User } from '../entities/user.entity';

export interface IUserRepository {
  findById(id: string): Promise<User | null>;
  findByEmail(email: string): Promise<User | null>;
  save(user: User): Promise<User>;
  update(user: User): Promise<User>;
  delete(id: string): Promise<void>;
}

// Token for dependency injection
export const USER_REPOSITORY = Symbol('USER_REPOSITORY');
