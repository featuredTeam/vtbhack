// 3-rd part lib
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { MentorRequestType } from './types/mentor_request';

type StateType = {
  loading: boolean;
  mentorRequests: MentorRequestType[];
};

const initialState: StateType = {
  loading: false,
  mentorRequests: [],
};

const mentoringSlice = createSlice({
  name: 'mentoring',
  initialState,
  reducers: {
    setMentors: (state, action: PayloadAction<MentorRequestType[]>) => {
      state.mentorRequests = action.payload;
    },
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.loading = action.payload;
    },
    createMentorRequest: (state, action: PayloadAction<MentorRequestType>) => {
      state.mentorRequests.push(action.payload);
    },
  },
});

export const { setMentors, setLoading } = mentoringSlice.actions;
export const mentoringReducer = mentoringSlice.reducer;
