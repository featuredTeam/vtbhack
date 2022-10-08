import { Column, Entity, ManyToOne } from 'typeorm';
import { CourseEntity } from './course.entity';
import { BaseEntity } from './types/BaseEntity';
import { CourseStatus } from './types/CourseStatus';
import { UserEntity } from './user.entity';

@Entity()
export class CommentEntity extends BaseEntity {
  @ManyToOne(() => CourseEntity, (course) => course.id)
  public course_id: CourseEntity;

  @ManyToOne(() => UserEntity, (user) => user.id)
  public user_id: UserEntity;

  @Column()
  public status: CourseStatus;
}
