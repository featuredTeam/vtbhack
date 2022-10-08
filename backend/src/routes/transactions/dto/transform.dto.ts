import { IsNumber, IsPositive } from 'class-validator';
import { Column } from 'typeorm';

export class TransformDto {
  @Column()
  @IsNumber()
  @IsPositive()
  public amount: number;
}
