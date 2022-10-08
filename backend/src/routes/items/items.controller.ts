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
import { ItemDto } from './dto/item.dto';
import { AuthGuard } from '../../guards/auth.guard';
import { ItemEntity } from '../../database/entities/item.entity';

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
  async delete(@Body() { id }: ItemDto): Promise<void> {
    await this.itemsService.delete(id);
  }

  @HttpCode(HttpStatus.OK)
  @Get()
  async get(@Body('user') user: UserEntity): Promise<ItemEntity[]> {
    return await this.itemsService.getAll();
  }

  @UseGuards(AuthGuard)
  @HttpCode(HttpStatus.OK)
  @Post('buy')
  async enroll(
    @Body('user') user: UserEntity,
    @Body() { id }: ItemDto,
  ): Promise<void> {
    await this.itemsService.buy(user, id);
  }
}
