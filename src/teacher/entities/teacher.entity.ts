import { BaseEntity } from 'src/persistency/cefet-material-archive-db/base-entity';
import { Subject } from 'src/subject/entities/subject.entity';
import { User } from 'src/user/entities/user.entity';
import { Column, Entity, JoinColumn, OneToMany, OneToOne } from 'typeorm';

@Entity()
export class Teacher extends BaseEntity {
  @OneToMany(() => Subject, (subject) => subject.teacher, {
    onDelete: 'SET NULL',
  })
  subjects: Subject[];

  @OneToOne(() => User, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'userId' })
  user: User;

  @Column({ type: 'int', nullable: true })
  userId: number;
}
