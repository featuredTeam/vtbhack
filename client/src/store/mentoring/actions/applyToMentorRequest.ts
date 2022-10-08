import { axios } from '../../../utils/axiosInstance';
import { getMentorRequests } from './getMentorRequests';
import { AppDispatchType } from '../../store';

export const applyToMentorRequest =
  (id: number) => async (dispatch: AppDispatchType) => {
    await axios.post('/mentors/apply', { id });
    dispatch(getMentorRequests());
  };
