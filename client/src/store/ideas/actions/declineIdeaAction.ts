import { AppDispatchType } from '../../store';
import { axios } from '../../../utils/axiosInstance';
import { declineIdea } from '../ideasSlice';

export const declineIdeaAction =
  (id: number) => async (dispatch: AppDispatchType) => {
    await axios.post('/ideas/decline', { id });
    dispatch(declineIdea({ id }));
  };
