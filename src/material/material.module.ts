import { Module } from '@nestjs/common';
import { MaterialService } from './material.service';
import { MaterialController } from './material.controller';
import { Material } from './entities/material.entity';
import { AuthModule } from 'src/auth/auth.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RatingModule } from 'src/rating/rating.module';

@Module({
  imports: [TypeOrmModule.forFeature([Material]), AuthModule, RatingModule],
  controllers: [MaterialController],
  providers: [MaterialService],
})
export class MaterialModule {}
