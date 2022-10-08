// 3-rd part lib
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { IdeaType } from './types/ideaType';

type StateType = {
  ideas: IdeaType[];
  loading: boolean;
};

const initialState: StateType = {
  ideas: [],
  loading: false,
};

const ideasSlice = createSlice({
  name: 'ideas',
  initialState,
  reducers: {
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.loading = action.payload;
    },
    setIdeas: (state, action: PayloadAction<IdeaType[]>) => {
      state.ideas = action.payload;
    },
    addIdea: (state, action: PayloadAction<IdeaType>) => {
      state.ideas.push(action.payload);
    },
    voteIdea: (state, action: PayloadAction<{ id: number; score: number }>) => {
      state.ideas.find(({ id }) => id === action.payload.id)!.score +=
        action.payload.score;
    },
  },
});

export const { setIdeas, setLoading, voteIdea } = ideasSlice.actions;
export const authReducer = ideasSlice.reducer;
export {};
