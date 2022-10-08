import { axios } from '../../../utils/axiosInstance';
import { AppDispatchType } from '../../store';
import { setCompletedAchievements } from '../profileSlice';
import { AchievementType } from '../types/achievementType';

export const getCompletedAchievements =
  (userId: string) => async (dispatch: AppDispatchType) => {
    const response = await axios.get<AchievementType[]>(
      `/users/${userId}/achievements`,
    );

    if (response) {
      dispatch(setCompletedAchievements(response.data));
    }
  };
