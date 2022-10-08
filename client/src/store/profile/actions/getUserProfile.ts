import { axios } from '../../../utils/axiosInstance';
import { AppDispatchType } from '../../store';
import { UserInfo } from '../../auth/types/userInfo';
import { setProfile } from '../profileSlice';

export const getUserProfile =
  (username: string) => async (dispatch: AppDispatchType) => {
    const response = await axios.get<UserInfo>(`/users/${username}`);

    dispatch(setProfile(response.data));
  };
