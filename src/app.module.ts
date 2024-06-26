import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { UserModule } from './user/user.module';
import { HealthModule } from './health/health.module';
import { LoginModule } from './login/login.module';
import { EnvironmentModule } from './environment/environment.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { IOREDIS_PROVIDER } from './persistency/login-challenge-redis/login-challenge-redis.provider';
import { TeacherModule } from './teacher/teacher.module';
import { SubjectModule } from './subject/subject.module';
import { MaterialModule } from './material/material.module';
import { FileModule } from './file/file.module';
import { RatingModule } from './rating/rating.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      ignoreEnvFile: process.env.NODE_ENV === 'production',
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) => ({
        type: 'postgres',
        host: configService.get<string>('DATABASE_HOST'),
        port: Number(configService.get<number>('DATABASE_PORT')),
        username: configService.get<string>('DATABASE_USERNAME'),
        password: configService.get<string>('DATABASE_PASSWORD'),
        database: configService.get<string>('DATABASE_DATABASE'),
        entities: [__dirname + '/**/*.entity{.ts,.js}'],
        synchronize: true,
      }),
    }),
    EnvironmentModule,
    HealthModule,
    UserModule,
    LoginModule,
    TeacherModule,
    SubjectModule,
    MaterialModule,
    FileModule,
    RatingModule,
  ],
  providers: [IOREDIS_PROVIDER],
})
export class AppModule {}
