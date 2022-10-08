import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import Container from '@mui/material/Container';
import MenuItem from '@mui/material/MenuItem';
import { Logo } from '../Logo/Logo';
import { useAuth } from '../../store/auth/hooks/useAuth';
import { ProfileMenu } from './ProfileMenu';
import { LoginSignup } from './LoginSignup';
import Button from '@mui/material/Button';
import { useNavigate } from 'react-router-dom';
import { ArrowDropDown } from '@mui/icons-material';
import { Spacer } from '../common/Spacer';

export const Header = () => {
  const navigate = useNavigate();

  const [anchorIdeas, setAnchorIdeas] = React.useState<null | HTMLElement>(
    null,
  );
  const handleOpenIdeasMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorIdeas(event.currentTarget);
  };

  const handleCloseIdeasMenu = () => {
    setAnchorIdeas(null);
  };

  const [anchorStudy, setAnchorStudy] = React.useState<null | HTMLElement>(
    null,
  );
  const handleOpenStudyMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorStudy(event.currentTarget);
  };

  const handleCloseStudyMenu = () => {
    setAnchorStudy(null);
  };

  const { isAuthorized } = useAuth();

  return (
    <AppBar position="sticky">
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <Logo />
          <Spacer width="40px" />
          <Box sx={{ flexGrow: 1, display: 'flex' }}>
            <Button onClick={() => navigate('/marketplace')}>
              <Typography color="white" textAlign="center">
                Маркетплейс
              </Typography>
            </Button>
            <Spacer width="20px" />
            <Button onClick={handleOpenIdeasMenu}>
              <Typography color="white" textAlign="center">
                Идеи
              </Typography>
              <ArrowDropDown sx={{ fill: 'white' }} />
            </Button>
            <Spacer width="20px" />
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
              <MenuItem onClick={() => navigate('/ideas/approved')}>
                <Typography textAlign="center">Одобренные</Typography>
              </MenuItem>
              <MenuItem onClick={() => navigate('/ideas/voting')}>
                <Typography textAlign="center">На рассмотрении</Typography>
              </MenuItem>
            </Menu>
            <Button onClick={handleOpenStudyMenu}>
              <Typography color="white" textAlign="center">
                Обучение
              </Typography>
              <ArrowDropDown sx={{ fill: 'white' }} />
            </Button>
            <Menu
              id="menu-appbar"
              anchorEl={anchorStudy}
              anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'left',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'left',
              }}
              open={Boolean(anchorStudy)}
              onClose={handleCloseStudyMenu}
            >
              <MenuItem onClick={() => navigate('/study/courses')}>
                <Typography textAlign="center">Курсы</Typography>
              </MenuItem>
              <MenuItem onClick={() => navigate('/study/mentoring')}>
                <Typography textAlign="center">Менторство</Typography>
              </MenuItem>
            </Menu>
          </Box>
          {isAuthorized ? <ProfileMenu /> : <LoginSignup />}
        </Toolbar>
      </Container>
    </AppBar>
  );
};
