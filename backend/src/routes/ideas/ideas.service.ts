import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Not, Repository } from 'typeorm';
import { IdeaEntity } from '../../database/entities/idea.entity';
import { IdeaUserEntity } from '../../database/entities/idea_user.entity';
import { IdeaStatus } from '../../database/entities/types/IdeaStatus';
import { ScoreType } from '../../database/entities/types/ScoreType';
import { UserEntity } from '../../database/entities/user.entity';
import { VtbService } from '../../modules/vtb/vtb.service';
import { IdeaEntityWithScore } from './types/IdeaEntityWithScore';

@Injectable()
export class IdeasService {
  constructor(
    @InjectRepository(IdeaEntity)
    private readonly ideasRepository: Repository<IdeaEntity>,
    @InjectRepository(IdeaUserEntity)
    private readonly ideasUsersRepository: Repository<IdeaUserEntity>,
    private readonly vtbService: VtbService,
  ) {}

  public async create(user: UserEntity, item: IdeaEntity): Promise<IdeaEntity> {
    const { id } = await this.ideasRepository.save({ ...item, user });
    return await this.ideasRepository.findOne({
      where: {
        id,
      },
      relations: {
        user: true,
      },
    });
  }

  public async getAll(): Promise<IdeaEntityWithScore[]> {
    const ideas = await this.ideasRepository.find({
      where: {
        status: Not(IdeaStatus.Declined),
      },
      relations: {
        user: true,
      },
    });

    return await Promise.all(
      ideas.map(async (idea) => {
        const scoresByIdea = await this.ideasUsersRepository.find({
          where: {
            idea: { id: idea.id },
          },
        });

        const score = scoresByIdea.reduce(
          (prev, scoreIdea) =>
            prev + (scoreIdea.score === ScoreType.Positive ? 1 : -1),
          0,
        );

        return {
          ...idea,
          score,
        };
      }),
    );
  }

  public async delete(id: number): Promise<void> {
    const foundIdea = await this.ideasRepository.findOne({
      where: {
        id,
      },
    });
    if (!foundIdea) throw new NotFoundException();

    await this.ideasRepository.delete(id);
  }

  public async score(
    user: UserEntity,
    id: number,
    score: ScoreType,
  ): Promise<void> {
    const idea = await this.ideasRepository.findOne({
      where: {
        id,
      },
    });
    if (!idea) throw new NotFoundException();

    const scoreByUser = await this.ideasUsersRepository.findOne({
      where: {
        user: { id: user.id },
        idea: { id: idea.id },
      },
    });

    if (scoreByUser) throw new ConflictException('Already voted');
    await this.ideasUsersRepository.save({ user, idea, score });
  }

  public async setStatus(id: number, status: IdeaStatus): Promise<void> {
    const idea = await this.ideasRepository.findOne({
      where: {
        id,
      },
    });
    if (!idea) throw new NotFoundException();

    await this.ideasRepository.update({ id: idea.id }, { status });
  }
}
