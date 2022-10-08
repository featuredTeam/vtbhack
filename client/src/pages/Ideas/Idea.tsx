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
import { MoreVert } from '@mui/icons-material';
import MenuItem from '@mui/material/MenuItem';
import Menu from '@mui/material/Menu';
import * as React from 'react';
import IconButton from '@mui/material/IconButton';
import { useAuth } from '../../store/auth/hooks/useAuth';
import { approveIdeaAction } from '../../store/ideas/actions/approveIdeaAction';
import { declineIdeaAction } from '../../store/ideas/actions/declineIdeaAction';

export const Idea: React.FC<IdeaType> = ({
  user,
  amount,
  score,
  title,
  description,
  id,
}) => {
  const { userInfo } = useAuth();
  const dispatch = useAppDispatch();
  const handleVote = (score: boolean) => () => {
    dispatch(voteIdeaAction(id, score));
  };

  const [anchorIdeas, setAnchorIdeas] = React.useState<null | HTMLElement>(
    null,
  );
  const handleOpenIdeasMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorIdeas(event.currentTarget);
  };

  const handleCloseIdeasMenu = () => {
    setAnchorIdeas(null);
  };

  return (
    <Card
      sx={{
        minWidth: '47%',
        minHeight: '200px',
        marginRight: '30px',
        marginBottom: '30px',
        position: 'relative',
      }}
    >
      {userInfo && userInfo.roles.length > 0 && (
        <IconButton
          sx={{ position: 'absolute', top: '10px', right: '10px' }}
          onClick={handleOpenIdeasMenu}
        >
          <MoreVert sx={{ fill: 'black' }} />
        </IconButton>
      )}
      <Menu
        id="menu-appbar"
        anchorEl={anchorIdeas}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'left',
        }}
        keepMounted
        transformOrigin={{
          vertical: 'top',
          horizontal: 'left',
        }}
        open={Boolean(anchorIdeas)}
        onClose={handleCloseIdeasMenu}
      >
        <MenuItem onClick={() => dispatch(approveIdeaAction(id))}>
          <Typography textAlign="center">Одобрить</Typography>
        </MenuItem>
        <MenuItem onClick={() => dispatch(declineIdeaAction(id))}>
          <Typography textAlign="center">Отклонить</Typography>
        </MenuItem>
      </Menu>
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
        <Stack
          width="100%"
          direction="row"
          display="flex"
          alignItems="center"
          justifyContent="space-between"
        >
          <ButtonGroup>
            <Button onClick={handleVote(false)} color="error">
              -
            </Button>
            <Button
              color={score > 0 ? 'success' : score < 0 ? 'error' : 'info'}
            >
              {score}
            </Button>
            <Button onClick={handleVote(true)} color="success">
              +
            </Button>
          </ButtonGroup>
          <Typography
            color="#777"
            fontSize="0.8rem"
            sx={{ marginRight: '10px' }}
          >
            Исполнитель получит: {amount} монет
          </Typography>
        </Stack>
      </CardActions>
    </Card>
  );
};
