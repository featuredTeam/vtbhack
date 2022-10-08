import { IsBoolean, IsEnum } from 'class-validator';
import { Column, Entity, ManyToOne } from 'typeorm';
import { IdeaEntity } from './idea.entity';
import { BaseEntity } from './types/BaseEntity';
import { ScoreType } from './types/ScoreType';
import { UserEntity } from './user.entity';

@Entity()
export class IdeaUserEntity extends BaseEntity {
  @ManyToOne(() => UserEntity, (user) => user.id)
  public user: UserEntity;

  @ManyToOne(() => IdeaEntity, (idea) => idea.id)
  public idea: IdeaEntity;

  @Column()
  @IsEnum(ScoreType)
  public score: ScoreType;
}
