// 3-rd part lib
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { ItemType } from './types/itemType';

type StateType = {
  items: ItemType[];
  loading: boolean;
};

const initialState: StateType = {
  items: [],
  loading: false,
};

const itemsSlice = createSlice({
  name: 'items',
  initialState,
  reducers: {
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.loading = action.payload;
    },
    setItems: (state, action: PayloadAction<ItemType[]>) => {
      state.items = action.payload;
    },
  },
});

export const { setItems } = itemsSlice.actions;
export const itemsReducer = itemsSlice.reducer;
export {};
