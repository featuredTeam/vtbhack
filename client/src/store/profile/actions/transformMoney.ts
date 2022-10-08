import { AppDispatchType } from '../../store';
import { axios } from '../../../utils/axiosInstance';
import { sendMoney } from '../profileSlice';

export const transformMoney =
  (amount: number) => async (dispatch: AppDispatchType) => {
    await axios.post('transactions/transform', { amount });

    dispatch(sendMoney(amount));
  };
