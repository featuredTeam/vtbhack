import {
  Body,
  Controller,
  HttpCode,
  HttpStatus,
  Post,
  UseGuards,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { UserEntity } from '../../database/entities/user.entity';
import { AuthGuard } from '../../guards/auth.guard';
import { EnrollementDto } from './dto/enrollement.dto';
import { TransformDto } from './dto/transform.dto';
import { TransactionsService } from './transactions.service';

@ApiTags('transactions')
@Controller('transactions')
export class TransactionsController {
  constructor(private readonly transactionsService: TransactionsService) {}

  @UseGuards(AuthGuard)
  @HttpCode(HttpStatus.OK)
  @Post('send')
  async send(
    @Body() { to, amount }: EnrollementDto,
    @Body('user') user: UserEntity,
  ): Promise<void> {
    await this.transactionsService.send(user, to, amount);
  }

  @UseGuards(AuthGuard)
  @HttpCode(HttpStatus.OK)
  @Post('transform')
  async transform(
    @Body() { amount }: TransformDto,
    @Body('user') user: UserEntity,
  ): Promise<void> {
    await this.transactionsService.tranform(user, amount);
  }

  @UseGuards(AuthGuard)
  @HttpCode(HttpStatus.OK)
  @Post('giveRubles')
  async giveRubles(@Body() { to, amount }: EnrollementDto): Promise<void> {
    await this.transactionsService.giveRubles(to, amount);
  }

  @UseGuards(AuthGuard)
  @HttpCode(HttpStatus.OK)
  @Post('giveMatic')
  async giveMatic(@Body() { to, amount }: EnrollementDto): Promise<void> {
    await this.transactionsService.giveMatic(to, amount);
  }
}
