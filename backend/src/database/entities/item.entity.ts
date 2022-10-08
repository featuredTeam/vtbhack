import {
  IsDecimal,
  IsNotEmpty,
  IsNumber,
  IsPositive,
  IsString,
  Min,
} from 'class-validator';
import { Column, Entity } from 'typeorm';
import { BaseEntity } from './types/BaseEntity';

@Entity()
export class ItemEntity extends BaseEntity {
  @Column()
  @IsString()
  @IsNotEmpty()
  public name: string;

  @Column('float')
  @IsNumber()
  @IsPositive()
  public cost: number;
}
