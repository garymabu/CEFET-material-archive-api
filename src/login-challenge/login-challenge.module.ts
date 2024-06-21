import { Module } from '@nestjs/common';
import { LoginChallengeService } from './login-challenge.service';
import { IOREDIS_PROVIDER } from 'src/persistency/login-challenge-redis/login-challenge-redis.provider';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [ConfigModule],
  providers: [LoginChallengeService, IOREDIS_PROVIDER],
  exports: [LoginChallengeService],
})
export class LoginChallengeModule {}
