"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
require("dotenv/config");
const typeorm_1 = require("typeorm");
const bcrypt = __importStar(require("bcrypt"));
const user_orm_entity_1 = require("../entities/user.orm-entity");
const user_entity_1 = require("../../../../domain/entities/user.entity");
async function seed() {
    console.log('🔧 Connecting with:', {
        host: process.env.DB_HOST || 'localhost',
        database: process.env.DB_DATABASE || 'students_db',
        username: process.env.DB_USERNAME || process.env.USER,
    });
    const dataSource = new typeorm_1.DataSource({
        type: 'postgres',
        host: process.env.DB_HOST || 'localhost',
        port: parseInt(process.env.DB_PORT || '5432', 10),
        username: process.env.DB_USERNAME || process.env.USER,
        password: process.env.DB_PASSWORD || '',
        database: process.env.DB_DATABASE || 'students_db',
        entities: [user_orm_entity_1.UserOrmEntity],
        synchronize: true,
    });
    await dataSource.initialize();
    console.log('📦 Database connected');
    const userRepository = dataSource.getRepository(user_orm_entity_1.UserOrmEntity);
    const existingAdmin = await userRepository.findOne({
        where: { email: 'admin@sistema.gob' },
    });
    if (existingAdmin) {
        console.log('⚠️  Admin user already exists');
    }
    else {
        const passwordHash = await bcrypt.hash('admin123', 10);
        const admin = userRepository.create({
            id: crypto.randomUUID(),
            email: 'admin@sistema.gob',
            name: 'Administrador',
            passwordHash,
            role: user_entity_1.UserRole.ADMIN,
        });
        await userRepository.save(admin);
        console.log('✅ Admin user created');
        console.log('   Email: admin@sistema.gob');
        console.log('   Password: admin123');
    }
    await dataSource.destroy();
    console.log('🔌 Database disconnected');
}
seed().catch((error) => {
    console.error('❌ Seed failed:', error);
    process.exit(1);
});
//# sourceMappingURL=seed.js.map