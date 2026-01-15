"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthModule = void 0;
const common_1 = require("@nestjs/common");
const jwt_1 = require("@nestjs/jwt");
const passport_1 = require("@nestjs/passport");
const typeorm_1 = require("@nestjs/typeorm");
const config_1 = require("@nestjs/config");
const auth_controller_1 = require("../infrastructure/http/controllers/auth.controller");
const jwt_strategy_1 = require("../infrastructure/http/strategies/jwt.strategy");
const login_use_case_1 = require("../application/use-cases/auth/login.use-case");
const get_current_user_use_case_1 = require("../application/use-cases/auth/get-current-user.use-case");
const user_orm_entity_1 = require("../infrastructure/persistence/typeorm/entities/user.orm-entity");
const user_typeorm_repository_1 = require("../infrastructure/persistence/typeorm/repositories/user.typeorm-repository");
const user_repository_1 = require("../domain/repositories/user.repository");
let AuthModule = class AuthModule {
};
exports.AuthModule = AuthModule;
exports.AuthModule = AuthModule = __decorate([
    (0, common_1.Module)({
        imports: [
            config_1.ConfigModule,
            typeorm_1.TypeOrmModule.forFeature([user_orm_entity_1.UserOrmEntity]),
            passport_1.PassportModule.register({ defaultStrategy: 'jwt' }),
            jwt_1.JwtModule.registerAsync({
                imports: [config_1.ConfigModule],
                useFactory: (configService) => ({
                    secret: configService.get('JWT_SECRET') ||
                        'super-secret-key-change-in-production',
                    signOptions: { expiresIn: '7d' },
                }),
                inject: [config_1.ConfigService],
            }),
        ],
        controllers: [auth_controller_1.AuthController],
        providers: [
            jwt_strategy_1.JwtStrategy,
            login_use_case_1.LoginUseCase,
            get_current_user_use_case_1.GetCurrentUserUseCase,
            {
                provide: user_repository_1.USER_REPOSITORY,
                useClass: user_typeorm_repository_1.UserTypeOrmRepository,
            },
        ],
        exports: [jwt_1.JwtModule, passport_1.PassportModule],
    })
], AuthModule);
//# sourceMappingURL=auth.module.js.map