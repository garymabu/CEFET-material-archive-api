import { Test, TestingModule } from '@nestjs/testing';
import { LoginChallengeService } from './login-challenge.service';

describe('LoginChallengeService', () => {
  let service: LoginChallengeService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [LoginChallengeService],
    }).compile();

    service = module.get<LoginChallengeService>(LoginChallengeService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
