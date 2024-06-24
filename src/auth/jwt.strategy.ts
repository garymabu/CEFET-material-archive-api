// jwt.strategy.ts
import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import {
  ENV_KEY,
  EnvironmentService,
} from 'src/environment/environment.service';

export interface JwtPayload {
  username: string;
  userId: number;
}

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(environmentService: EnvironmentService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: environmentService.get(ENV_KEY.JWT_SECRET),
    });
  }

  async validate(payload: JwtPayload) {
    return { userId: payload.userId, username: payload.username };
  }
}
