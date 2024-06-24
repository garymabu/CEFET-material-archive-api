import { Body, Controller, Param, Post } from '@nestjs/common';
import { LoginDTO } from './DTO/login.DTO';
import { LoginService } from './login.service';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('Login')
@Controller('login')
export class LoginController {
  constructor(private readonly loginService: LoginService) {}

  @Post('/challenge/:email')
  async challengeEmailIfExists(@Param('email') email: string) {
    return await this.loginService.challengeEmailIfExists(email);
  }

  @Post('/challenge/:userId/:challengeToken')
  async validateChallenge(
    @Param('userId') userId: number,
    @Param('challengeToken') challengeToken: string
  ) {
    return await this.loginService.validateChallengeAndGenerateCredentials(
      userId,
      challengeToken
    );
  }

  @Post('/')
  async login(@Body() loginDTO: LoginDTO) {
    return this.loginService.login(loginDTO);
  }
}
