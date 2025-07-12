import { DynamicModule, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '../config/config.module';
import { ConfigDBData } from '../config/config.interface';
import { ConfigService } from '../config/config.service';

import { DataSourceOptions } from 'typeorm';
import { DbConfigError } from './db-errors';

@Module({})
export class DbModule {
  private static getConnectionOptions(
    config: ConfigService,
    dbconfig: DataSourceOptions,
  ): DataSourceOptions {
    const dbdata = config.get().db;
    if (!dbdata) {
      throw new DbConfigError('Database config is missing');
    }
    const connectionOptions = DbModule.getConnectionOptionsPostgres(dbdata);
    return {
      ...connectionOptions,
      entities: dbconfig.entities,
      synchronize: true,
      logging: false,
    };
  }

  private static getConnectionOptionsPostgres(
    dbdata: ConfigDBData,
  ): DataSourceOptions {
    return {
      type: 'postgres',
      url: dbdata.url,
      ssl:
        process.env.NODE_ENV !== 'local' && process.env.NODE_ENV !== 'test'
          ? { rejectUnauthorized: false }
          : false,
    };
  }

  public static forRoot(dbconfig: DataSourceOptions): DynamicModule {
    return {
      module: DbModule,
      imports: [
        TypeOrmModule.forRootAsync({
          imports: [ConfigModule],
          useFactory: (configService: ConfigService) =>
            DbModule.getConnectionOptions(configService, dbconfig),
          inject: [ConfigService],
        }),
      ],
      controllers: [],
      providers: [],
      exports: [],
    };
  }
}
