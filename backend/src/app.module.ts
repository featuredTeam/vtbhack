import { Module, RequestMethod, MiddlewareConsumer } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { join } from 'path';
import { ServeStaticModule } from '@nestjs/serve-static';
import { ConfigModule } from '@nestjs/config';
import { UsersModule } from './routes/users/users.module';
import { VtbModule } from './modules/vtb/vtb.module';
import { UserMiddleware } from './ middlewares/user.middleware';
import { AchievementsModule } from './routes/achievements/achievements.module';
import { APP_FILTER } from '@nestjs/core';
import { AllExceptionsFilter } from './filters/exceptions.filter';
import { TransactionsModule } from './routes/transactions/transactions.module';
import { CoursesModule } from './routes/courses/courses.module';

@Module({
  imports: [
    ConfigModule.forRoot(),
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '../../client'),
      exclude: ['api/*'],
    }),
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: process.env.MYSQL_HOST,
      port: +process.env.MYSQL_PORT,
      username: process.env.MYSQL_USERNAME,
      password: process.env.MYSQL_PASSWORD,
      database: process.env.MYSQL_DATABASE,
      entities: [__dirname + '/database/entities/*.{js,ts}'],
      synchronize: true,
      ssl: {
        ca: process.env.SSL_CERT,
      },
      extra: {
        ssl: {
          rejectUnauthorized: false,
        },
      },
    }),
    UsersModule,
    AchievementsModule,
    TransactionsModule,
    CoursesModule,
    VtbModule,
  ],
  controllers: [],
  providers: [
    {
      provide: APP_FILTER,
      useClass: AllExceptionsFilter,
    },
  ],
})
export class AppModule {
  configure(consumer: MiddlewareConsumer): void {
    consumer
      .apply(UserMiddleware)
      .forRoutes({ path: '*', method: RequestMethod.ALL });
  }
}
