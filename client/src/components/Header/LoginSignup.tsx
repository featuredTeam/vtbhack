import React, { useCallback } from 'react';
import { ButtonGroup } from '@mui/material';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { useNavigate } from 'react-router-dom';

export const LoginSignup: React.FC = () => {
  const navigate = useNavigate();

  const handleSignIn = useCallback(() => {
    navigate('sign-in');
  }, []);
  const handleSignUp = useCallback(() => {
    navigate('sign-up');
  }, []);

  return (
    <ButtonGroup>
      <Button variant="contained" color="secondary" onClick={handleSignIn}>
        <Typography color="white">Войти</Typography>
      </Button>
      <Button variant="outlined" color="secondary" onClick={handleSignUp}>
        <Typography color="white">Регистрация</Typography>
      </Button>
    </ButtonGroup>
  );
};
