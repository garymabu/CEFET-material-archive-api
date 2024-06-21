import { Injectable } from '@nestjs/common';
import { CreateSubjectDto } from './dto/create-subject.dto';
import { UpdateSubjectDto } from './dto/update-subject.dto';
import { Subject } from './entities/subject.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class SubjectService {
  constructor(
    @InjectRepository(Subject)
    private subjectRepository: Repository<Subject>,
  ) {}
  create(createUserDto: CreateSubjectDto) {
    return this.subjectRepository.save(createUserDto);
  }

  findAll() {
    return this.subjectRepository.find();
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
