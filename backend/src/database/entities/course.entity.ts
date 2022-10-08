import { Column, Entity } from 'typeorm';
import { BaseEntity } from './types/BaseEntity';

@Entity()
export class CourseEntity extends BaseEntity {
  @Column()
  public name: string;

  @Column()
  public data: string;

  @Column({ default: false })
  public required: boolean;
}
