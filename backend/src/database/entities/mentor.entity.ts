import { ApiHideProperty } from '@nestjs/swagger';
import { IsBoolean, IsEnum, IsNotEmpty, IsString } from 'class-validator';
import { Column, Entity, ManyToOne } from 'typeorm';
import { IdeaEntity } from './idea.entity';
import { BaseEntity } from './types/BaseEntity';
import { ScoreType } from './types/ScoreType';
import { UserEntity } from './user.entity';

@Entity()
export class MentorEntity extends BaseEntity {
  @ManyToOne(() => UserEntity, (user) => user.id, {
    onDelete: 'CASCADE',
    eager: true,
  })
  @ApiHideProperty()
  public mentor: UserEntity | null;

  @ManyToOne(() => UserEntity, (user) => user.id, {
    onDelete: 'CASCADE',
    eager: true,
  })
  @ApiHideProperty()
  public user: UserEntity;

  @Column()
  @IsString()
  @IsNotEmpty()
  public title: string;

  @Column()
  @IsString()
  @IsNotEmpty()
  public text: string;
}
