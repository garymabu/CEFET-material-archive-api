import { Module } from '@nestjs/common';
import { FileController } from './file.controller';
import { FileService } from './file.service';
import { EnvironmentModule } from 'src/environment/environment.module';

@Module({
  imports: [EnvironmentModule],
  providers: [FileService],
  controllers: [FileController],
})
export class FileModule {}
