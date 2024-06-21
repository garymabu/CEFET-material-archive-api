import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-local';
import { AuthService } from './auth.service';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(private loginService: AuthService) {
    super();
  }

  async validate(username: string, password: string): Promise<any> {
    const isValid = await this.loginService.validateCredentials(
      username,
      password,
    );
    if (!isValid) {
      throw new UnauthorizedException();
    }
    return isValid;
  }
}
