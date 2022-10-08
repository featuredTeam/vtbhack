import { PickType } from '@nestjs/swagger';
import { UserEntity } from '../../../database/entities/user.entity';

export class RegisterDto extends PickType(UserEntity, [
  'username',
  'name',
  'surname',
  'avatar',
]) {}
