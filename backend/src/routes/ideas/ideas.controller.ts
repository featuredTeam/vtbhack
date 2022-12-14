import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Post,
  Query,
  UseGuards,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { IdeasService } from './ideas.service';
import { UserEntity } from '../../database/entities/user.entity';
import { AuthGuard } from '../../guards/auth.guard';
import { IdeaEntity } from '../../database/entities/idea.entity';
import { IdeaStatus } from '../../database/entities/types/IdeaStatus';
import { IdeaEntityWithScore } from './types/IdeaEntityWithScore';
import { IdDto } from '../../types/id.dto';
import { ScoreType } from '../../database/entities/types/ScoreType';
import { ScoreDto } from './dto/score.dto';

@ApiTags('ideas')
@Controller('ideas')
export class IdeasController {
  constructor(private readonly ideasService: IdeasService) {}

  @UseGuards(AuthGuard)
  @HttpCode(HttpStatus.OK)
  @Post()
  async create(
    @Body('user') user: UserEntity,
    @Body() idea: IdeaEntity,
  ): Promise<IdeaEntity> {
    return await this.ideasService.create(user, idea);
  }

  @HttpCode(HttpStatus.OK)
  @Delete()
  async delete(@Body() { id }: IdDto): Promise<void> {
    await this.ideasService.delete(id);
  }

  @Get()
  async get(): Promise<IdeaEntityWithScore[]> {
    return await this.ideasService.getAll();
  }

  @UseGuards(AuthGuard)
  @HttpCode(HttpStatus.OK)
  @Post('score')
  async score(
    @Body('user') user: UserEntity,
    @Body() { id, score }: ScoreDto,
  ): Promise<void> {
    await this.ideasService.score(user, id, score);
  }

  @UseGuards(AuthGuard)
  @HttpCode(HttpStatus.OK)
  @Post('decline')
  async decline(@Body() { id }: IdDto): Promise<void> {
    await this.ideasService.setStatus(id, IdeaStatus.Declined);
  }

  @UseGuards(AuthGuard)
  @HttpCode(HttpStatus.OK)
  @Post('approved')
  async approve(@Body() { id }: IdDto): Promise<void> {
    await this.ideasService.setStatus(id, IdeaStatus.Approved);
  }

  @UseGuards(AuthGuard)
  @HttpCode(HttpStatus.OK)
  @Post('complete')
  async complete(@Body() { id }: IdDto): Promise<void> {
    await this.ideasService.setStatus(id, IdeaStatus.Completed);
  }
}
