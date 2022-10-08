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
import { MentorsService } from './mentors.service';
import { UserEntity } from '../../database/entities/user.entity';
import { AuthGuard } from '../../guards/auth.guard';
import { IdDto } from '../../types/id.dto';
import { MentorEntity } from '../../database/entities/mentor.entity';

@ApiTags('mentors')
@Controller('mentors')
export class MentorsController {
  constructor(private readonly mentorsService: MentorsService) {}

  @UseGuards(AuthGuard)
  @HttpCode(HttpStatus.OK)
  @Post()
  async create(
    @Body('user') user: UserEntity,
    @Body() mentorRequest: MentorEntity,
  ): Promise<void> {
    await this.mentorsService.create(user, mentorRequest);
  }

  @UseGuards(AuthGuard)
  @HttpCode(HttpStatus.OK)
  @Post('apply')
  async apply(
    @Body('user') user: UserEntity,
    @Body() { id }: IdDto,
  ): Promise<void> {
    await this.mentorsService.apply(user, id);
  }

  @HttpCode(HttpStatus.OK)
  @Delete()
  async delete(@Body() { id }: IdDto): Promise<void> {
    await this.mentorsService.delete(id);
  }

  @Get()
  async get(): Promise<MentorEntity[]> {
    return await this.mentorsService.getAll();
  }
}
