import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { Repository } from 'typeorm';
import { User, UserType } from './entities/user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { EncryptionUtils } from 'src/encryption/encryption.utils';
import { randomBytes } from 'crypto';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>
  ) {}
  create({ email, name, type }: CreateUserDto) {
    const existingUser = this.userRepository.find({ where: { email } });
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

  findAllByType(type: UserType) {
    return this.userRepository.find({ where: { type } });
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
