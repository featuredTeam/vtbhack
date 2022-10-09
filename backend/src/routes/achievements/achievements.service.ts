import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { AchievementEntity } from '../../database/entities/achievement.entity';
import { VtbService } from '../../modules/vtb/vtb.service';
import { UsersService } from '../users/users.service';

@Injectable()
export class AchievementsService {
  constructor(
    @InjectRepository(AchievementEntity)
    private readonly achievementsRepository: Repository<AchievementEntity>,
    private readonly usersService: UsersService,
    private readonly vtbService: VtbService,
  ) {}

  public async create(achievement: AchievementEntity): Promise<void> {
    await this.achievementsRepository.save(achievement);
  }

  public async getAll(): Promise<AchievementEntity[]> {
    return await this.achievementsRepository.find();
  }

  public async delete(id: number): Promise<void> {
    const achievement = await this.achievementsRepository.findOne({
      where: { id },
    });
    if (!achievement) throw new NotFoundException();

    await this.achievementsRepository.delete(id);
  }

  public async give(username: string, id: number): Promise<void> {
    const achievement = await this.achievementsRepository.findOne({
      where: { id },
    });
    if (!achievement) throw new NotFoundException();

    const user = await this.usersService.get(username);
    if (!user) throw new NotFoundException();

    await this.vtbService.giveNFT(user.publicKey, String(achievement.id));
    if (achievement.reward)
      await this.vtbService.giveRubles(user.publicKey, achievement.reward);
  }
}
