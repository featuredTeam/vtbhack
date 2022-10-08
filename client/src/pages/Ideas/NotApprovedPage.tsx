import Typography from '@mui/material/Typography';
import {
  CircularProgress,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Stack,
  TextField,
} from '@mui/material';
import { useAppDispatch, useAppSelector } from '../../store/store';
import { Idea } from './Idea';
import { useEffect, useState } from 'react';
import { getIdeas } from '../../store/ideas/actions/getIdeas';
import { Spacer } from '../../components/common/Spacer';
import Button from '@mui/material/Button';
import { useForm } from 'react-hook-form';
import { IdeaStatus } from '../../store/ideas/types/ideaType';
import { createIdea } from '../../store/ideas/actions/createIdea';

const DefaultValues = {
  title: '',
  description: '',
  amount: 0,
  status: IdeaStatus.Created,
};

export const NotApprovedPage: React.FC = () => {
  const dispatch = useAppDispatch();
  const { loading, notApproved } = useAppSelector((store) => store.ideas);
  const [dialogOpened, setDialogOpened] = useState(false);
  const { register, handleSubmit, reset } = useForm({
    defaultValues: DefaultValues,
  });

  useEffect(() => {
    dispatch(getIdeas());
  }, []);

  if (loading) {
    return <CircularProgress />;
  }

  const onSubmit = handleSubmit((data: any) => {
    console.log(data);
    dispatch(createIdea(data));
    setDialogOpened(false);
    reset(DefaultValues);
  });

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
        <Typography fontSize="2em">Идеи</Typography>
        <Button
          onClick={() => setDialogOpened(true)}
          sx={{ height: '30px' }}
          size="small"
          variant="contained"
        >
          Предложить идею
        </Button>
      </Stack>
      <Spacer height="20px" />
      <Stack
        direction="row"
        sx={{ display: 'flex', maxWidth: '100vw', flexWrap: 'wrap' }}
      >
        {notApproved.map((idea) => (
          <Idea key={idea.id} {...idea} />
        ))}
      </Stack>
      <Dialog open={dialogOpened}>
        <DialogTitle>Какова ваша идея?</DialogTitle>
        <DialogContent>
          <DialogContentText>Заголовок вашей идеи</DialogContentText>
          <TextField placeholder="Введите название" {...register('title')} />
          <Spacer height="10px" />
          <DialogContentText>Описание вашей идеи</DialogContentText>
          <Spacer height="10px" />
          <TextField
            placeholder="Описание название"
            {...register('description')}
          />
          <Spacer height="10px" />
          <DialogContentText>
            Сколько получат исполнители этой задачи
          </DialogContentText>
          <Spacer height="10px" />
          <TextField
            placeholder="Введите сумму..."
            type="number"
            {...register('amount', { valueAsNumber: true })}
          />
        </DialogContent>
        <DialogActions>
          <Button
            onClick={() => {
              reset(DefaultValues);
              setDialogOpened(false);
            }}
          >
            Отмена
          </Button>
          <Button onClick={onSubmit}>Предложить</Button>
        </DialogActions>
      </Dialog>
    </>
  );
};
