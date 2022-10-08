import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Post,
  UseGuards,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { CoursesService } from './courses.service';
import { CourseEntity } from '../../database/entities/course.entity';
import { UserEntity } from '../../database/entities/user.entity';
import { CourseEntityWithStatus } from './types/CourseEntityWithStatus';
import { CourseDto } from './dto/course.dto';
import { AuthGuard } from '../../guards/auth.guard';

@ApiTags('courses')
@Controller('courses')
export class CoursesController {
  constructor(private readonly coursesService: CoursesService) {}

  @HttpCode(HttpStatus.OK)
  @Post()
  async create(@Body() course: CourseEntity): Promise<void> {
    await this.coursesService.create(course);
  }

  @HttpCode(HttpStatus.OK)
  @Delete()
  async delete(@Body() { id }: CourseDto): Promise<void> {
    await this.coursesService.delete(id);
  }

  @HttpCode(HttpStatus.OK)
  @Get()
  async get(
    @Body('user') user: UserEntity,
  ): Promise<CourseEntity[] | CourseEntityWithStatus[]> {
    if (user) return await this.coursesService.get(user);
    return await this.coursesService.getAll();
  }

  @UseGuards(AuthGuard)
  @HttpCode(HttpStatus.OK)
  @Post('enroll')
  async enroll(
    @Body('user') user: UserEntity,
    @Body() { id }: CourseDto,
  ): Promise<void> {
    await this.coursesService.enroll(user, id);
  }

  @UseGuards(AuthGuard)
  @HttpCode(HttpStatus.OK)
  @Post('finish')
  async finish(
    @Body('user') user: UserEntity,
    @Body() { id }: CourseDto,
  ): Promise<void> {
    await this.coursesService.finish(user, id);
  }
}
