import { axios } from '../../../utils/axiosInstance';
import { AppDispatchType } from '../../store';
import { finishCourse } from '../coursesSlice';

export const finishCourseAction =
  (id: number) => async (dispatch: AppDispatchType) => {
    await axios.post('/courses/finish', { id });

    dispatch(finishCourse(id));
  };
