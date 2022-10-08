import { AppDispatchType } from '../../store';
import { axios } from '../../../utils/axiosInstance';
import { sendMoney } from '../profileSlice';

type Params = {
  to: string;
  amount: number;
};

export const sendMoneyAction =
  (params: Params) => async (dispatch: AppDispatchType) => {
    await axios.post('transactions/send', params);

    dispatch(sendMoney(params.amount));
  };
