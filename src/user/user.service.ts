import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { Between, Like, Repository } from 'typeorm';
import { User } from './entities/user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { EncryptionUtils } from 'src/encryption/encryption.utils';
import { randomBytes } from 'crypto';
import { FindUserDTO } from './dto/find-user.dto';
import { addDays } from 'date-fns';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>
  ) {}
  async create({ email, name, type }: CreateUserDto) {
    const existingUser = await this.userRepository.findOne({
      where: { email },
    });
    if (existingUser) {
      throw new BadRequestException('User with this email already exists');
    }

    return this.userRepository.save({
      displayName: name,
      email,
      userName: email,
      type,
      password: randomBytes(16).toString('hex'),
      passwordHash: EncryptionUtils.hashPassword(
        randomBytes(16).toString('hex')
      ),
    });
  }

  findAllBy(query: FindUserDTO) {
    return this.userRepository.find({
      where: {
        displayName: query.name ? Like(`%${query.name}%`) : undefined,
        type: query.userType,
        createdAt: Between(
          query.startDate ?? new Date('2024-01-01'),
          query.endDate ?? addDays(new Date(), 1)
        ),
      },
    });
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

  update(id: number, { email, name, type }: UpdateUserDto) {
    return this.userRepository.update(id, {
      displayName: name,
      email,
      userName: email,
      type,
    });
  }

  remove(id: number) {
    return this.userRepository.delete(id);
  }

  updatePassword(id: number, password: string) {
    const passwordHash = EncryptionUtils.hashPassword(password);
    return this.userRepository.update(id, { passwordHash });
  }
}
