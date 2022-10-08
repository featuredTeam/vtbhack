// 3-rd part lib
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
// actions
import { getUserAction } from './actions/getUser';
// types
import { Role, UserInfo } from './types/userInfo';

type StateType = {
  isAuthorized: boolean;
  userInfo: UserInfo | null;
};

const initialState: StateType = {
  isAuthorized: false,
  userInfo: null,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    login: (state: StateType) => {
      state.isAuthorized = true;
    },
    logout: (state: StateType) => {
      state.isAuthorized = false;
      state.userInfo = null;
    },
    setUserInfo: (state: StateType, action: PayloadAction<UserInfo>) => {
      state.userInfo = action.payload;
    },
  },
});

export const { login, logout, setUserInfo } = authSlice.actions;
export const authReducer = authSlice.reducer;
export { getUserAction };
