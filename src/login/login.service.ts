import { Injectable, UnauthorizedException } from '@nestjs/common';
import { AuthService } from 'src/auth/auth.service';
import { LoginDTO } from './DTO/login.DTO';
import { UserService } from 'src/user/user.service';
import { UserType } from 'src/user/entities/user.entity';

export interface AuthResult {
  bearerToken: string;
  userId: number;
  userType: UserType;
}

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
    userId: number,
    challengeToken: string,
  ): Promise<AuthResult> {
    const isValid = await this.authService.validateChallenge(
      userId,
      challengeToken,
    );

    if (isValid) {
      const { type } = await this.userService.findOne(userId);
      const credentials =
        await this.authService.generateCredentialsByUserId(userId);
      return {
        ...credentials,
        userType: type,
        userId,
      };
    }
    throw new UnauthorizedException();
  }

  async login(loginDTO: LoginDTO): Promise<AuthResult> {
    const { username, password } = loginDTO;
    const result = await this.authService.validateCredentials(
      username,
      password,
    );
    if (result) {
      const { id, type } = await this.userService.findOneByUsername(username);
      const { bearerToken } =
        await this.authService.generateCredentialsByUserName(username);
      return {
        bearerToken,
        userId: id,
        userType: type,
      };
    }
    throw new UnauthorizedException();
  }
}
