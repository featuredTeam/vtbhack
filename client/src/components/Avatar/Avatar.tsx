import { useAuth } from '../../store/auth/hooks/useAuth';
import Avatar from '@mui/material/Avatar';
import React from 'react';

function stringAvatar(name: string) {
  return {
    children: `${name.split(' ')[0][0]}${name.split(' ')[1][0]}`,
  };
}

export const UserAvatar: React.FC = () => {
  const { userInfo } = useAuth();

  return (
    <Avatar
      {...stringAvatar(`${userInfo!.name} ${userInfo!.surname}`)}
    ></Avatar>
  );
};
