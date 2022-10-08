import { UserInfo } from '../../auth/types/userInfo';
import { AppDispatchType } from '../../store';
import { axios } from '../../../utils/axiosInstance';
import { IdeaStatus } from '../types/ideaType';
import { addIdea } from '../ideasSlice';

export type CreateIdea = {
  user: UserInfo;
  title: string;
  description: string;
  status: IdeaStatus;
};

export const createIdea =
  (newIdea: CreateIdea) => async (dispatch: AppDispatchType) => {
    const response = await axios.post('ideas', newIdea);

    dispatch(addIdea(response.data));
  };
