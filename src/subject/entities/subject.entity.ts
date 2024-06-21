import { Material } from 'src/material/entities/material.entity';
import { BaseEntity } from 'src/persistency/cefet-material-archive-db/base-entity';
import { Teacher } from 'src/teacher/entities/teacher.entity';
import { Column, Entity, JoinColumn, ManyToOne, OneToMany } from 'typeorm';

@Entity()
export class Subject extends BaseEntity {
  @ManyToOne(() => Teacher, (teacher) => teacher.subjects)
  @JoinColumn({ name: 'teacherId' })
  teacher: Teacher;

  @OneToMany(() => Material, (material) => material.subject)
  materials: Material[];

  @Column({ type: 'int' })
  teacherId: number;

  @Column({ type: 'int' })
  term: number;

  @Column()
  name: string;
}
