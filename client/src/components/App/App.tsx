import React from 'react';
import { Route, Routes } from 'react-router-dom';
import { Container } from '@mui/material';
import { Header } from '../Header/Header';

export const App: React.FC = () => {
  return (
    <>
      <Header />
      <Container>
        <Routes>
          <Route path="*" element={<div>Страница не найдена</div>} />
        </Routes>
      </Container>
    </>
  );
};
