import { Injectable } from '@nestjs/common';
import { CreateSubjectDto } from './dto/create-subject.dto';
import { UpdateSubjectDto } from './dto/update-subject.dto';
import { Subject } from './entities/subject.entity';
import { Like, Repository, Between } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { addDays } from 'date-fns';
import { FindSubjectsDTO } from './dto/find-subjects.dto';

@Injectable()
export class SubjectService {
  constructor(
    @InjectRepository(Subject)
    private subjectRepository: Repository<Subject>
  ) {}
  create(createUserDto: CreateSubjectDto) {
    return this.subjectRepository.save(createUserDto);
  }

  findAllBy(findSubjectsDTO: FindSubjectsDTO) {
    console.log('findSubjectsDTO', findSubjectsDTO);
    console.log({
      name: findSubjectsDTO.name
        ? Like(`%${findSubjectsDTO.name}%`)
        : undefined,
      createdAt: Between(
        findSubjectsDTO.startDate ?? new Date('2024-01-01'),
        findSubjectsDTO.endDate ?? new Date()
      ),
    });
    return this.subjectRepository.find({
      where: {
        name: findSubjectsDTO.name
          ? Like(`%${findSubjectsDTO.name}%`)
          : undefined,
        createdAt: Between(
          findSubjectsDTO.startDate ?? new Date('2024-01-01'),
          findSubjectsDTO.endDate ?? addDays(new Date(), 1)
        ),
      },
    });
  }

  findOne(id: number) {
    return this.subjectRepository.findOne({ where: { id } });
  }
  update(id: number, updateUserDto: UpdateSubjectDto) {
    return this.subjectRepository.update(id, updateUserDto);
  }

  remove(id: number) {
    return this.subjectRepository.delete(id);
  }
}
