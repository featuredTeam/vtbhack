import { PickType } from '@nestjs/swagger';
import { IsEnum, IsNumber } from 'class-validator';
import { AchievementEntity } from '../../../database/entities/achievement.entity';
import { CourseEntity } from '../../../database/entities/course.entity';
import { CourseStatus } from '../../../../../common/constants/CourseStatus';
import { UserEntity } from '../../../database/entities/user.entity';

export class CourseEntityWithStatus extends CourseEntity {
  @IsEnum(CourseStatus)
  status: CourseStatus;
}
