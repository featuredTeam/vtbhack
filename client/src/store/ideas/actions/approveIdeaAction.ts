import { axios } from '../../../utils/axiosInstance';
import { AppDispatchType } from '../../store';
import { approveIdea } from '../ideasSlice';

export const approveIdeaAction =
  (id: number) => async (dispatch: AppDispatchType) => {
    await axios.post('/ideas/approved', { id });
    dispatch(approveIdea({ id }));
  };
