import { UserInfo } from '../../auth/types/userInfo';

export type IdeaType = {
  id: number;

  user: UserInfo;

  title: string;

  description: string;

  amount: number;

  status: IdeaStatus;

  score: number;
};

export enum IdeaStatus {
  Created = 'created',
  InProgress = 'inprogress',
  Declined = 'declined',
  Completed = 'completed',
}
