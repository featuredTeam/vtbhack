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
import { ItemsService } from './items.service';
import { UserEntity } from '../../database/entities/user.entity';
import { AuthGuard } from '../../guards/auth.guard';
import { ItemEntity } from '../../database/entities/item.entity';
import { IdDto } from '../../types/id.dto';

@ApiTags('items')
@Controller('items')
export class ItemsController {
  constructor(private readonly itemsService: ItemsService) {}

  @HttpCode(HttpStatus.OK)
  @Post()
  async create(@Body() item: ItemEntity): Promise<void> {
    await this.itemsService.create(item);
  }

  @HttpCode(HttpStatus.OK)
  @Delete()
  async delete(@Body() { id }: IdDto): Promise<void> {
    await this.itemsService.delete(id);
  }

  @Get()
  async get(): Promise<ItemEntity[]> {
    return await this.itemsService.getAll();
  }

  @UseGuards(AuthGuard)
  @HttpCode(HttpStatus.OK)
  @Post('buy')
  async buy(
    @Body('user') user: UserEntity,
    @Body() { id }: IdDto,
  ): Promise<void> {
    await this.itemsService.buy(user, id);
  }

  @UseGuards(AuthGuard)
  @HttpCode(HttpStatus.OK)
  @Post('my')
  async getMyItems(@Body('user') user: UserEntity): Promise<ItemEntity[]> {
    return await this.itemsService.getByUser(user);
  }
}
