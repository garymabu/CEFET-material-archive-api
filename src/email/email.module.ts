import { Module } from '@nestjs/common';
import { EmailService } from './email.service';
import { EnvironmentModule } from 'src/environment/environment.module';

@Module({
  imports: [EnvironmentModule],
  providers: [EmailService],
  exports: [EmailService],
})
export class EmailModule {}
