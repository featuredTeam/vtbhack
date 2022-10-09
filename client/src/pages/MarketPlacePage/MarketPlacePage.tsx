import { useAuth } from '../../store/auth/hooks/useAuth';
import { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../../store/store';
import { setLoading, setProfile } from '../../store/profile/profileSlice';
import { useProfile } from '../../store/profile/hooks/useProfile';
import { CircularProgress } from '@mui/material';
import { Stack } from '@mui/material';
import { getItems } from '../../store/items/actions/getItems';
import { Item } from './Item';
import { Spacer } from '../../components/common/Spacer';
import Typography from '@mui/material/Typography';
import { getBalance } from '../../store/profile/actions/getBalance';

export const MarketPlacePage: React.FC = () => {
  const dispatch = useAppDispatch();
  const { userInfo, isAuthorized } = useAuth();
  const { balance } = useProfile();

  const { items, loading } = useAppSelector((store) => store.items);

  useEffect(() => {
    (async () => {
      dispatch(setLoading(true));
      await dispatch(getBalance());
      if (userInfo) await dispatch(setProfile(userInfo));

      dispatch(setLoading(false));
    })();
  }, [userInfo]);

  useEffect(() => {
    dispatch(getItems());
  }, []);

  if (loading) {
    return <CircularProgress />;
  }

  return (
    <>
      <Spacer height="20px" />
      <Stack
        direction="row"
        sx={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
        }}
      >
        <Typography fontSize="2em">Маркетплейс</Typography>
      </Stack>
      {isAuthorized && (
        <Typography color="#333">Ваш баланс: {balance} монет</Typography>
      )}
      <Spacer height="20px" />
      <Stack
        direction="row"
        sx={{
          width: '100%',
          display: 'flex',
          flexWrap: 'wrap',
          justifyContent: 'flex-start',
        }}
      >
        {items?.map((item) => (
          <Item key={item.id} item={item} />
        ))}
      </Stack>
    </>
  );
};
