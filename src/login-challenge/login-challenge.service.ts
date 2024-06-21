import { Inject, Injectable } from '@nestjs/common';
import * as Redis from 'ioredis';

@Injectable()
export class LoginChallengeService {
  constructor(@Inject('IOREDIS_CLIENT') private readonly client: Redis.Redis) {}

  async createChallenge(userId: string, challengeToken: string) {
    return await this.client.set(userId, challengeToken, 'EX', 300);
  }
  async findChallengeById(userId: number) {
    // Get the challenge
    const challengeToken = await this.client.get(userId.toString());
    return challengeToken;
  }
  async deleteChallenge(userId: string) {
    // Delete the challenge
    await this.client.del(userId);
  }
}
