import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersRepository } from './users.repository';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { Jwtstrategy } from './jwt.strategy';

@Module({
  imports: [
    TypeOrmModule.forFeature([UsersRepository]),
    PassportModule.register({ defaultStrategy: 'jwt' }),
    JwtModule.register({
      secret: 'ToSecret',
      signOptions: {
        expiresIn: 3600,
      },
    }),
  ],
  providers: [AuthService, Jwtstrategy],
  controllers: [AuthController],
  exports: [Jwtstrategy, PassportModule],
})
export class AuthModule {}
