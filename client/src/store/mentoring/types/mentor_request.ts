import { UserInfo } from '../../auth/types/userInfo';

export type MentorRequestType = {
  id: number;
  mentor: UserInfo | null;
  user: UserInfo;
  title: string;
  text: string;
};
