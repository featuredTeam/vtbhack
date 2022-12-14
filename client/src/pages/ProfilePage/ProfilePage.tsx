import { useParams } from 'react-router-dom';
import { useAuth } from '../../store/auth/hooks/useAuth';
import { useEffect, useMemo, useState } from 'react';
import Typography from '@mui/material/Typography';
import { useAppDispatch } from '../../store/store';
import {
  getAchievementsAction,
  getCompletedAchievements,
  getUserProfile,
  giveAchievement,
  setLoading,
  setProfile,
} from '../../store/profile/profileSlice';
import { useProfile } from '../../store/profile/hooks/useProfile';
import {
  CircularProgress,
  Avatar,
  Alert,
  Dialog,
  DialogTitle,
  TextField,
  DialogContent,
  DialogContentText,
  DialogActions,
} from '@mui/material';
import { Spacer } from '../../components/common/Spacer';
import { Stack } from '@mui/material';
import Button from '@mui/material/Button';
import { useForm } from 'react-hook-form';
import { sendMoneyAction } from '../../store/profile/actions/sendMoney';
import { transformMoney } from '../../store/profile/actions/transformMoney';
import { Achievement } from './Achievement';
import { giveAchievementAction } from '../../store/profile/actions/giveAchievement';
import Container from '@mui/material/Container';
import { getBalance } from '../../store/profile/actions/getBalance';
import { UserRole } from '../../../../common/constants/UserRole';

export const ProfilePage: React.FC = () => {
  const dispatch = useAppDispatch();
  const { username } = useParams<{ username: string }>();
  const { userInfo, isAuthorized } = useAuth();
  const { profile, balance, loading, achievements, completedAchievements } =
    useProfile();

  const { register, handleSubmit, setError } = useForm({
    defaultValues: { amount: 0 },
  });

  const [dialogOpened, setDialogOpened] = useState(false);
  const [achievePickOpened, setAchievePickOpened] = useState(false);
  const [action, setAction] = useState<string | null>(null);

  const isUserPage = useMemo(
    () => username === userInfo?.username,
    [userInfo, username],
  );

  useEffect(() => {
    (async () => {
      dispatch(setLoading(true));
      await dispatch(getAchievementsAction());
      await dispatch(getBalance());
      await dispatch(getCompletedAchievements(username!));
      if (userInfo && username === userInfo.username) {
        await dispatch(setProfile(userInfo));
      } else {
        await dispatch(getUserProfile(username!));
      }
      await dispatch(setLoading(false));
    })();
  }, [userInfo, username]);

  if (loading) {
    return <CircularProgress />;
  } else if (!profile) {
    return (
      <>
        <Spacer height="10px" />
        <Alert severity="error">???? ?????????????? ???????????????? ?????????????? ????????????????????????</Alert>
      </>
    );
  }

  const onSubmit = handleSubmit(async (data) => {
    if (+data.amount > balance) {
      setError('amount', {
        type: 'error',
        message: '',
      });
      return;
    }

    if (action === 'send') {
      await dispatch(sendMoneyAction({ to: username!, amount: +data.amount }));
    } else {
      await dispatch(transformMoney(+data.amount));
    }

    setDialogOpened(false);
  });

  return (
    <>
      <Spacer height="50px" />
      <Stack
        direction="row"
        sx={{ width: '100%', display: 'flex', justifyContent: 'center' }}
      >
        <div>
          <Avatar sx={{ width: '200px', height: '200px' }} variant="rounded" />
          <Spacer height="20px" />
          <Typography fontSize="1.6em">??????????????</Typography>
          <Spacer height="10px" />
          <Typography fontSize="1.3em">????????????: {balance}</Typography>
          <Spacer height="10px" />
          {isAuthorized && (
            <>
              {isUserPage ? (
                <Button
                  onClick={() => {
                    setDialogOpened(true);
                    setAction('transfer');
                  }}
                  sx={{ width: '100%' }}
                  variant="outlined"
                >
                  ?????????? ???? Digital Roubles
                </Button>
              ) : (
                <Button
                  onClick={() => {
                    setDialogOpened(true);
                    setAction('send');
                  }}
                  variant="outlined"
                >
                  ?????????????????? ????????????
                </Button>
              )}
            </>
          )}
        </div>
        <Spacer width="30px" />
        <Stack>
          <Typography fontSize="2.2em" color="primary">
            {profile.name} {profile.surname}
          </Typography>
          <Spacer height="20px" />
          <Stack
            direction="row"
            sx={{ width: '100%', justifyContent: 'space-between' }}
          >
            <Typography fontSize="1.7rem">????????????????????</Typography>
            {userInfo?.roles.map(({ role }) => role).includes(UserRole.Admin) && (
              <>
                <Spacer width="200px" />
                <Button
                  sx={{ borderRadius: '10px', fontSize: '0.7em' }}
                  onClick={() => setAchievePickOpened(true)}
                  variant="contained"
                >
                  ???????????? ????????????????????
                </Button>
              </>
            )}
          </Stack>
          <Stack marginTop="20px" direction={'row'} columnGap="20px">
            {achievements.map((achievement) => (
              <Achievement
                key={achievement.id}
                {...achievement}
                completed={
                  !!completedAchievements.find(
                    ({ id }) => achievement.id === id,
                  )
                }
              />
            ))}
          </Stack>
        </Stack>
      </Stack>
      <Dialog open={achievePickOpened}>
        <DialogTitle>?????????? ???????????????????? ???????????????</DialogTitle>
        <DialogContent>
          {achievements
            .filter(
              ({ id }) => !completedAchievements.find((ach) => ach.id === id),
            )
            .map((achievement) => (
              <Button
                key={achievement.id}
                sx={{ textTransform: 'none' }}
                onClick={() => {
                  setAchievePickOpened(false);
                  dispatch(giveAchievementAction(achievement.id, username!));
                }}
              >
                <Achievement
                  {...achievement}
                  completed={
                    !!completedAchievements.find(
                      ({ id }) => achievement.id === id,
                    )
                  }
                />
              </Button>
            ))}
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setAchievePickOpened(false)}>????????????</Button>
        </DialogActions>
      </Dialog>
      <Dialog
        open={dialogOpened}
        onClose={() => {
          setDialogOpened(false);
          setAction(null);
        }}
      >
        <DialogTitle>
          {action === 'send' ? '??????????????' : '?????????? ?????????? ???? Digital Ruble'}
        </DialogTitle>
        <DialogContent>
          <DialogContentText>
            {action === 'send'
              ? '?????????????? ?????????? ???? ???????????? ??????????????????'
              : '?????????????? ?????????? ???? ???????????? ????????????????'}
          </DialogContentText>
          <Spacer height="20px" />
          <TextField
            {...register('amount', { valueAsNumber: true })}
            type="number"
          />
        </DialogContent>
        <DialogActions>
          <Button
            onClick={() => {
              setDialogOpened(false);
              setAction(null);
            }}
          >
            ????????????
          </Button>
          <Button onClick={onSubmit} type={'submit'}>
            {action === 'send' ? '??????????????????' : '????????????????'}
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};
