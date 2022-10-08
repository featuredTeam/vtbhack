import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { IdeaEntity } from '../../database/entities/idea.entity';
import { IdeaUserEntity } from '../../database/entities/idea_user.entity';
import { IdeasController } from './ideas.controller';
import { IdeasService } from './ideas.service';

@Module({
  imports: [TypeOrmModule.forFeature([IdeaEntity, IdeaUserEntity])],
  controllers: [IdeasController],
  providers: [IdeasService],
  exports: [IdeasService],
})
export class IdeasModule {}
