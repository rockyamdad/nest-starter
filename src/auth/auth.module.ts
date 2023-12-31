import { Module } from '@nestjs/common';
import { UserModule } from '../users/user.module';
import { AuthService } from './services/auth.service';
import { AuthController } from './controllers/auth.controller';
import { PassportModule } from '@nestjs/passport';
import { LocalStrategy } from './strategies/local.strategy';
import { JwtModule } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { LocalAuthGuard } from './gaurds/local-auth.guard';
import { JwtStrategy } from './strategies/jwt.strategy';

@Module({
  imports: [
    PassportModule,
    UserModule,
    // JwtModule.registerAsync({
    //   inject: [ConfigService],
    //   useFactory: (config: ConfigService) => ({
    //     secret: config.get('JWT_KEY'),
    //     signOptions: { expiresIn: config.get('JWT_ACCESS_TOKEN_EXP_IN_SEC') },
    //   }),
    // }),

    JwtModule.register({
      secret: 'dev',
      signOptions: { expiresIn: '36000' },
    }),
  ],
  controllers: [AuthController],
  providers: [AuthService, LocalStrategy, LocalAuthGuard, JwtStrategy],
})
export class AuthModule {}
