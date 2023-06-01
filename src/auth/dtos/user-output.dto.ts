import { Expose } from 'class-transformer';

export class UserOutput {
  @Expose()
  id: string;

  @Expose()
  username: string;

  @Expose()
  email: string;

  @Expose()
  name: string;
}
