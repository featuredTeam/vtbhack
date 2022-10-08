import { ApiHideProperty } from '@nestjs/swagger';
import {
  IsEnum,
  IsNotEmpty,
  IsNumber,
  IsPositive,
  IsString,
} from 'class-validator';
import { Column, Entity, ManyToOne } from 'typeorm';
import { BaseEntity } from './types/BaseEntity';
import { IdeaStatus } from './types/IdeaStatus';
import { UserEntity } from './user.entity';

@Entity()
export class IdeaEntity extends BaseEntity {
  @ManyToOne(() => UserEntity, (user) => user.id)
  @ApiHideProperty()
  public user: UserEntity;

  @Column()
  @IsString()
  @IsNotEmpty()
  public title: string;

  @Column()
  @IsString()
  @IsNotEmpty()
  public description: string;

  @Column()
  @IsNumber()
  @IsPositive()
  public amount: number;

  @Column({ default: IdeaStatus.Created })
  @ApiHideProperty()
  public status: IdeaStatus;
}
