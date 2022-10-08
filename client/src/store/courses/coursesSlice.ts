// 3-rd part lib
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { CourseType, CourseStatus } from './types/courseType';

type StateType = {
  loading: boolean;
  courses: CourseType[];
};

const initialState: StateType = {
  loading: false,
  courses: [],
};

const coursesSlice = createSlice({
  name: 'courses',
  initialState,
  reducers: {
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.loading = action.payload;
    },
    setCourses: (state, action: PayloadAction<CourseType[]>) => {
      state.courses = action.payload;
    },
    startCourse: (state, action: PayloadAction<number>) => {
      state.courses.find((course) => course.id === action.payload)!.status =
        CourseStatus.InProgress;
    },
    finishCourse: (state, action: PayloadAction<number>) => {
      state.courses.find((course) => course.id === action.payload)!.status =
        CourseStatus.Completed;
    },
  },
});

export const { setCourses, startCourse, finishCourse, setLoading } =
  coursesSlice.actions;
export const coursesReducer = coursesSlice.reducer;
export {};
