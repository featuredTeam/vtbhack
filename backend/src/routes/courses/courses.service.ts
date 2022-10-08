import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CourseEntity } from '../../database/entities/course.entity';
import { CourseUserEntity } from '../../database/entities/course_user.entity';
import { CourseStatus } from '../../../../common/constants/CourseStatus';
import { UserEntity } from '../../database/entities/user.entity';
import { VtbService } from '../../modules/vtb/vtb.service';
import { UsersService } from '../users/users.service';
import { CourseEntityWithStatus } from './types/CourseEntityWithStatus';

@Injectable()
export class CoursesService {
  constructor(
    @InjectRepository(CourseEntity)
    private readonly coursesRepository: Repository<CourseEntity>,
    @InjectRepository(CourseUserEntity)
    private readonly coursesUsersRepository: Repository<CourseUserEntity>,
  ) {}

  public async create(course: CourseEntity): Promise<void> {
    const foundCourse = await this.coursesRepository.findOne({
      where: {
        name: course.name,
      },
    });
    if (foundCourse) throw new ConflictException();

    await this.coursesRepository.save(course);
  }

  public async getAll(): Promise<CourseEntity[]> {
    return await this.coursesRepository.find();
  }

  public async get(
    user: UserEntity,
  ): Promise<CourseEntity[] | CourseEntityWithStatus[]> {
    const courses = await this.coursesRepository.find();

    const coursesByUser = await this.coursesUsersRepository.find({
      where: {
        user,
      },
      relations: {
        course: true,
        user: true,
      },
    });

    const newCourses = courses.map(
      (course: CourseEntity): CourseEntityWithStatus => {
        const courseUser = coursesByUser.find(
          (userCourse) => userCourse.course.id === course.id,
        );

        return {
          status: courseUser ? courseUser.status : CourseStatus.NotStarted,
          ...course,
        };
      },
    );

    return newCourses;
  }

  public async delete(id: number): Promise<void> {
    const foundCourse = await this.coursesRepository.findOne({
      where: {
        id,
      },
    });
    if (!foundCourse) throw new NotFoundException();

    await this.coursesRepository.delete(foundCourse);
  }

  public async enroll(user: UserEntity, id: number): Promise<void> {
    const course = await this.coursesRepository.findOne({
      where: {
        id,
      },
    });

    if (!course) throw new NotFoundException();

    const coursesByUser = await this.coursesUsersRepository.find({
      where: {
        user,
      },
      relations: {
        course: true,
        user: true,
      },
    });

    const courseUser = coursesByUser.find(
      (courseUser) => courseUser.course.id === id,
    );
    console.log(coursesByUser);
    if (courseUser) throw new ConflictException();

    await this.coursesUsersRepository.save({
      course,
      user,
      status: CourseStatus.InProgress,
    });
  }

  public async finish(user: UserEntity, id: number): Promise<void> {
    const course = await this.coursesRepository.findOne({
      where: {
        id,
      },
    });

    const coursesByUser = await this.coursesUsersRepository.find({
      where: {
        user,
      },
      relations: {
        course: true,
        user: true,
      },
    });

    const courseUser = coursesByUser.find(
      (courseUser) => courseUser.course.id === id,
    );
    if (!courseUser) throw new NotFoundException();

    await this.coursesUsersRepository.update(
      { id: courseUser.id },
      {
        status: CourseStatus.Completed,
      },
    );
  }
}
