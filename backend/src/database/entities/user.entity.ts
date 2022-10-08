import { IsArray, IsNotEmpty, IsOptional, IsString } from 'class-validator';
import { Column, Entity, ManyToMany, OneToMany } from 'typeorm';
import { AchievementEntity } from './achievement.entity';
import { BaseEntity } from './types/BaseEntity';
import { UserRoleEntity } from './user_role.entity';

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

  @Column()
  @IsString()
  public publicKey: string;

  @Column()
  @IsString()
  public privateKey: string;

  @OneToMany(() => UserRoleEntity, (role) => role.user, { eager: true })
  @IsArray()
  public roles: UserRoleEntity[];
}
