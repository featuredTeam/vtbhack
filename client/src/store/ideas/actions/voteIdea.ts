import { AppDispatchType } from '../../store';
import { axios } from '../../../utils/axiosInstance';
import { voteIdea } from '../ideasSlice';

export const voteIdeaAction =
  (id: number, score: boolean) => async (dispatch: AppDispatchType) => {
    await axios.post(`/ideas/score?${score ? 'score=true' : ''}`, { id });

    dispatch(voteIdea({ id, score: score ? 1 : -1 }));
  };
