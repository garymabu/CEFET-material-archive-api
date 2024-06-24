import { ApiProperty } from "@nestjs/swagger";

export class RateMaterialDto {
  @ApiProperty()
  
  @ApiProperty()
  value: number;
  
  @ApiProperty()
  materialId: number;
  
  @ApiProperty()
  userId: number;
}
