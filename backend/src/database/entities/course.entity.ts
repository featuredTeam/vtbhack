import { IsBoolean, IsNotEmpty, IsOptional, IsString } from 'class-validator';
import { Column, Entity } from 'typeorm';
import { BaseEntity } from './types/BaseEntity';

@Entity()
export class CourseEntity extends BaseEntity {
  @Column()
  @IsString()
  @IsNotEmpty()
  public name: string;

  @Column()
  @IsString()
  @IsNotEmpty()
  public link: string;

  @Column({ nullable: true, default: null })
  @IsString()
  @IsNotEmpty()
  @IsOptional()
  public image?: string | null;

  @Column({ default: false })
  @IsBoolean()
  public required: boolean;
}
