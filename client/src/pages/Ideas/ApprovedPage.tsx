import Typography from '@mui/material/Typography';
import { CircularProgress, Stack } from '@mui/material';
import { useAppDispatch, useAppSelector } from '../../store/store';
import { Idea } from './Idea';
import { useEffect, useState } from 'react';
import { getIdeas } from '../../store/ideas/actions/getIdeas';
import { Spacer } from '../../components/common/Spacer';
import Button from '@mui/material/Button';
import { useForm } from 'react-hook-form';

export const ApprovedPage: React.FC = () => {
  const dispatch = useAppDispatch();
  const { loading, approved } = useAppSelector((store) => store.ideas);

  useEffect(() => {
    dispatch(getIdeas());
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
        <Typography fontSize="2em">Идеи</Typography>
      </Stack>
      <Spacer height="20px" />
      <Stack
        direction="row"
        sx={{ display: 'flex', maxWidth: '100vw', flexWrap: 'wrap' }}
      >
        {approved.map((idea) => (
          <Idea key={idea.id} {...idea} />
        ))}
      </Stack>
    </>
  );
};
