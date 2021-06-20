import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UsersRepository } from './users.repository';
import { InjectRepository } from '@nestjs/typeorm';
import { AuthDto } from './dto/auth.dto';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(UsersRepository)
    private uesrsRepository: UsersRepository,
  ) {}
  signUp(authDto: AuthDto): Promise<void> {
    return this.uesrsRepository.createUser(authDto);
  }
  async signIn(authDto: AuthDto): Promise<string> {
    const { userName, password } = authDto;
    const user = await this.uesrsRepository.findOne({ userName });
    const validPwd = await bcrypt.compare(password, user.password);

    if (user && validPwd) {
      return 'Success';
    } else {
      throw new UnauthorizedException('Please check your account or password');
    }
  }
}
