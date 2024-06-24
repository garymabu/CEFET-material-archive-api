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
  name?: string;

  @IsOptional()
  @IsNotEmpty()
  @IsDateString()
  startDate?: Date;

  @IsOptional()
  @IsNotEmpty()
  @IsDate()
  endDate?: Date;
}
