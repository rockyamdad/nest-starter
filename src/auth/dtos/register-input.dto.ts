import { IsEmail, IsNotEmpty, IsString } from '@nestjs/class-validator';

export class RegisterInput {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  username: string;

  @IsString()
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @IsString()
  @IsNotEmpty()
  password: string;
}
