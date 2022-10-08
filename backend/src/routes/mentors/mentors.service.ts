import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { MentorEntity } from '../../database/entities/mentor.entity';
import { UserEntity } from '../../database/entities/user.entity';

@Injectable()
export class MentorsService {
  constructor(
    @InjectRepository(MentorEntity)
    private readonly mentorsRepository: Repository<MentorEntity>,
  ) {}

  public async create(user: UserEntity, item: MentorEntity): Promise<void> {
    await this.mentorsRepository.save({
      ...item,
      user,
    });
  }

  public async getAll(): Promise<MentorEntity[]> {
    return await this.mentorsRepository.find();
  }

  public async apply(user: UserEntity, id: number): Promise<void> {
    const mentorRequest = await this.mentorsRepository.findOne({
      where: {
        id,
      },
      relations: {
        user: true,
        mentor: true,
      },
    });

    if (mentorRequest.mentor) {
      throw new ConflictException();
    }

    await this.mentorsRepository.update(
      { id },
      {
        mentor: user,
      },
    );
  }

  public async delete(id: number): Promise<void> {
    const foundItem = await this.mentorsRepository.findOne({
      where: {
        id,
      },
    });
    if (!foundItem) throw new NotFoundException();

    await this.mentorsRepository.delete(id);
  }
}
