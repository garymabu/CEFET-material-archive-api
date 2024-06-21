import { Injectable, UnauthorizedException } from '@nestjs/common';
import { AuthService } from 'src/auth/auth.service';
import { UserService } from 'src/user/user.service';
import { LoginDTO } from './DTO/login.DTO';

@Injectable()
export class LoginService {
  constructor(
    private readonly authService: AuthService,
    private readonly userService: UserService,
  ) {}
  async challengeEmailIfExists(email: string) {
    return await this.authService.challengeEmailIfExists(email);
  }

  async validateChallengeAndGenerateCredentials(
    username: string,
    challengeToken: string,
  ) {
    const { id: userId } = await this.userService.findOneByUsername(username);

    const isValid = await this.authService.validateChallenge(
      userId,
      challengeToken,
    );

    if (isValid) {
      const credentials =
        await this.authService.generateCredentialsByUserName(username);
      return {
        ...credentials,
        userId,
      };
    }
    throw new UnauthorizedException();
  }

  async login(loginDTO: LoginDTO) {
    const { username, password } = loginDTO;
    const result = await this.authService.validateCredentials(
      username,
      password,
    );
    if (result) {
      return await this.authService.generateCredentialsByUserName(username);
    }
    throw new UnauthorizedException();
  }
}
