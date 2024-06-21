import { Module } from '@nestjs/common';
import { LoginController } from './login.controller';
import { AuthModule } from 'src/auth/auth.module';
import { LoginService } from './login.service';
import { UserModule } from 'src/user/user.module';

@Module({
  controllers: [LoginController],
  imports: [AuthModule, UserModule],
  providers: [LoginService],
})
export class LoginModule {}
