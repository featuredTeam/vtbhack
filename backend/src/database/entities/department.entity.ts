import { Column, Entity } from 'typeorm';
import { BaseEntity } from './types/BaseEntity';

@Entity()
export class DepartmentEntity extends BaseEntity {
  @Column()
  public name: string;
}
