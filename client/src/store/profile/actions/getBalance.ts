import { axios } from '../../../utils/axiosInstance';
import { AppDispatchType } from '../../store';
import { setBalance } from '../profileSlice';

export const getBalance = () => async (dispatch: AppDispatchType) => {
  const response = await axios.get('users/balance');

  dispatch(setBalance(response.data.coinsAmount));
};
