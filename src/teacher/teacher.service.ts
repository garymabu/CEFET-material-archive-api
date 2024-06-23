import { Injectable } from '@nestjs/common';
import { CreateTeacherDto } from './dto/create-teacher.dto';
import { UpdateTeacherDto } from './dto/update-teacher.dto';
import { Teacher } from './entities/teacher.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class TeacherService {
  constructor(
    @InjectRepository(Teacher)
    private teacherRepository: Repository<Teacher>
  ) {}
  create(createUserDto: CreateTeacherDto) {
    return this.teacherRepository.save(createUserDto);
  }

  findAll() {
    return this.teacherRepository.find({ relations: ['user', 'subjects'] });
  }

  findOne(id: number) {
    return this.teacherRepository.findOne({ where: { id } });
  }

  update(id: number, updateUserDto: UpdateTeacherDto) {
    return this.teacherRepository.update(id, updateUserDto);
  }

  remove(id: number) {
    return this.teacherRepository.delete(id);
  }
}
