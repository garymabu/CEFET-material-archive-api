import { BadRequestException, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { EmailService } from 'src/email/email.service';
import { EncryptionUtils } from 'src/encryption/encryption.utils';
import { LoginChallengeService } from 'src/login-challenge/login-challenge.service';
import { UserService } from 'src/user/user.service';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly loginChallengeService: LoginChallengeService,
    private readonly emailService: EmailService,
    private readonly jwtService: JwtService,
  ) {}
  async challengeEmailIfExists(email: string) {
    const user = await this.userService.findOneByEmail(email);
    if (!user) {
      throw new BadRequestException('User not found');
    }

    const challengeToken = Math.floor(100000 + Math.random() * 900000);

    await this.loginChallengeService.createChallenge(
      user.id.toString(),
      challengeToken.toString(),
    );
    await this.emailService.sendEmail(
      email,
      'Login Challenge',
      `Your login challenge is ${challengeToken}`,
    );

    return { userId: user.id };
  }

  async validateChallenge(userId: number, challengeToken: string) {
    const storedChallengeToken =
      await this.loginChallengeService.findChallengeById(userId);
    return storedChallengeToken === challengeToken;
  }

  async validateCredentials(username: string, password: string) {
    const user = await this.userService.findOneByUsernameAndPasswordHash(
      username,
      EncryptionUtils.hashPassword(password),
    );
    return !!user;
  }

  async generateCredentialsByUserName(userName: string) {
    const user = await this.userService.findOneByUsername(userName);

    return {
      bearerToken: this.jwtService.sign({
        userId: user.id,
        username: user.userName,
      }),
    };
  }
  async generateCredentialsByUserId(userId: number) {
    const user = await this.userService.findOne(userId);

    return {
      bearerToken: this.jwtService.sign({
        userId: user.id,
        username: user.userName,
      }),
    };
  }
}
