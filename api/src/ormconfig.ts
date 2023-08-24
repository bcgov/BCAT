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
  host: process.env.POSTGRESQL_SERVER,
  type: 'postgres',
  port: +(process.env.POSTGRESQL_PORT || 5432),
  username: process.env.POSTGRESQL_USER,
  password: process.env.POSTGRESQL_PASSWORD,
  database: process.env.POSTGRESQL_DATABASE,
  schema: 'app_bcat',
  cli: {
    migrationsDir: 'src/migration',
    entitiesDir: 'src/**/*.entity.ts',
  },
  entities: [entities],
  migrations: ['dist/migration/*.js'],
  subscribers: ['dist/**/*.subscribers.js'],
  synchronize: false,
  migrationsRun: true,
  namingStrategy: new DatabaseNamingStrategy(),
  logging: !!process.env.DEBUG,
  logger: process.env.DEBUG ? new DatabaseLogger() : undefined,
};

export default config;
