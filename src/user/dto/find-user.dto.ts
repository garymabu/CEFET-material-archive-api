import { IsDateString, IsEnum, IsNotEmpty, IsOptional } from 'class-validator';
import { UserType } from '../entities/user.entity';

export class FindUserDTO {
  @IsOptional()
  @IsNotEmpty()
  name?: string;

  @IsOptional()
  @IsNotEmpty()
  @IsDateString()
  startDate?: Date;

  @IsOptional()
  @IsNotEmpty()
  @IsDateString()
  endDate?: Date;

  @IsOptional()
  @IsNotEmpty()
  @IsEnum(UserType)
  userType?: UserType;
}
