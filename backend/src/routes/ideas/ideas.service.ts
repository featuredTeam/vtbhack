import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { IdeaEntity } from '../../database/entities/idea.entity';
import { IdeaUserEntity } from '../../database/entities/idea_user.entity';
import { IdeaStatus } from '../../database/entities/types/IdeaStatus';
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

  public async create(user: UserEntity, item: IdeaEntity): Promise<void> {
    await this.ideasRepository.save({ ...item, user });
  }

  public async getAll(): Promise<IdeaEntityWithScore[]> {
    const ideas = await this.ideasRepository.find();

    return await Promise.all(
      ideas.map(async (idea: IdeaEntity): Promise<IdeaEntityWithScore> => {
        const scoresByIdea = await this.ideasUsersRepository.find({
          where: {
            idea,
          },
          relations: {
            idea: true,
          },
        });
        console.log(scoresByIdea);

        const score = scoresByIdea.reduce(
          (prev, scoreIdea) => prev + (scoreIdea.score ? 1 : -1),
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
    score: boolean,
  ): Promise<void> {
    const idea = await this.ideasRepository.findOne({
      where: {
        id,
      },
    });
    if (!idea) throw new NotFoundException();

    const scoresByUser = await this.ideasUsersRepository.find({
      where: {
        user,
      },
      relations: {
        user: true,
        idea: true,
      },
    });

    const scoreUser = await scoresByUser.find(
      (scoreUser) => scoreUser.idea.id === idea.id,
    );
    if (scoreUser) throw new ConflictException('Already voted');

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

    if (status === IdeaStatus.Completed) {
      this.vtbService.giveRubles(idea.user.publicKey, idea.amount);
    }
  }
}
