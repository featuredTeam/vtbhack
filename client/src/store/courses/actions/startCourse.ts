import { axios } from '../../../utils/axiosInstance';
import { startCourse } from '../coursesSlice';
import { AppDispatchType } from '../../store';

export const startCourseAction =
  (id: number) => async (dispatch: AppDispatchType) => {
    await axios.post('/courses/enroll', { id });

    dispatch(startCourse(id));
  };
