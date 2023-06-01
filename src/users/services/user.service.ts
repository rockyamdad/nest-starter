import { Injectable } from '@nestjs/common';
import { User } from '../../auth/entities/user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { RegisterInput } from '../../auth/dtos/register-input.dto';
import { plainToClass, plainToInstance } from 'class-transformer';
import { UserOutput } from '../../auth/dtos/user-output.dto';
import { hash } from 'bcrypt';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
  ) {}

  async findOne(username: string): Promise<User | undefined> {
    return this.usersRepository.findOne({
      where: {
        username: username,
      },
    });
  }

  async createUser(input: RegisterInput): Promise<UserOutput> {
    const user = plainToInstance(User, input);
    user.password = await hash(input.password, 10);

    await this.usersRepository.save(user);

    return plainToClass(UserOutput, user, { excludeExtraneousValues: true });
  }
}
