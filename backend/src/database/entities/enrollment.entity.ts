import { Column, Entity, ManyToOne } from 'typeorm';
import { BaseEntity } from './types/BaseEntity';
import { EnrollmentStatus } from './types/EnrollmentStatus';
import { UserEntity } from './user.entity';

@Entity()
export class EnrollmentEntity extends BaseEntity {
  @ManyToOne(() => UserEntity)
  public from: UserEntity;

  @ManyToOne(() => UserEntity)
  public to: UserEntity;

  @Column()
  public amount: number;

  @Column()
  public status: EnrollmentStatus;
}
