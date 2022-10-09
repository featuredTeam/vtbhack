import { Column, Entity, ManyToOne, OneToOne } from 'typeorm';
import { BaseEntity } from './types/BaseEntity';
import { UserRole } from '../../../../common/constants/UserRole';
import { UserEntity } from './user.entity';

@Entity()
export class UserRoleEntity extends BaseEntity {
  @ManyToOne(() => UserEntity, (user) => user.id, {
    onDelete: 'CASCADE',
  })
  public user: UserEntity;

  @Column()
  public role: UserRole;
}
