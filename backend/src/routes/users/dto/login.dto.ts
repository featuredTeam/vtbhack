import { PickType } from '@nestjs/swagger';
import { UserEntity } from '../../../database/entities/user.entity';

export class LoginDto extends PickType(UserEntity, ['username']) {}
