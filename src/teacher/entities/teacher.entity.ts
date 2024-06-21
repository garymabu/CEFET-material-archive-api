import { BaseEntity } from 'src/persistency/cefet-material-archive-db/base-entity';
import { Subject } from 'src/subject/entities/subject.entity';
import { User } from 'src/user/entities/user.entity';
import { Column, Entity, JoinColumn, OneToMany, OneToOne } from 'typeorm';

@Entity()
export class Teacher extends BaseEntity {
  @OneToMany(() => Subject, (subject) => subject.teacher)
  subjects: Subject[];

  @OneToOne(() => User)
  @JoinColumn({ name: 'userId' }) // This is the column in the Teacher table that will be used as the foreign key
  user: User;

  @Column({ type: 'int' })
  userId: number;
}
