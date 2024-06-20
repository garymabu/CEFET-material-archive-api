import { Module } from '@nestjs/common';
import { UserController } from './user.controller';
import { CefetMaterialArchiveDBModule } from 'src/persistency/cefet-material-archive-db/cefet-material-archive-db.module';
import { userProviders } from './user.providers';

@Module({
  imports: [CefetMaterialArchiveDBModule],
  controllers: [UserController],
  providers: [...userProviders],
})
export class UserModule {}
