// 3-rd part lib
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { AchievementType } from './types/achievementType';
import { UserInfo } from '../auth/types/userInfo';
import { getAchievementsAction } from './actions/getAchievements';
import { getUserProfile } from './actions/getUserProfile';
import { getCompletedAchievements } from './actions/getCompletedAchievements';

type StateType = {
  achievements: AchievementType[];
  completedAchievements: AchievementType[];
  balance: number;
  loading: boolean;
  profile: UserInfo | null;
};

const initialState: StateType = {
  achievements: [],
  completedAchievements: [],
  balance: 0,
  loading: false,
  profile: null,
};

const profileSlice = createSlice({
  name: 'profile',
  initialState,
  reducers: {
    giveAchievement: (state, action: PayloadAction<number>) => {
      const achieve = state.achievements.find(
        ({ id }) => id === action.payload,
      );

      state.completedAchievements.push({ ...achieve! });
    },
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.loading = action.payload;
    },
    setAchievements: (state, action: PayloadAction<AchievementType[]>) => {
      state.achievements = action.payload;
    },
    setCompletedAchievements: (
      state,
      action: PayloadAction<AchievementType[]>,
    ) => {
      state.completedAchievements = action.payload;
    },
    setBalance: (state, action: PayloadAction<number>) => {
      state.balance = action.payload;
    },
    setProfile: (state, action: PayloadAction<UserInfo>) => {
      state.profile = action.payload;
    },
    resetProfile: (state) => {
      state.profile = null;
      state.completedAchievements = [];
      state.balance = 0;
    },
    sendMoney: (state, action: PayloadAction<number>) => {
      state.balance -= action.payload;
    },
  },
});

export const {
  giveAchievement,
  setAchievements,
  setCompletedAchievements,
  setProfile,
  sendMoney,
  setBalance,
  setLoading,
  resetProfile,
} = profileSlice.actions;
export const profileReducer = profileSlice.reducer;
export { getAchievementsAction, getCompletedAchievements, getUserProfile };
