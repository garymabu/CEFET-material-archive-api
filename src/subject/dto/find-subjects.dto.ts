import { ApiProperty } from '@nestjs/swagger';
import {
  IsDate,
  IsDateString,
  IsNotEmpty,
  IsOptional,
  IsString,
} from 'class-validator';

export class FindSubjectsDTO {
  @IsOptional()
  @IsNotEmpty()
  @IsString()
  @ApiProperty()
  name?: string;

  @IsOptional()
  @IsNotEmpty()
  @IsDateString()
  @ApiProperty()
  startDate?: Date;

  @IsOptional()
  @IsNotEmpty()
  @IsDate()
  @ApiProperty()
  endDate?: Date;
}
