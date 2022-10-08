import { IsNumber, IsPositive, IsString } from 'class-validator';
import { Column } from 'typeorm';

export class EnrollementDto {
  @IsString()
  to: string;

  @IsNumber()
  @IsPositive()
  public amount: number;
}
