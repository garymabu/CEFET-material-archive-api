import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { Repository } from 'typeorm';
import { User } from './entities/user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { EncryptionUtils } from 'src/encryption/encryption.utils';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {}
  create(createUserDto: CreateUserDto) {
    return this.userRepository.save(createUserDto);
  }

  findAll() {
    return this.userRepository.find();
  }

  findOne(id: number) {
    return this.userRepository.findOne({ where: { id } });
  }

  findOneByEmail(email: string) {
    return this.userRepository.findOne({ where: { email } });
  }

  findOneByUsername(userName: string) {
    return this.userRepository.findOne({ where: { userName } });
  }

  findOneByUsernameAndPasswordHash(userName: string, password: string) {
    return this.userRepository.findOne({
      where: { userName, passwordHash: password },
    });
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    return this.userRepository.update(id, updateUserDto);
  }

  remove(id: number) {
    return this.userRepository.delete(id);
  }

  updatePassword(id: number, password: string) {
    const passwordHash = EncryptionUtils.hashPassword(password);
    return this.userRepository.update(id, { passwordHash });
  }
}
