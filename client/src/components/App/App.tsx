import React from 'react';
import { Route, Routes } from 'react-router-dom';
import { Container } from '@mui/material';
import { Header } from '../Header/Header';
import { SignInPage } from '../../pages/SignInPage/SignInPage';
import { SignUpPage } from '../../pages/SignUpPage/SignUpPage';
import { ProfilePage } from '../../pages/ProfilePage/ProfilePage';

export const App: React.FC = () => {
  return (
    <>
      <Header />
      <Container>
        <Routes>
          <Route path="sign-in" element={<SignInPage />} />
          <Route path="sign-up" element={<SignUpPage />} />
          <Route path="users/:username/profile" element={<ProfilePage />} />
          <Route path="*" element={<div>Страница не найдена</div>} />
        </Routes>
      </Container>
    </>
  );
};
