import { Injectable } from '@nestjs/common';
import { CreateRatingDto } from './dto/create-rating.dto';
import { UpdateRatingDto } from './dto/update-rating.dto';
import { Repository } from 'typeorm';
import { Rating } from './entities/rating.entity';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class RatingService {
  constructor(
    @InjectRepository(Rating)
    private ratingRepository: Repository<Rating>
  ) {}
  create(createRatingDto: CreateRatingDto) {
    return this.ratingRepository.save(createRatingDto);
  }

  async createOrUpdate(createRatingDto: CreateRatingDto) {
    const existingRating = await this.ratingRepository.findOne({
      where: {
        materialId: createRatingDto.materialId,
        userId: createRatingDto.userId,
      },
    });

    const rating: Partial<Rating> = {
      ...createRatingDto,
      id: existingRating?.id,
    };

    return this.ratingRepository.save(rating);
  }

  findAllFromMaterial(materialId: number) {
    return this.ratingRepository.find({
      where: { materialId },
    });
  }

  findAll() {
    return this.ratingRepository.find();
  }

  findOne(id: number) {
    return this.ratingRepository.findOne({ where: { id } });
  }

  update(id: number, updateRatingDto: UpdateRatingDto) {
    return this.ratingRepository.update(id, updateRatingDto);
  }

  remove(id: number) {
    return this.ratingRepository.delete(id);
  }
}
