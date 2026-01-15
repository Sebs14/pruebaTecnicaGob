// Seed script to create initial admin user
import 'dotenv/config';
import { DataSource } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { UserOrmEntity } from '../entities/user.orm-entity';
import { UserRole } from '../../../../domain/entities/user.entity';

async function seed() {
  console.log('🔧 Connecting with:', {
    host: process.env.DB_HOST || 'localhost',
    database: process.env.DB_DATABASE || 'students_db',
    username: process.env.DB_USERNAME || process.env.USER,
  });

  const dataSource = new DataSource({
    type: 'postgres',
    host: process.env.DB_HOST || 'localhost',
    port: parseInt(process.env.DB_PORT || '5432', 10),
    username: process.env.DB_USERNAME || process.env.USER,
    password: process.env.DB_PASSWORD || '',
    database: process.env.DB_DATABASE || 'students_db',
    entities: [UserOrmEntity],
    synchronize: true,
  });

  await dataSource.initialize();
  console.log('📦 Database connected');

  const userRepository = dataSource.getRepository(UserOrmEntity);

  // Check if admin already exists
  const existingAdmin = await userRepository.findOne({
    where: { email: 'admin@sistema.gob' },
  });

  if (existingAdmin) {
    console.log('⚠️  Admin user already exists');
  } else {
    const passwordHash = await bcrypt.hash('admin123', 10);

    const admin = userRepository.create({
      id: crypto.randomUUID(),
      email: 'admin@sistema.gob',
      name: 'Administrador',
      passwordHash,
      role: UserRole.ADMIN,
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
