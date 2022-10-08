import { configureStore, Dispatch } from '@reduxjs/toolkit';
import { TypedUseSelectorHook } from 'react-redux';
import { useDispatch, useSelector } from 'react-redux';
import { authReducer } from './auth/authSlice';

const store = configureStore({
  reducer: {
    auth: authReducer,
  },
});

// Определяем тип, возвращаемый стором, прямо из него
export type RootStateType = ReturnType<typeof store.getState>;
// Определяем тип dispatch, зависимый от стора. С any хак чтобы асинхронные экшены работали из коробки
export type AppDispatchType = typeof store.dispatch & Dispatch<any>;
export type GetStateFuncType = () => RootStateType;

// Создаем типизированные версии `useDispatch` and `useSelector`
export const useAppDispatch = () => useDispatch<AppDispatchType>();
export const useAppSelector: TypedUseSelectorHook<RootStateType> = useSelector;

export { store };