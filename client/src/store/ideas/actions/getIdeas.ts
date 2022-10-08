import { AppDispatchType } from '../../store';
import { axios } from '../../../utils/axiosInstance';
import { IdeaType } from '../types/ideaType';
import { setIdeas } from '../ideasSlice';

export const getIdeas = () => async (dispatch: AppDispatchType) => {
  const response = await axios.get<IdeaType[]>('ideas');

  if (response) {
    dispatch(setIdeas(response.data));
  }
};
