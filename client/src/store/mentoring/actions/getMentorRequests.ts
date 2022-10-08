import { AppDispatchType } from '../../store';
import { axios } from '../../../utils/axiosInstance';
import { setLoading, setMentors } from '../mentoringSlice';

export const getMentorRequests = () => async (dispatch: AppDispatchType) => {
  dispatch(setLoading(true));
  const response = await axios.get('/mentors');

  if (response) {
    dispatch(setMentors(response.data));
  }
  dispatch(setLoading(false));
};
