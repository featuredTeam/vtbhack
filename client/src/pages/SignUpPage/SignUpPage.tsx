import React, { useCallback, useEffect } from 'react';
import Box from '@mui/material/Box';
import { Stack, TextField, Typography } from '@mui/material';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import Button from '@mui/material/Button';
import { axios } from '../../utils/axiosInstance';
import { useAppDispatch } from '../../store/store';
import { getUserAction } from '../../store/auth/authSlice';
import { useAuth } from '../../store/auth/hooks/useAuth';

type SignupFormType = {
  name: string;
  surname: string;
  username: string;
};

export const SignUpPage: React.FC = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { userInfo } = useAuth();
  const { register, handleSubmit } = useForm({
    defaultValues: {
      name: '',
      surname: '',
      username: '',
    },
  });

  useEffect(() => {
    if (userInfo) {
      navigate(`/users/${userInfo.username}/profile`);
    }
  }, [userInfo]);

  const handleToSignIn = useCallback(() => {
    navigate('/sign-in');
  }, []);

  const onSubmit = useCallback(
    handleSubmit(async (data: SignupFormType) => {
      await axios.post('users/register', data);

      const userInfo = await dispatch(getUserAction());
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
            Создать аккаунт
          </Typography>
          <Stack width="100%" columnGap="20px" direction="row">
            <TextField
              {...register('name', {
                required: true,
              })}
              fullWidth
              placeholder="Введите имя..."
            />
            <TextField
              {...register('surname', {
                required: true,
              })}
              fullWidth
              placeholder="Введите фамилию..."
            />
          </Stack>
          <TextField
            {...register('username', {
              required: true,
            })}
            placeholder="Введите имя пользователя..."
          />
          <Stack display="flex" justifyContent="space-between" direction="row">
            <Button variant="text" onClick={handleToSignIn}>
              <Typography textTransform="none" fontSize="1em">
                У меня уже есть аккаунт
              </Typography>
            </Button>
            <Button variant="contained" type="submit">
              Зарегистрироваться
            </Button>
          </Stack>
        </Stack>
      </Box>
    </form>
  );
};
