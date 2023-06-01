import { Controller, Post, Request, UseGuards } from '@nestjs/common';
import { AuthService } from '../services/auth.service';
import { LocalAuthGuard } from '../gaurds/local-auth.guard';

@Controller()
export class AuthController {
  constructor(private readonly authService: AuthService) {}
  @Post('auth/login')
  @UseGuards(LocalAuthGuard)
  async login(@Request() req): Promise<any> {
    return this.authService.login(req.user);
  }
}
