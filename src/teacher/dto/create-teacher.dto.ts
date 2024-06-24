import { ApiProperty } from "@nestjs/swagger";

export class CreateTeacherDto {
  @ApiProperty()
  userId: number;
}
