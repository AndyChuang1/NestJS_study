import { Repository, EntityRepository } from 'typeorm';
import { User } from './user.entity';
import { CreateAuthDto } from './dto/create-auth.dto';
import {
  ConflictException,
  InternalServerErrorException,
} from '@nestjs/common';

import * as bcrypt from 'bcrypt';

@EntityRepository(User)
export class UsersRepository extends Repository<User> {
  async createUser(userDto: CreateAuthDto): Promise<void> {
    const { userName, password } = userDto;
    const salt = await bcrypt.genSalt();
    const hashPwd = await bcrypt.hash(password, salt);

    const user = this.create({
      userName,
      password: hashPwd,
    });

    try {
      await this.save(user);
    } catch (error) {
      if (error.code === 'ER_DUP_ENTRY') {
        throw new ConflictException('User name already exists');
      } else {
        throw new InternalServerErrorException();
      }
    }
  }
}
