import { axios } from '../../../utils/axiosInstance';
import { CourseType } from '../types/courseType';
import { AppDispatchType } from '../../store';
import { setCourses, setLoading } from '../coursesSlice';

export const getCourses = () => async (dispatch: AppDispatchType) => {
  dispatch(setLoading(true));
  const response = await axios.get<CourseType[]>('/courses');

  if (response) {
    dispatch(setCourses(response.data));
  }
  dispatch(setLoading(false));
};
