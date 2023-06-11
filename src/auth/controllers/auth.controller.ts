import {
  Body,
  ClassSerializerInterceptor,
  Controller,
  Get,
  HttpStatus,
  Post,
  Request,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { AuthService } from '../services/auth.service';
import { LocalAuthGuard } from '../gaurds/local-auth.guard';
import { RegisterInput } from '../dtos/register-input.dto';
import { AuthTokenOutput } from '../dtos/auth-token-output.dto';
import { JwtAuthGuard } from '../gaurds/jwt-auth.guard';
import {
  ApiBearerAuth,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { UserOutput } from '../dtos/user-output.dto';

@ApiTags('auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  @UseGuards(LocalAuthGuard)
  @UseInterceptors(ClassSerializerInterceptor)
  @ApiOperation({
    summary: 'signin to system',
  })
  @ApiResponse({
    status: HttpStatus.CREATED,
    type: AuthTokenOutput,
  })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
  })
  @ApiResponse({
    status: HttpStatus.BAD_REQUEST,
  })
  async login(@Request() req): Promise<AuthTokenOutput> {
    return this.authService.getToken(req.user);
  }

  @Post('register')
  @UseInterceptors(ClassSerializerInterceptor)
  @ApiOperation({
    summary: 'Registration to system',
  })
  @ApiResponse({
    status: HttpStatus.CREATED,
    type: AuthTokenOutput,
    description: 'The record has been successfully created.',
  })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
  })
  @ApiResponse({
    status: HttpStatus.BAD_REQUEST,
    description: 'Bad Request.',
  })
  async register(@Body() input: RegisterInput): Promise<AuthTokenOutput> {
    console.log(input);
    const user = this.authService.register(input);

    const accessToken = this.authService.getToken(user);
    return accessToken;
  }

  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @Get('profile')
  @UseInterceptors(ClassSerializerInterceptor)
  @ApiOperation({
    summary: 'See own info',
  })
  @ApiResponse({
    status: HttpStatus.NO_CONTENT,
    type: UserOutput,
  })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
  })
  getProfile(@Request() req): Promise<UserOutput> {
    return req.user;
  }
}
