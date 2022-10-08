import { useParams } from 'react-router-dom';
import { useAuth } from '../../store/auth/hooks/useAuth';
import { useMemo } from 'react';

export const ProfilePage: React.FC = () => {
  const { username } = useParams<{ username: string }>();
  const { userInfo } = useAuth();

  const isUserPage = useMemo(
    () => username === userInfo?.username,
    [userInfo, username],
  );

  return <></>;
};
