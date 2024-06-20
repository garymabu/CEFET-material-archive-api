import { Injectable } from '@nestjs/common';

export enum ENV_KEY {
  DATABASE_HOST = 'DATABASE_HOST',
  DATABASE_PORT = 'DATABASE_PORT',
  DATABASE_USERNAME = 'DATABASE_USERNAME',
  DATABASE_PASSWORD = 'DATABASE_PASSWORD',
  DATABASE_DATABASE = 'DATABASE_DATABASE',
}

@Injectable()
export class EnvironmentService {
  get(key: ENV_KEY): string {
    return process.env[key];
  }
}
