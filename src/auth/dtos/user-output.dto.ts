import { Expose } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';

export class UserOutput {
  @ApiProperty()
  @Expose()
  id: string;

  @ApiProperty()
  @Expose()
  username: string;

  @ApiProperty()
  @Expose()
  email: string;

  @ApiProperty()
  @Expose()
  name: string;
}
