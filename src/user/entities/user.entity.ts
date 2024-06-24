import { EncryptionUtils } from 'src/encryption/encryption.utils';
import { BaseEntity } from 'src/persistency/cefet-material-archive-db/base-entity';
import { Rating } from 'src/rating/entities/rating.entity';
import { BeforeInsert, Column, Entity, OneToMany } from 'typeorm';

export enum UserType {
  ADMIN,
  STUDENT,
  TEACHE,
}

@Entity()
export class User extends BaseEntity {
  @OneToMany(() => Rating, (rating) => rating.material)
  ratings: Rating[];

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

  @Column({ unique: true })
  email: string;

  @BeforeInsert()
  async hashPassword() {
    this.passwordHash = await EncryptionUtils.hashPassword(this.password);
  }
}
