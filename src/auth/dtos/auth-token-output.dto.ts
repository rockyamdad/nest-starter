import { Expose } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';

export class AuthTokenOutput {
  @ApiProperty()
  @Expose()
  accessToken: string;
}
