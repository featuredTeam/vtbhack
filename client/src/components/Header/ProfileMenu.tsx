import React, { useCallback } from 'react';
import Tooltip from '@mui/material/Tooltip';
import IconButton from '@mui/material/IconButton';
import Avatar from '@mui/material/Avatar';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import { UserAvatar } from '../Avatar/Avatar';
import { useNavigate } from 'react-router-dom';
import { useAppDispatch } from '../../store/store';
import { logout } from '../../store/auth/authSlice';
import { useAuth } from '../../store/auth/hooks/useAuth';
import { axios } from '../../utils/axiosInstance';

export const ProfileMenu: React.FC = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { userInfo } = useAuth();
  const [anchorElUser, setAnchorElUser] = React.useState<null | HTMLElement>(
    null,
  );
  const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElUser(event.currentTarget);
  };
  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  const handleNavigateToProfile = useCallback(() => {
    handleCloseUserMenu();
    navigate(`/users/${userInfo!.username}/profile`);
  }, []);

  const handleLogout = useCallback(async () => {
    handleCloseUserMenu();
    await axios.post('/users/logout');
    dispatch(logout());
    navigate('/sign-in');
  }, []);

  return (
    <Box sx={{ flexGrow: 0 }}>
      <Tooltip title="Open settings">
        <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
          <UserAvatar />
        </IconButton>
      </Tooltip>
      <Menu
        sx={{ mt: '45px' }}
        id="menu-appbar"
        anchorEl={anchorElUser}
        anchorOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}
        keepMounted
        transformOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}
        open={Boolean(anchorElUser)}
        onClose={handleCloseUserMenu}
      >
        <MenuItem onClick={handleNavigateToProfile}>
          <Typography textAlign="center">Профиль</Typography>
        </MenuItem>
        <MenuItem onClick={handleLogout}>
          <Typography color={'error'} textAlign="center">
            Выйти
          </Typography>
        </MenuItem>
      </Menu>
    </Box>
  );
};
