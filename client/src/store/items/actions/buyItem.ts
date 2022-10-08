import { AppDispatchType } from '../../store';
import { axios } from '../../../utils/axiosInstance';

export const buyItem = (id: number) => async (dispatch: AppDispatchType) => {
  await axios.post('items/buy', { id });
};
