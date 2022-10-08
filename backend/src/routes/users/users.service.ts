import { ConflictException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UserRole } from '../../../../common/constants/UserRole';
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
    private readonly vtbService: VtbService,
  ) {}

  public async register({
    name,
    surname,
    avatar,
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
      avatar,
      username,
      publicKey,
      privateKey,
    });
  }

  public async get(username: string): Promise<UserEntity> {
    return await this.usersRepository.findOne({
      where: {
        username,
      },
    });
  }

  public async balance(username: string): Promise<BalanceType> {
    const user = await this.usersRepository.findOne({
      where: {
        username,
      },
    });

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
}
