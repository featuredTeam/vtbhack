import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  NotFoundException,
  Post,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { AchievementEntity } from '../../database/entities/achievement.entity';
import { IdDto } from '../../types/id.dto';
import { AchievementsService } from './achievements.service';
import { GiveAchievementDto } from './dto/giveAchievement.dto';

@ApiTags('achievements')
@Controller('achievements')
export class AchievementsController {
  constructor(private readonly achievementsService: AchievementsService) {}

  @Get()
  async getAll(): Promise<AchievementEntity[]> {
    return await this.achievementsService.getAll();
  }

  @HttpCode(HttpStatus.OK)
  @Post()
  async create(@Body() achievement: AchievementEntity): Promise<void> {
    await this.achievementsService.create(achievement);
  }

  @HttpCode(HttpStatus.OK)
  @Delete()
  async delete(@Body() { id }: IdDto): Promise<void> {
    await this.achievementsService.delete(id);
  }

  @HttpCode(HttpStatus.OK)
  @Post('give')
  async give(@Body() { username, id }: GiveAchievementDto): Promise<void> {
    await this.achievementsService.give(username, id);
  }
}
