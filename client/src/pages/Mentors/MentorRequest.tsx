import { MentorRequestType } from '../../store/mentoring/types/mentor_request';
import { Card, CardActions, CardContent, Stack } from '@mui/material';
import Avatar from '@mui/material/Avatar';
import { Spacer } from '../../components/common/Spacer';
import Typography from '@mui/material/Typography';
import * as React from 'react';
import { useAppDispatch } from '../../store/store';
import Button from '@mui/material/Button';
import { applyToMentorRequest } from '../../store/mentoring/actions/applyToMentorRequest';

export const MentorRequest: React.FC<MentorRequestType> = ({
  mentor,
  user,
  title,
  text,
  id,
}) => {
  const dispatch = useAppDispatch();

  return (
    <Card sx={{ width: '300px', marginRight: '20px', marginBottom: '20px' }}>
      <CardContent>
        <Stack direction="row" display="flex" alignItems="center">
          <Avatar sx={{ width: '25px', height: '25px' }} />
          <Spacer width="10px" /> <Typography>{user.username}</Typography>
        </Stack>
        <Spacer height="20px" />
        <Typography fontSize={'1.2rem'}>{title}</Typography>
        <Typography fontSize={'0.8rem'} color={'#777'}>
          {text}
        </Typography>
      </CardContent>
      <CardActions>
        {mentor === null ? (
          <Button onClick={() => dispatch(applyToMentorRequest(id))}>
            Откликнуться
          </Button>
        ) : (
          <Stack direction="row" display="flex" alignItems="center">
            <Typography>Назначен ментор:</Typography>
            <Spacer width="10px" />
            <Avatar sx={{ width: '25px', height: '25px' }} />
            <Spacer width="10px" />
            <Typography>{mentor.username}</Typography>
          </Stack>
        )}
      </CardActions>
    </Card>
  );
};
