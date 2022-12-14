import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ItemEntity } from '../../database/entities/item.entity';
import { ItemUserEntity } from '../../database/entities/item_user.entity';
import { UserEntity } from '../../database/entities/user.entity';
import { VtbService } from '../../modules/vtb/vtb.service';

@Injectable()
export class ItemsService {
  constructor(
    @InjectRepository(ItemEntity)
    private readonly itemsRepository: Repository<ItemEntity>,
    @InjectRepository(ItemUserEntity)
    private readonly itemsUsersRepository: Repository<ItemUserEntity>,
    private readonly vtbService: VtbService,
  ) {}

  public async create(item: ItemEntity): Promise<void> {
    const foundItem = await this.itemsRepository.findOne({
      where: {
        name: item.name,
      },
    });
    if (foundItem) throw new ConflictException();

    await this.itemsRepository.save(item);
  }

  public async getAll(): Promise<ItemEntity[]> {
    return await this.itemsRepository.find();
  }

  public async getByUser(user: UserEntity): Promise<ItemEntity[]> {
    const itemUser = await this.itemsUsersRepository.find({
      where: {
        user: {
          id: user.id,
        },
      },
      relations: {
        user: true,
      },
    });

    return itemUser.map((itemUser) => itemUser.item);
  }

  public async delete(id: number): Promise<void> {
    const foundItem = await this.itemsRepository.findOne({
      where: {
        id,
      },
    });
    if (!foundItem) throw new NotFoundException();

    await this.itemsRepository.delete(id);
  }

  public async buy(user: UserEntity, id: number): Promise<void> {
    const item = await this.itemsRepository.findOne({
      where: {
        id,
      },
    });
    if (!item) throw new NotFoundException();

    const { coinsAmount } = await this.vtbService.balance(user.publicKey);

    if (coinsAmount < item.cost)
      throw new ConflictException('Not enough money');

    const { transaction } = await this.vtbService.transform(
      user.privateKey,
      item.cost,
    );

    const interval = setInterval(async () => {
      try {
        const { status } = await this.vtbService.getTransactionStatus(
          transaction,
        );
        if (status === 'Pending') return;
        clearInterval(interval);

        if (status === 'Success')
          await this.itemsUsersRepository.save({ user, item });
      } catch {}
    }, 1000);
  }
}
