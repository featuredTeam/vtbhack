import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MentorEntity } from '../../database/entities/mentor.entity';
import { MentorsController } from './mentors.controller';
import { MentorsService } from './mentors.service';

@Module({
  imports: [TypeOrmModule.forFeature([MentorEntity])],
  controllers: [MentorsController],
  providers: [MentorsService],
  exports: [MentorsService],
})
export class MentorsModule {}
