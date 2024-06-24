import { IsDateString, IsEnum, IsNotEmpty, IsOptional } from 'class-validator';
import { UserType } from '../entities/user.entity';
import { ApiProperty } from '@nestjs/swagger';

export class FindUserDTO {
  @IsOptional()
  @IsNotEmpty()
  
  @ApiProperty()
  name?: string;

  @IsOptional()
  @IsNotEmpty()
  @IsDateString()
  
  @ApiProperty()
  startDate?: Date;

  @IsOptional()
  @IsNotEmpty()
  @IsDateString()
  
  @ApiProperty()
  endDate?: Date;

  @IsOptional()
  @IsNotEmpty()
  @IsEnum(UserType)
  
  @ApiProperty()
  userType?: UserType;
}
