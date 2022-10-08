import { axios } from '../../../utils/axiosInstance';
import { getMentorRequests } from './getMentorRequests';
import { AppDispatchType } from '../../store';

export const createMentorRequestAction =
  ({ title, text }: any) =>
  async (dispatch: AppDispatchType) => {
    await axios.post('/mentors', { title, text });

    await dispatch(getMentorRequests());
  };
