import { IsNotEmpty, IsNumber, IsPositive, IsString } from 'class-validator';
import { Column, Entity } from 'typeorm';
import { BaseEntity } from './types/BaseEntity';

@Entity()
export class ItemEntity extends BaseEntity {
  @Column()
  @IsString()
  @IsNotEmpty()
  public name: string;

  @Column()
  @IsString()
  @IsNotEmpty()
  public image: string;

  @Column('float')
  @IsNumber()
  @IsPositive()
  public cost: number;
}
