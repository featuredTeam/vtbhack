import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AchievementEntity } from '../../database/entities/achievement.entity';
import { UsersModule } from '../users/users.module';
import { UsersService } from '../users/users.service';
import { AchievementsController } from './achievements.controller';
import { AchievementsService } from './achievements.service';

@Module({
  imports: [TypeOrmModule.forFeature([AchievementEntity]), UsersModule],
  controllers: [AchievementsController],
  providers: [AchievementsService],
  exports: [AchievementsService, TypeOrmModule],
})
export class AchievementsModule {}
