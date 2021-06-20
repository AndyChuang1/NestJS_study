import { Injectable } from '@nestjs/common';
import { UsersRepository } from './users.repository';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateAuthDto } from './dto/create-auth.dto';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(UsersRepository)
    private uesrsRepository: UsersRepository,
  ) {}
  signUp(authDto: CreateAuthDto): Promise<void> {
    return this.uesrsRepository.createUser(authDto);
  }
}
