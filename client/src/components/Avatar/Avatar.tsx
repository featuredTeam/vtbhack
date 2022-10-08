import { useAuth } from '../../store/auth/hooks/useAuth';
import Avatar from '@mui/material/Avatar';
import React from 'react';

export const UserAvatar: React.FC = () => {
  const { userInfo } = useAuth();

  return (
    <Avatar
      alt={userInfo!.name}
      src={`data:image/png;base64,${userInfo!.avatar}`}
    />
  );
};
