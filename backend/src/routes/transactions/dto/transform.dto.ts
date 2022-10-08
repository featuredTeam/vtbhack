import { IsNumber, IsPositive } from 'class-validator';

export class TransformDto {
  @IsNumber()
  @IsPositive()
  public amount: number;
}
