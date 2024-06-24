import { Injectable } from '@nestjs/common';
import { CreateTeacherDto } from './dto/create-teacher.dto';
import { UpdateTeacherDto } from './dto/update-teacher.dto';
import { Teacher } from './entities/teacher.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Between, Like, Repository } from 'typeorm';
import { FindTeachersDTO } from './dto/find-teachers.dto';
import { addDays } from 'date-fns';

@Injectable()
export class TeacherService {
  constructor(
    @InjectRepository(Teacher)
    private teacherRepository: Repository<Teacher>
  ) {}
  create(createUserDto: CreateTeacherDto) {
    return this.teacherRepository.save(createUserDto);
  }

  findAllBy(findTeachersDTO: FindTeachersDTO) {
    return this.teacherRepository.find({
      where: {
        user: {
          displayName: findTeachersDTO.name
            ? Like(`%${findTeachersDTO.name}%`)
            : undefined,
          type: findTeachersDTO.userType,
          createdAt: Between(
            findTeachersDTO.startDate ?? new Date('2024-01-01'),
            findTeachersDTO.endDate ?? addDays(new Date(), 1)
          ),
        },
      },
      relations: ['user', 'subjects'],
    });
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
