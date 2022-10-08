import React, { useCallback, useEffect } from 'react';
import Box from '@mui/material/Box';
import { Paper, Stack, TextField, Typography } from '@mui/material';
import { Spacer } from '../../components/common/Spacer';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import Button from '@mui/material/Button';
import { axios } from '../../utils/axiosInstance';
import { useAppDispatch } from '../../store/store';
import { getUserAction } from '../../store/auth/authSlice';
import { useAuth } from '../../store/auth/hooks/useAuth';

type LoginFormType = {
  username: string;
};

export const SignInPage: React.FC = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { userInfo } = useAuth();
  const { register, handleSubmit } = useForm({
    defaultValues: {
      username: '',
    },
  });

  useEffect(() => {
    if (userInfo) {
      navigate(`/users/${userInfo.username}/profile`);
    }
  }, [userInfo]);

  const handleToSignUp = useCallback(() => {
    navigate('/sign-up');
  }, []);

  const onSubmit = useCallback(
    handleSubmit(async (data: LoginFormType) => {
      await axios.post('users/login', data);

      await dispatch(getUserAction());
    }),
    [],
  );

  return (
    <form onSubmit={onSubmit}>
      <Box
        display="flex"
        minHeight="90vh"
        alignItems="center"
        justifyContent="center"
      >
        <Stack width="600px" border="none" rowGap="20px">
          <Typography justifyContent="center" display="flex" fontSize="2em">
            Войти в свой аккаунт
          </Typography>
          <TextField
            {...register('username', {
              required: true,
            })}
            placeholder="Введите имя пользователя..."
          />
          <Stack display="flex" justifyContent="space-between" direction="row">
            <Button variant="text" onClick={handleToSignUp}>
              <Typography textTransform="none" fontSize="1em">
                У меня еще нет аккаунта
              </Typography>
            </Button>
            <Button variant="contained" type="submit">
              Войти
            </Button>
          </Stack>
        </Stack>
      </Box>
    </form>
  );
};
