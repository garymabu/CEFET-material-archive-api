import { ApiProperty } from "@nestjs/swagger";

export class CreateRatingDto {
  
  @ApiProperty()
  value: number;
  
  @ApiProperty()
  userId: number;
  
  @ApiProperty()
  materialId: number;
}
