import { Column, Entity, ManyToOne } from 'typeorm';
import { BaseEntity } from './types/BaseEntity';
import { IdeaStatus } from './types/IdeaStatus';
import { UserEntity } from './user.entity';

@Entity()
export class ItemEntity extends BaseEntity {
  @Column()
  public name: string;

  @Column()
  public cost: number;

  @Column()
  public image: Buffer;

  @Column()
  public available: boolean;
}
