import { Material } from 'src/material/entities/material.entity';
import { BaseEntity } from 'src/persistency/cefet-material-archive-db/base-entity';
import { User } from 'src/user/entities/user.entity';
import { Column, Entity, JoinColumn, ManyToOne } from 'typeorm';

@Entity()
export class Rating extends BaseEntity {
  @ManyToOne(() => Material, (material) => material.ratings, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'materialId' })
  material: Material;

  @ManyToOne(() => User, {
    onDelete: 'SET NULL',
  })
  @JoinColumn({ name: 'userId' })
  user: User;

  @Column({ type: 'decimal' })
  value: number;

  @Column({ type: 'int', nullable: true })
  userId: number;

  @Column({ type: 'int', nullable: true })
  materialId: number;
}
