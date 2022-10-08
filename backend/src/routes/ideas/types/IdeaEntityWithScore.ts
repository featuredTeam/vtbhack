import { IsNumber } from 'class-validator';
import { IdeaEntity } from '../../../database/entities/idea.entity';

export class IdeaEntityWithScore extends IdeaEntity {
  @IsNumber()
  score: number;
}
