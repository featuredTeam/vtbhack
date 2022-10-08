import { IsEnum } from 'class-validator';
import { CourseEntity } from '../../../database/entities/course.entity';
import { CourseStatus } from '../../../../../common/constants/CourseStatus';

export class CourseEntityWithStatus extends CourseEntity {
  @IsEnum(CourseStatus)
  status: CourseStatus;
}
