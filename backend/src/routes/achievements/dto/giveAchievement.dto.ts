import { PickType } from '@nestjs/swagger';
import { IsNumber } from 'class-validator';
import { AchievementEntity } from '../../../database/entities/achievement.entity';
import { UserEntity } from '../../../database/entities/user.entity';

export class GiveAchievementDto extends PickType(UserEntity, ['username']) {
  @IsNumber()
  id: number;
}
