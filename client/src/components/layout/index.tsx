import { FC, useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import List from '@mui/material/List';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import ListItem from '@mui/material/ListItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import { Menu, MenuItem } from '@mui/material';
import {
  AccountCircle,
  People as PeopleIcon,
  PeopleOutline as PeopleOutlineIcon,
} from '@mui/icons-material';

import { DrawerHeader, AppBar, Drawer } from './styled-components';
import * as routes from 'routes';
import { typedUseDispatch, typedUseSelector } from 'hooks/redux-hooks';
import { userAuthSelector } from 'selectors';

const MiniDrawer: FC = ({ children }) => {
  const theme = useTheme();
  const [open, setOpen] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);

  const { logoutUser } = typedUseDispatch();
  const { user } = typedUseSelector(userAuthSelector);

  const history = useHistory();

  const handleMenu = (event: React.BaseSyntheticEvent): void => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = (url: string = ''): void | string => {
    setAnchorEl(null);
    return url && history.push(url);
  };

  const openAnchorEl = Boolean(anchorEl);

  return (
    <Box sx={{ display: 'flex', background: '#f5f5f5', minHeight: '100vh' }}>
      <AppBar position='fixed' open={open}>
        <Toolbar>
          <IconButton
            color='inherit'
            aria-label='open drawer'
            onClick={() => setOpen(true)}
            edge='start'
            sx={{
              marginRight: '36px',
              ...(open && { display: 'none' }),
            }}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant='h6' noWrap component='div'>
            Voting App
          </Typography>
          <Box sx={{ marginLeft: 'auto' }}>
            <IconButton
              aria-label='account of current user'
              aria-controls='menu-appbar'
              aria-haspopup='true'
              onClick={handleMenu}
              color='inherit'
              style={{ fontSize: 'inherit' }}
            >
              <AccountCircle />
              {user?.firstName}
            </IconButton>
            <Menu
              id='menu-appbar'
              anchorEl={anchorEl}
              anchorOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              open={openAnchorEl}
              onClose={() => handleClose()}
            >
              <MenuItem onClick={() => handleClose(routes.PROFILE_ROUTE)}>
                Profile
              </MenuItem>
              <MenuItem
                onClick={() => {
                  logoutUser();
                  history.push(routes.LOGIN_ROUTE);
                }}
              >
                Log out
              </MenuItem>
            </Menu>
          </Box>
        </Toolbar>
      </AppBar>
      <Drawer variant='permanent' open={open}>
        <DrawerHeader>
          <IconButton onClick={() => setOpen(false)}>
            {theme.direction === 'rtl' ? (
              <ChevronRightIcon />
            ) : (
              <ChevronLeftIcon />
            )}
          </IconButton>
        </DrawerHeader>
        <Divider />
        <List>
          <Link to={routes.CANDIDATES_ROUTE}>
            <ListItem button>
              <ListItemIcon>
                <PeopleIcon />
              </ListItemIcon>
              <ListItemText primary='Candidates' />
            </ListItem>
          </Link>
          <Link to={routes.VOTERS_ROUTE}>
            <ListItem button>
              <ListItemIcon>
                <PeopleOutlineIcon />
              </ListItemIcon>
              <ListItemText primary='List of Voters' />
            </ListItem>
          </Link>
        </List>
      </Drawer>
      <Box component='main' sx={{ flexGrow: 1, p: 3 }}>
        <DrawerHeader />
        {children}
      </Box>
    </Box>
  );
};

export default MiniDrawer;
