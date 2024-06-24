import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsOptional } from 'class-validator';

export class FindMaterialsDTO {
  @IsOptional()
  @IsNotEmpty()
  @ApiProperty()
  description?: string;

  @IsOptional()
  @IsNotEmpty()
  @ApiProperty()
  subjectId?: number;
}
