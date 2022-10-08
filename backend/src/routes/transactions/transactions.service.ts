import { Injectable, NotFoundException } from '@nestjs/common';
import { UserEntity } from '../../database/entities/user.entity';
import { VtbService } from '../../modules/vtb/vtb.service';
import { UsersService } from '../users/users.service';

@Injectable()
export class TransactionsService {
  constructor(
    private readonly usersService: UsersService,
    private readonly vtbService: VtbService,
  ) {}

  public async send(
    from: UserEntity,
    to: string,
    amount: number,
  ): Promise<void> {
    const toUser = await this.usersService.get(to);
    if (!toUser) throw new NotFoundException();

    await this.vtbService.send(from.privateKey, toUser.publicKey, amount);
  }

  public async tranform(user: UserEntity, amount: number): Promise<void> {
    await this.vtbService.transform(user.privateKey, amount);
  }

  public async give(username: string, amount: number): Promise<void> {
    const user = await this.usersService.get(username);
    if (!user) throw new NotFoundException();
    await this.vtbService.giveRubles(user.publicKey, amount);
  }
}
