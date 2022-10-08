import { ConflictException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { In, Repository } from 'typeorm';
import { UserRole } from '../../../../common/constants/UserRole';
import { AchievementEntity } from '../../database/entities/achievement.entity';
import { UserEntity } from '../../database/entities/user.entity';
import { UserRoleEntity } from '../../database/entities/user_role.entity';
import { BalanceType } from '../../modules/vtb/types/BalanceType';
import { VtbService } from '../../modules/vtb/vtb.service';
import { RegisterDto } from './dto/register.dto';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(UserEntity)
    private readonly usersRepository: Repository<UserEntity>,
    @InjectRepository(UserRoleEntity)
    private readonly userRolesRepository: Repository<UserRoleEntity>,
    @InjectRepository(AchievementEntity)
    private readonly achievementRepository: Repository<AchievementEntity>,
    private readonly vtbService: VtbService,
  ) {}

  public async register({
    name,
    surname,
    username,
  }: RegisterDto): Promise<void> {
    const foundUser = await this.usersRepository.findOne({
      where: {
        username,
      },
    });

    if (foundUser) {
      throw new ConflictException();
    }

    const { privateKey, publicKey } = await this.vtbService.register();

    this.usersRepository.save({
      name,
      surname,
      username,
      publicKey,
      privateKey,
    });
  }

  public async getUnsafe(username: string): Promise<UserEntity> {
    return await this.usersRepository.findOne({
      where: {
        username,
      },
    });
  }

  public async get(username: string): Promise<UserEntity> {
    const user = await this.usersRepository.findOne({
      where: {
        username,
      },
    });
    if (user) {
      user.privateKey = undefined;
    }
    return user;
  }

  public async balance(user: UserEntity): Promise<BalanceType> {
    return await this.vtbService.balance(user.publicKey);
  }

  public async addRole(username: string, role: UserRole): Promise<void> {
    const user = await this.usersRepository.findOne({
      where: {
        username,
      },
    });

    this.userRolesRepository.save({
      user,
      role,
    });
  }

  public async getAchievements(username: string): Promise<AchievementEntity[]> {
    const user = await this.usersRepository.findOne({
      where: {
        username,
      },
    });

    const { balance } = await this.vtbService.getNFTbalance(user.publicKey);

    const achievements = balance.map((nft) => nft.URI);

    return await this.achievementRepository.find({
      where: {
        id: In(achievements),
      },
    });
  }
}
