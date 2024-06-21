import { EncryptionUtils } from 'src/encryption/encryption.utils';
import { BaseEntity } from 'src/persistency/cefet-material-archive-db/base-entity';
import { BeforeInsert, Column, Entity } from 'typeorm';

export enum UserType {
  ADMIN,
  STUDENT,
  TEACHE,
}

@Entity()
export class User extends BaseEntity {
  password: string;

  @Column({ select: false })
  passwordHash: string;

  @Column({
    type: 'enum',
    enum: UserType,
    default: UserType.STUDENT,
  })
  type: UserType;

  @Column()
  displayName: string;

  @Column()
  userName: string;

  @Column()
  email: string;

  @BeforeInsert()
  async hashPassword() {
    this.passwordHash = await EncryptionUtils.hashPassword(this.password);
  }
}
