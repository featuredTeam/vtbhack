import { AppDispatchType } from '../../store';
import { axios } from '../../../utils/axiosInstance';
import { setAchievements } from '../profileSlice';
import { AchievementType } from '../types/achievementType';

export const getAchievementsAction =
  () => async (dispatch: AppDispatchType) => {
    const response = await axios.get<AchievementType[]>('achievements');

    dispatch(setAchievements(response.data));
  };
