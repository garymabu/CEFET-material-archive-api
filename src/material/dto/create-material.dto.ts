import { ApiProperty } from '@nestjs/swagger';
import { MaterialType } from '../entities/material.entity';

export class CreateMaterialDto {
  
  @ApiProperty()
  type: MaterialType;
  
  @ApiProperty()
  description: string;
  
  @ApiProperty()
  dataUrl: string;
  
  @ApiProperty()
  subjectId: number;
}
