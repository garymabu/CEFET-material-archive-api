import { MaterialType } from '../entities/material.entity';

export class CreateMaterialDto {
  type: MaterialType;
  description: string;
  dataUrl: string;
  subjectId: number;
}
