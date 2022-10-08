import { IsString } from 'class-validator';
import { Column, Entity, ManyToOne } from 'typeorm';
import { ItemEntity } from './item.entity';
import { BaseEntity } from './types/BaseEntity';
import { UserEntity } from './user.entity';

@Entity()
export class ItemUserEntity extends BaseEntity {
  @ManyToOne(() => UserEntity, (user) => user.id)
  public user_id: UserEntity;

  @ManyToOne(() => ItemEntity, (item) => item.id)
  public item_id: ItemEntity;

  @Column({ default: 'address' })
  @IsString()
  public data: string;
}
