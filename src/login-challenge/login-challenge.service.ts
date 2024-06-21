import { Inject, Injectable } from '@nestjs/common';
import * as Redis from 'ioredis';

@Injectable()
export class LoginChallengeService {
  //   private readonly client: Redis;
  //   constructor(@Inject('REDIS_CLIENT') redisClient: ClientProxy) {
  //     this.client = redisClient;
  //   }
  constructor(@Inject('IOREDIS_CLIENT') private readonly client: Redis.Redis) {}

  async createChallenge(userId: string, challengeToken: string) {
    console.log('userId', userId, 'challengeToken', challengeToken);
    return await this.client.set(userId, challengeToken, 'EX', 300);
    //   .('set', [userId, challengeToken, 'EX', 300])
    //   .toPromise();
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
