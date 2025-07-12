import { DataSourceOptions } from 'typeorm';
/**
 * Contains configuration options for the TypeORM database.
 * Note that connection details, such as host and credentials, come from the environment variables, via the main config.
 */

export const DbOptions: DataSourceOptions = {
  type: 'postgres',
  host: 'localhost',
  port: 5436,
  username: 'api',
  password: 'development_pass',
  database: 'auth-api',
  entities: [],
  synchronize: true,
};
