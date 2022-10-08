import { Column, Entity, ManyToOne } from 'typeorm';
import { IdeaEntity } from './idea.entity';
import { BaseEntity } from './types/BaseEntity';
import { IdeaWorkerStatus } from './types/IdeaWorkerStatus';
import { UserEntity } from './user.entity';

@Entity()
export class IdeaWorkerEntity extends BaseEntity {
  @ManyToOne(() => UserEntity, (user) => user.id)
  public user_id: UserEntity;

  @ManyToOne(() => IdeaEntity, (idea) => idea.id)
  public idea_id: IdeaEntity;

  @Column()
  public status: IdeaWorkerStatus;
}
