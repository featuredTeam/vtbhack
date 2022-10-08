// 3-rd part lib
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { IdeaStatus, IdeaType } from './types/ideaType';

type StateType = {
  approved: IdeaType[];
  notApproved: IdeaType[];
  loading: boolean;
};

const initialState: StateType = {
  approved: [],
  notApproved: [],
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
      state.approved = action.payload.filter(
        (idea) => idea.status !== IdeaStatus.Created,
      );
      state.notApproved = action.payload.filter(
        (idea) => idea.status === IdeaStatus.Created,
      );
    },
    addIdea: (state, action: PayloadAction<IdeaType>) => {
      state.notApproved.push(action.payload);
    },
    voteIdea: (state, action: PayloadAction<{ id: number; score: number }>) => {
      state.notApproved.find(({ id }) => id === action.payload.id)!.score +=
        action.payload.score;
    },
    approveIdea: (state, action: PayloadAction<{ id: number }>) => {
      const approved = state.notApproved.find(
        ({ id }) => id === action.payload.id,
      );
      state.notApproved = state.notApproved.filter(
        ({ id }) => id !== action.payload.id,
      );
      state.approved.push(approved!);
    },
    declineIdea: (state, action: PayloadAction<{ id: number }>) => {
      state.notApproved = state.notApproved.filter(
        ({ id }) => id !== action.payload.id,
      );
    },
  },
});

export const {
  setIdeas,
  setLoading,
  voteIdea,
  addIdea,
  declineIdea,
  approveIdea,
} = ideasSlice.actions;
export const ideasReducer = ideasSlice.reducer;
