import { PickType } from '@nestjs/swagger';
import { IsEnum } from 'class-validator';
import { UserRole } from '../../../../../common/constants/UserRole';
import { UserEntity } from '../../../database/entities/user.entity';

export class RoleDto extends PickType(UserEntity, ['username']) {
  @IsEnum(UserRole)
  role: UserRole;
}
