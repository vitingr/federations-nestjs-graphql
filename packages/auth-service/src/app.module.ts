import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { join } from 'path';
import { ConfigModule } from './config/config.module';
import { DbModule } from './db/db.module';

import { ApolloFederationDriver } from '@nestjs/apollo';
import { GraphQLError, GraphQLFormattedError } from 'graphql';
import { UserEntity } from './domain/users/entity/user';
import { AuthModule } from './domain/auth/auth.module';
import { UsersModule } from './domain/users/users.module';

@Module({
  imports: [
    DbModule.forRoot({
      entities: [UserEntity],
      type: 'postgres',
    }),
    GraphQLModule.forRoot({
      typePaths: ['./**/*.graphql'],
      driver: ApolloFederationDriver,
      context: ({ req }: any) => ({ req }),
      formatError: (error: GraphQLError) => {
        const graphQLFormattedError: GraphQLFormattedError = {
          message: error?.message,
        };
        return graphQLFormattedError;
      },
      definitions: {
        path: join(process.cwd(), 'src/graphql.classes.ts'),
        outputAs: 'class',
      },
    }),
    UsersModule,
    AuthModule,
    ConfigModule,
  ],
})
export class AppModule {}
