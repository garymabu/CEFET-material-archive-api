import { ApiProperty } from '@nestjs/swagger';
import { UserType } from '../entities/user.entity';

export class CreateUserDto {
  
  @ApiProperty()
  name: string;
  
  @ApiProperty()
  email: string;
  
  @ApiProperty()
  type: UserType;
}
