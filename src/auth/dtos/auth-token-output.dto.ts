import { Expose } from 'class-transformer';

export class AuthTokenOutput {
  @Expose()
  accessToken: string;
}
