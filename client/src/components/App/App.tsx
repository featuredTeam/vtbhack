import React, { useEffect } from 'react';
import { Route, Routes } from 'react-router-dom';
import { Container } from '@mui/material';
import { Header } from '../Header/Header';
import { SignInPage } from '../../pages/SignInPage/SignInPage';
import { SignUpPage } from '../../pages/SignUpPage/SignUpPage';
import { ProfilePage } from '../../pages/ProfilePage/ProfilePage';
import { useAppDispatch } from '../../store/store';
import { getUserAction } from '../../store/auth/authSlice';
import { CoursesPage } from '../../pages/CoursesPage/CoursesPage';
import { ApprovedPage } from '../../pages/Ideas/ApprovedPage';
import { NotApprovedPage } from '../../pages/Ideas/NotApprovedPage';

export const App: React.FC = () => {
  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(getUserAction());
  }, []);

  return (
    <>
      <Header />
      <Container>
        <Routes>
          <Route path="sign-in" element={<SignInPage />} />
          <Route path="sign-up" element={<SignUpPage />} />
          <Route path="users/:username/profile" element={<ProfilePage />} />
          <Route path="study/courses" element={<CoursesPage />} />
          <Route path="ideas/approved" element={<ApprovedPage />} />
          <Route path="ideas/voting" element={<NotApprovedPage />} />
          <Route path="*" element={<div>Страница не найдена</div>} />
        </Routes>
      </Container>
    </>
  );
};
