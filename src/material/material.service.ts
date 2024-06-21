import { Injectable } from '@nestjs/common';
import { CreateMaterialDto } from './dto/create-material.dto';
import { UpdateMaterialDto } from './dto/update-material.dto';
import { Material } from './entities/material.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class MaterialService {
  constructor(
    @InjectRepository(Material)
    private materialRepository: Repository<Material>,
  ) {}
  create(createMaterialDto: CreateMaterialDto) {
    return this.materialRepository.save(createMaterialDto);
  }

  findAll() {
    return this.materialRepository.find({
      relations: ['subject'],
    });
  }

  findOne(id: number) {
    return this.materialRepository.findOne({ where: { id } });
  }

  update(id: number, updateMaterialDto: UpdateMaterialDto) {
    return this.materialRepository.update(id, updateMaterialDto);
  }

  remove(id: number) {
    return this.materialRepository.delete(id);
  }
}
