import { UserInfo } from '../../auth/types/userInfo';
import { AppDispatchType } from '../../store';
import { axios } from '../../../utils/axiosInstance';
import { IdeaStatus } from '../types/ideaType';
import { getIdeas } from './getIdeas';

export type CreateIdea = {
  user: UserInfo;
  title: string;
  description: string;
  status: IdeaStatus;
};

export const createIdea =
  (newIdea: CreateIdea) => async (dispatch: AppDispatchType) => {
    await axios.post('ideas', newIdea);
    await dispatch(getIdeas());
  };
