import { UserRole } from '../../../../../common/constants/UserRole';

export type UserInfo = {
  id: number;
  name: string;
  surname: string;
  username: string;
  roles: { role: UserRole }[];
  public_key: string;
  private_key: string;
};
