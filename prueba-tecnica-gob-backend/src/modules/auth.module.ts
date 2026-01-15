// Module for Auth feature
import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';

import { AuthController } from '../infrastructure/http/controllers/auth.controller';
import { JwtStrategy } from '../infrastructure/http/strategies/jwt.strategy';

import { LoginUseCase } from '../application/use-cases/auth/login.use-case';
import { GetCurrentUserUseCase } from '../application/use-cases/auth/get-current-user.use-case';

import { UserOrmEntity } from '../infrastructure/persistence/typeorm/entities/user.orm-entity';
import { UserTypeOrmRepository } from '../infrastructure/persistence/typeorm/repositories/user.typeorm-repository';
import { USER_REPOSITORY } from '../domain/repositories/user.repository';

@Module({
  imports: [
    ConfigModule,
    TypeOrmModule.forFeature([UserOrmEntity]),
    PassportModule.register({ defaultStrategy: 'jwt' }),
    JwtModule.registerAsync({
      imports: [ConfigModule],
      useFactory: (configService: ConfigService) => ({
        secret:
          configService.get<string>('JWT_SECRET') ||
          'super-secret-key-change-in-production',
        signOptions: { expiresIn: '7d' },
      }),
      inject: [ConfigService],
    }),
  ],
  controllers: [AuthController],
  providers: [
    // Strategies
    JwtStrategy,

    // Use Cases
    LoginUseCase,
    GetCurrentUserUseCase,

    // Repository implementation (Dependency Injection)
    {
      provide: USER_REPOSITORY,
      useClass: UserTypeOrmRepository,
    },
  ],
  exports: [JwtModule, PassportModule],
})
export class AuthModule {}
