import * as dotenv from 'dotenv';
import { PostgresConnectionOptions } from 'typeorm/driver/postgres/PostgresConnectionOptions';
import { DatabaseNamingStrategy } from './database/database.naming-strategy';
import DatabaseLogger from './database/database-logger';
// import { join } from 'path';
dotenv.config();
// Check typeORM documentation for more information.

const entities =
  // process.env.NODE_ENV === 'development' || isTestMode
  //   ? join(__dirname, '../**/**.entity{.ts,.js}')
  'dist/**/*.entity{ .ts,.js}';

const config: PostgresConnectionOptions = {
  host: process.env.POSTGRES_HOST,
  type: 'postgres',
  port: +(process.env.POSTGRES_PORT || 5432),
  username: process.env.POSTGRES_USERNAME || 'db2inst1',
  password: process.env.POSTGRES_PASSWORD || 'development',
  database: process.env.POSTGRES_DATABASE || 'bcat',
  schema: process.env.DB_SCHEMA || 'app_bcat',
  cli: {
    migrationsDir: 'src/migration',
    entitiesDir: 'src/**/*.entity.ts',
  },
  entities: [entities],
  migrations: ['dist/migration/*.js'],
  subscribers: ['dist/**/*.subscribers.js'],
  synchronize: false,
  migrationsRun: false,
  namingStrategy: new DatabaseNamingStrategy(),
  logging: !!process.env.DEBUG,
  logger: process.env.DEBUG ? new DatabaseLogger() : undefined,
};

export default config;
