import { AppDispatchType } from '../../store';
import { axios } from '../../../utils/axiosInstance';
import { giveAchievement } from '../profileSlice';

export const giveAchievementAction =
  (id: number, to: string) => async (dispatch: AppDispatchType) => {
    await axios.post('/achievements/give', { id, username: to });

    dispatch(giveAchievement(id));
  };
