import { Injectable } from '@nestjs/common';
import { CreateMaterialDto } from './dto/create-material.dto';
import { UpdateMaterialDto } from './dto/update-material.dto';
import { Material } from './entities/material.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Rating } from 'src/rating/entities/rating.entity';
import { RatingService } from 'src/rating/rating.service';
import { RateMaterialDto } from './dto/rate-material.dto';

@Injectable()
export class MaterialService {
  constructor(
    @InjectRepository(Material)
    private materialRepository: Repository<Material>,
    private ratingService: RatingService
  ) {}
  create(createMaterialDto: CreateMaterialDto) {
    return this.materialRepository.save(createMaterialDto);
  }

  async findAllWithRatings() {
    const materials = await this.materialRepository.find({
      relations: ['ratings'],
    });

    return materials.map((material) => ({
      ...material,
      rating: this.calculateRatingForMaterial(material.ratings ?? []),
    }));
  }

  private calculateRatingForMaterial(ratings: Rating[]) {
    const sum = ratings.map((item) => item.value).reduce((a, b) => a + b, 0);
    const average = sum / ratings.length;

    return average;
  }

  async getRating(materialId: number) {
    const material = await this.materialRepository.findOne({
      where: { id: materialId },
      relations: ['ratings'],
    });
    return {
      rating: this.calculateRatingForMaterial(material.ratings),
    };
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

  rateMaterial(rateMaterialDto: RateMaterialDto) {
    return this.ratingService.createOrUpdate(rateMaterialDto);
  }
}
