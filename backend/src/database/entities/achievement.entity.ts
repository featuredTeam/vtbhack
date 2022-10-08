import { Column, Entity, ManyToMany } from 'typeorm';
import { BaseEntity } from './types/BaseEntity';
import { ConditionType } from './types/ConditionType';
import { UserEntity } from './user.entity';

@Entity()
export class AchievementEntity extends BaseEntity {
  @Column()
  public name: string;

  @Column()
  public reward: number;

  @Column('json')
  public conditions: ConditionType[];

  @ManyToMany(() => UserEntity, (user) => user.achievements)
  public users: UserEntity[];
}
