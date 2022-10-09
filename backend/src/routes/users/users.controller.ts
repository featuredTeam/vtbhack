import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  NotFoundException,
  Param,
  Post,
  Query,
  Res,
  UseGuards,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { UsersService } from './users.service';
import { UserEntity } from '../../database/entities/user.entity';
import { RegisterDto } from './dto/register.dto';
import { AuthGuard } from '../../guards/auth.guard';
import { Response } from 'express';
import { BalanceType } from '../../modules/vtb/types/BalanceType';
import { LoginDto } from './dto/login.dto';
import { RoleDto } from './dto/role.dto';
import { AchievementEntity } from '../../database/entities/achievement.entity';

@ApiTags('users')
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @HttpCode(HttpStatus.OK)
  @Post('login')
  async login(
    @Body() { username }: LoginDto,
    @Res({ passthrough: true }) response: Response,
  ): Promise<void> {
    if (!(await this.usersService.get(username))) throw new NotFoundException();
    response.cookie('username', username);
  }

  @HttpCode(HttpStatus.OK)
  @Post('register')
  async register(
    @Body() user: RegisterDto,
    @Res({ passthrough: true }) response: Response,
  ): Promise<void> {
    await this.usersService.register(user);
    response.cookie('username', user.username);
  }

  @UseGuards(AuthGuard)
  @Get('current')
  current(@Body('user') user: UserEntity): UserEntity {
    return user;
  }

  @UseGuards(AuthGuard)
  @Get('balance')
  async balance(@Body('user') user: UserEntity): Promise<BalanceType> {
    return await this.usersService.balance(user);
  }

  @HttpCode(HttpStatus.OK)
  @Post('logout')
  async logout(@Res({ passthrough: true }) response: Response): Promise<void> {
    response.clearCookie('username').send();
  }

  @HttpCode(HttpStatus.OK)
  @Post('role')
  async addRole(@Body() { username, role }: RoleDto): Promise<void> {
    return await this.usersService.addRole(username, role);
  }

  @Get(':username/achievements')
  async achievements(
    @Param('username') username: string,
  ): Promise<AchievementEntity[]> {
    return await this.usersService.getAchievements(username);
  }

  @UseGuards(AuthGuard)
  @Get(':username')
  async get(@Param('username') username: string): Promise<UserEntity> {
    return await this.usersService.get(username);
  }
}
