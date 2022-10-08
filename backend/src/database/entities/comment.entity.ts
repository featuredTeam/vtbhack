import { Column, Entity, ManyToOne } from 'typeorm';
import { IdeaEntity } from './idea.entity';
import { BaseEntity } from './types/BaseEntity';
import { UserEntity } from './user.entity';

@Entity()
export class CommentEntity extends BaseEntity {
  @ManyToOne(() => IdeaEntity, (idea) => idea.id)
  public idea_id: IdeaEntity;

  @ManyToOne(() => UserEntity, (user) => user.id)
  public user_id: UserEntity;

  @Column()
  public text: string;
}
