import { Column, Entity, ManyToOne } from 'typeorm';
import { CourseEntity } from './course.entity';
import { BaseEntity } from './types/BaseEntity';
import { CourseStatus } from '../../../../common/constants/CourseStatus';
import { UserEntity } from './user.entity';
import { IsEnum } from 'class-validator';

@Entity()
export class CourseUserEntity extends BaseEntity {
  @ManyToOne(() => CourseEntity, (course) => course.id)
  public course: CourseEntity;

  @ManyToOne(() => UserEntity, (user) => user.id)
  public user: UserEntity;

  @Column()
  @IsEnum(CourseStatus)
  public status: CourseStatus;
}
