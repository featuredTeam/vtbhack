import { login, logout, setUserInfo } from '../authSlice';
import { AppDispatchType } from '../../store';
import { axios } from '../../../utils/axiosInstance';
import { UserInfo } from '../types/userInfo';

export const getUserAction = () => async (dispatch: AppDispatchType) => {
  try {
    const response = await axios.get<UserInfo>('users/current');

    if (response) {
      await dispatch(setUserInfo(response.data));
      await dispatch(login());
    } else {
      await dispatch(logout());
    }
  } catch (e) {}
};
