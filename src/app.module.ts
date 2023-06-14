import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from './auth/auth.module';
import { UserModule } from './users/user.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'mysqldb',
      port: 3306,
      username: 'root',
      password: '10-16740-2Aiub',
      database: 'node_first_app',
      synchronize: true,
      logging: true,
      entities: ['dist/**/*.entity{.ts,.js}'],
      migrations: ['migrations/**/*.{.ts,.js}'],
      migrationsRun: true,
    }),
    AuthModule,
    UserModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
