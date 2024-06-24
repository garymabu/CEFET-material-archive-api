import { IsNotEmpty, IsOptional } from 'class-validator';

export class FindMaterialsDTO {
  @IsOptional()
  @IsNotEmpty()
  description?: string;

  @IsOptional()
  @IsNotEmpty()
  subjectId?: number;
}
