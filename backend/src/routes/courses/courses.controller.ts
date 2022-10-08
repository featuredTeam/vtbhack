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
import { DeleteCourseDto } from './dto/delete.dto';
import { CourseDto } from './dto/course.dto';
import { AuthGuard } from '../../guards/auth.guard';

@ApiTags('courses')
@Controller('courses')
export class CoursesController {
  constructor(private readonly coursesService: CoursesService) {}

  //   @UseGuards(AuthGuard)
  //   @HttpCode(HttpStatus.OK)
  //   @Post('send')
  //   async send(
  //     @Body() { to, amount }: EnrollementDto,
  //     @Body('user') user: UserEntity,
  //   ): Promise<void> {
  //     await this.transactionsService.send(user, to, amount);
  //   }

  //   @UseGuards(AuthGuard)
  //   @HttpCode(HttpStatus.OK)
  //   @Post('transform')
  //   async transform(
  //     @Body() { amount }: TransformDto,
  //     @Body('user') user: UserEntity,
  //   ): Promise<void> {
  //     await this.transactionsService.tranform(user, amount);
  //   }

  //   @UseGuards(AuthGuard)
  //   @HttpCode(HttpStatus.OK)
  //   @Post('give')
  //   async give(@Body() { to, amount }: EnrollementDto): Promise<void> {
  //     await this.transactionsService.give(to, amount);
  //   }

  @HttpCode(HttpStatus.OK)
  @Post()
  async create(@Body() course: CourseEntity): Promise<void> {
    await this.coursesService.create(course);
  }

  @HttpCode(HttpStatus.OK)
  @Delete()
  async delete(@Body() { name }: DeleteCourseDto): Promise<void> {
    await this.coursesService.delete(name);
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
