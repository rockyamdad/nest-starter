import {
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { UserService } from '../../users/services/user.service';
import { JwtService } from '@nestjs/jwt';
import { compare } from 'bcrypt';
import { RegisterInput } from '../dtos/register-input.dto';
import { UserOutput } from '../dtos/user-output.dto';
import { AuthTokenOutput } from '../dtos/auth-token-output.dto';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly jwtService: JwtService,
  ) {}

  async validateUser(username: string, password: string): Promise<UserOutput> {
    const user = await this.userService.findOne(username);

    if (!user) {
      throw new NotFoundException('User not found');
    }

    const match = await compare(password, user.password);
    if (!match)
      throw new UnauthorizedException('Incorrect password. Please try again.');

    return user;
  }

  async getToken(user: any): Promise<AuthTokenOutput> {
    const payload = {
      sub: user.id,
      username: user.username,
    };

    return {
      accessToken: this.jwtService.sign(payload),
    };
  }

  async register(input: RegisterInput): Promise<UserOutput> {
    console.log(input);
    return await this.userService.createUser(input);
  }
}
