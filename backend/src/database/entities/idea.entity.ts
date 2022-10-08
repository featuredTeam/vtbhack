import { Column, Entity, ManyToOne } from 'typeorm';
import { BaseEntity } from './types/BaseEntity';
import { IdeaStatus } from './types/IdeaStatus';
import { UserEntity } from './user.entity';

@Entity()
export class IdeaEntity extends BaseEntity {
  @ManyToOne(() => UserEntity, (user) => user.id)
  public author: UserEntity;

  @Column()
  public title: string;

  @Column()
  public description: string;

  @Column()
  public score: number;

  @Column()
  public amount?: number;

  @Column()
  public status: IdeaStatus;
}
