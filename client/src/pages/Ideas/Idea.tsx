import { IdeaType } from '../../store/ideas/types/ideaType';
import {
  ButtonGroup,
  Card,
  CardActions,
  CardContent,
  Stack,
} from '@mui/material';
import Typography from '@mui/material/Typography';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import { useAppDispatch } from '../../store/store';
import { voteIdeaAction } from '../../store/ideas/actions/voteIdea';
import { Spacer } from '../../components/common/Spacer';

export const Idea: React.FC<IdeaType> = ({
  user,
  amount,
  score,
  title,
  description,
  id,
}) => {
  const dispatch = useAppDispatch();
  const handleVote = (score: boolean) => () => {
    dispatch(voteIdeaAction(id, score));
  };

  return (
    <Card
      sx={{
        minWidth: '47%',
        minHeight: '200px',
        marginRight: '30px',
        marginBottom: '30px',
      }}
    >
      <CardContent>
        <Stack direction="row" display="flex" alignItems="center">
          <Avatar sx={{ width: '25px', height: '25px' }} />{' '}
          <Spacer width="10px" /> <Typography>{user.username}</Typography>
        </Stack>
        <Spacer height="10px" />
        <Typography fontSize="1.2rem">{title}</Typography>
        <Spacer height="10px" />
        <Typography fontSize="0.8rem" color="#aaa">
          {description}
        </Typography>
      </CardContent>
      <Spacer height="15px" />
      <CardActions>
        <ButtonGroup>
          <Button onClick={handleVote(false)} color="error">
            -
          </Button>
          <Button color={score > 0 ? 'success' : score < 0 ? 'error' : 'info'}>
            {score}
          </Button>
          <Button onClick={handleVote(true)} color="success">
            +
          </Button>
        </ButtonGroup>
      </CardActions>
    </Card>
  );
};
