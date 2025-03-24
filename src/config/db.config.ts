import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import { DatabaseType } from 'typeorm';

export const DbConfig: TypeOrmModuleOptions = {
  type: (process.env.DB_TYPE as DatabaseType) || 'postgres',
  host: process.env.DB_HOST || 'localhost',
  port: Number(process.env.DB_PORT) || 5432,
  username: process.env.DB_USER || 'postgres',
  password: process.env.DB_PASSWORD || 'example',
  database: process.env.DB_NAME || 'foodij',
  entities: [__dirname + '/**/*.entity.{ts,js}'],
  synchronize: process.env.NODE_ENV !== 'production',
} as TypeOrmModuleOptions;
