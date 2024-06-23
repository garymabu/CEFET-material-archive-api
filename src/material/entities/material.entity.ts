import { BaseEntity } from 'src/persistency/cefet-material-archive-db/base-entity';
import { Subject } from 'src/subject/entities/subject.entity';
import { Column, Entity, JoinColumn, ManyToOne } from 'typeorm';

export enum MaterialType {
  SLIDE,
  SUPPORT_MATERIAL,
  EXAM,
  OTHER,
}

@Entity()
export class Material extends BaseEntity {
  @ManyToOne(() => Subject, (subject) => subject.materials, {
    onDelete: 'SET NULL',
  })
  @JoinColumn({ name: 'subjectId' })
  subject: Subject;

  @Column({
    type: 'enum',
    enum: MaterialType,
    default: MaterialType.OTHER,
  })
  type: MaterialType;

  @Column()
  description: string;

  @Column()
  dataUrl: string;

  @Column({ type: 'int', nullable: true })
  subjectId: number;
}
