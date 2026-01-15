// Infrastructure Layer - Repository Implementation (Adapter)
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from '../../../../domain/entities/user.entity';
import { IUserRepository } from '../../../../domain/repositories/user.repository';
import { UserOrmEntity } from '../entities/user.orm-entity';

@Injectable()
export class UserTypeOrmRepository implements IUserRepository {
  constructor(
    @InjectRepository(UserOrmEntity)
    private readonly repository: Repository<UserOrmEntity>,
  ) {}

  async findById(id: string): Promise<User | null> {
    const entity = await this.repository.findOne({ where: { id } });
    return entity ? entity.toDomain() : null;
  }

  async findByEmail(email: string): Promise<User | null> {
    const entity = await this.repository.findOne({
      where: { email: email.toLowerCase() },
    });
    return entity ? entity.toDomain() : null;
  }

  async save(user: User): Promise<User> {
    const entity = UserOrmEntity.fromDomain(user);
    const saved = await this.repository.save(entity);
    return saved.toDomain();
  }

  async update(user: User): Promise<User> {
    const entity = UserOrmEntity.fromDomain(user);
    const updated = await this.repository.save(entity);
    return updated.toDomain();
  }

  async delete(id: string): Promise<void> {
    await this.repository.delete(id);
  }
}
