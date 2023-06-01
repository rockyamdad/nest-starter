import {Body, Controller, Post, Request, UseGuards} from '@nestjs/common';
import { AuthService } from '../services/auth.service';
import { LocalAuthGuard } from '../gaurds/local-auth.guard';
import { RegisterInput } from '../dtos/register-input.dto';
import { AuthTokenOutput } from '../dtos/auth-token-output.dto';

@Controller()
export class AuthController {
  constructor(private readonly authService: AuthService) {}
  @Post('auth/login')
  @UseGuards(LocalAuthGuard)
  async login(@Request() req): Promise<AuthTokenOutput> {
    return this.authService.getToken(req.user);
  }

  @Post('auth/register')
  async register(@Body() input: RegisterInput): Promise<AuthTokenOutput> {
    console.log(input);
    const user = this.authService.register(input);

    const accessToken = this.authService.getToken(user);
    return accessToken;
  }
}
