import { PickType } from '@nestjs/swagger';
import { CourseEntity } from '../../../database/entities/course.entity';

export class DeleteCourseDto extends PickType(CourseEntity, ['name']) {}
