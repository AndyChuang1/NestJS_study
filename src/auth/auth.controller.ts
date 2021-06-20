import { Controller, Post, Body, UseGuards, Req } from '@nestjs/common';
import { ApiTags, ApiCreatedResponse } from '@nestjs/swagger';
import { AuthService } from './auth.service';
import { AuthDto } from './dto/auth.dto';
import { SignIn } from './signin.model.entity';
import { AuthGuard } from '@nestjs/passport';

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('/signup')
  signUp(@Body() authDto: AuthDto): Promise<void> {
    return this.authService.signUp(authDto);
  }

  @Post('/signin')
  signIn(@Body() authDto: AuthDto): Promise<SignIn> {
    return this.authService.signIn(authDto);
  }

  @Post('/test')
  @UseGuards(AuthGuard())
  test(@Req() req) {
    console.log(req);
  }
}
