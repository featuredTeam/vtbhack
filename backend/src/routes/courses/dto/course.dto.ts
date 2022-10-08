import { IsNumber } from 'class-validator';

export class CourseDto {
  @IsNumber()
  id: number;
}
