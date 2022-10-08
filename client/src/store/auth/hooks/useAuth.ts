import { useAppSelector } from '../../store';

export const useAuth = () => {
  const { userInfo, isAuthorized } = useAppSelector((store) => store.auth);

  return { userInfo, isAuthorized };
};
