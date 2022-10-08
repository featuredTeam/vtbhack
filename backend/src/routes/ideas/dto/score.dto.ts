import { IsEnum } from 'class-validator';
import { ScoreType } from '../../../database/entities/types/ScoreType';
import { IdDto } from '../../../types/id.dto';

export class ScoreDto extends IdDto {
  @IsEnum(ScoreType)
  public score: ScoreType;
}
