import {
  IsBoolean,
  IsNotEmpty,
  IsNumber,
  IsPositive,
  IsString,
} from 'class-validator';
import { Column, Entity } from 'typeorm';
import { BaseEntity } from './types/BaseEntity';

@Entity()
export class ItemEntity extends BaseEntity {
  @Column()
  @IsString()
  @IsNotEmpty()
  public name: string;

  @Column()
  @IsNumber()
  @IsPositive()
  public cost: number;

  @Column()
  @IsBoolean()
  public available: boolean;
}
