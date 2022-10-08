import { ApiHideProperty } from '@nestjs/swagger';
import {
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsPositive,
  IsString,
} from 'class-validator';
import { Column, Entity, JoinTable, ManyToMany } from 'typeorm';
import { BaseEntity } from './types/BaseEntity';
import { ConditionType } from './types/ConditionType';
import { UserEntity } from './user.entity';

@Entity()
export class AchievementEntity extends BaseEntity {
  @Column()
  @IsString()
  @IsNotEmpty()
  public name: string;

  @Column()
  @IsString()
  @IsNotEmpty()
  public description: string;

  @Column({ nullable: true, default: null })
  @IsString()
  @IsNotEmpty()
  @IsOptional()
  public image?: string | null;

  @Column('float')
  @IsNumber()
  @IsPositive()
  public reward: number;

  @Column('json', { nullable: true })
  @IsOptional()
  public conditions?: ConditionType[] | null;

  @ManyToMany(() => UserEntity, (user) => user.achievements)
  @JoinTable()
  @ApiHideProperty()
  public users: UserEntity[];
}
