import { Spacer } from '../../components/common/Spacer';
import Typography from '@mui/material/Typography';
import { useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from '../../store/store';
import { getMentorRequests } from '../../store/mentoring/actions/getMentorRequests';
import { MentorRequest } from './MentorRequest';
import {
  CircularProgress,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Divider,
  Stack,
  TextField,
} from '@mui/material';
import Button from '@mui/material/Button';
import { useForm } from 'react-hook-form';
import { createMentorRequestAction } from '../../store/mentoring/actions/createMentorRequestAction';

const DefaultValues = {
  text: '',
  title: '',
};

export const MentorsPage: React.FC = () => {
  const dispatch = useAppDispatch();
  const { loading, mentorRequests } = useAppSelector(
    (store) => store.mentoring,
  );
  const { register, reset, handleSubmit } = useForm({
    defaultValues: DefaultValues,
  });
  const [dialogOpened, setDialogOpened] = useState(false);

  useEffect(() => {
    dispatch(getMentorRequests());
  }, []);

  if (loading) {
    return <CircularProgress />;
  }

  const onSubmit = handleSubmit((data) => {
    dispatch(createMentorRequestAction(data));
    setDialogOpened(false);
    reset(DefaultValues);
  });

  return (
    <>
      <Spacer height="20px" />
      <Stack
        direction="row"
        sx={{ display: 'flex', justifyContent: 'space-between' }}
      >
        <Typography fontSize="2em">Запросы на менторство</Typography>
        <Button
          onClick={() => setDialogOpened(true)}
          sx={{ height: '30px' }}
          variant="contained"
        >
          Оставить заявку
        </Button>
      </Stack>
      <Divider />
      <Spacer height="20px" />
      <Stack direction="row" sx={{ display: 'flex', flexWrap: 'wrap' }}>
        {mentorRequests.map((mr) => (
          <MentorRequest key={mr.id} {...mr} />
        ))}
      </Stack>
      <Dialog open={dialogOpened}>
        <DialogTitle>Какова ваша идея?</DialogTitle>
        <DialogContent>
          <DialogContentText>Заголовок вашего запроса</DialogContentText>
          <TextField placeholder="Введите название" {...register('title')} />
          <Spacer height="10px" />
          <DialogContentText>Описание вашего запроса</DialogContentText>
          <Spacer height="10px" />
          <TextField placeholder="Описание название" {...register('text')} />
        </DialogContent>
        <DialogActions>
          <Button
            onClick={() => {
              reset();
              setDialogOpened(false);
            }}
          >
            Отмена
          </Button>
          <Button type="submit" onClick={onSubmit}>
            Отправить
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};
