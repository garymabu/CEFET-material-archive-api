import { BaseEntity } from 'src/persistency/cefet-material-archive-db/base-entity';
import { Column, Entity } from 'typeorm';

enum UserType {
  ADMIN,
  STUDENT,
  TEACHE,
}

@Entity()
export class User extends BaseEntity {
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
}
