import { ApiProperty } from "@nestjs/swagger";

export class CreateSubjectDto {
  
  @ApiProperty()
  term: number;
  
  @ApiProperty()
  teacherId: number;
  
  @ApiProperty()
  name: string;
}
