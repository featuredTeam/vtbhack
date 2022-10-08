import { IsArray, IsNotEmpty, IsOptional, IsString } from 'class-validator';
import {
  Column,
  Entity,
  JoinTable,
  ManyToMany,
  OneToMany,
  OneToOne,
} from 'typeorm';
import { AchievementEntity } from './achievement.entity';
import { BaseEntity } from './types/BaseEntity';
import { UserRole } from '../../../../common/constants/UserRole';
import { UserRoleEntity } from './user_role.entity';
import { DepartmentEntity } from './department.entity';

@Entity()
export class UserEntity extends BaseEntity {
  @Column()
  @IsString()
  @IsNotEmpty()
  public username: string;

  @IsString()
  @Column()
  public name: string;

  @IsString()
  @Column()
  public surname: string;

  @Column({ nullable: true, default: null })
  @IsString()
  @IsOptional()
  public avatar?: string | null;

  @Column()
  @IsString()
  public publicKey: string;

  @Column()
  @IsString()
  public privateKey: string;

  @ManyToMany(() => AchievementEntity, (achievement) => achievement.users)
  public achievements: AchievementEntity[];

  @OneToMany(() => UserRoleEntity, (role) => role.user)
  @IsArray()
  public roles: UserRoleEntity[];

  @OneToMany(() => DepartmentEntity, (department) => department.id)
  public department_id: DepartmentEntity;
}
