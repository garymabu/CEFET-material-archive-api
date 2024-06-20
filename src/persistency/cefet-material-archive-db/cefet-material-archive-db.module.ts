import { Module } from '@nestjs/common';
import { databaseProviders } from './cefet-material-archive-db.providers';
import { EnvironmentModule } from 'src/environment/environment.module';

@Module({
  imports: [EnvironmentModule],
  providers: [...databaseProviders],
  exports: [...databaseProviders],
})
export class CefetMaterialArchiveDBModule {}
