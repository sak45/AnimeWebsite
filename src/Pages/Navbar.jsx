import React, { useState } from 'react';
import { getAuth, signOut } from "firebase/auth";
import { useNavigate } from 'react-router-dom';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import AccountCircle from '@mui/icons-material/AccountCircle';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import '../App.css';

const theme = createTheme();

function Navbar({ user }) {
  const [auth, setAuth] = useState(true);
  const [anchorEl, setAnchorEl] = useState(null);
  const authInstance = getAuth();
  const navigate = useNavigate();

  const handleChange = (event) => {
    setAuth(event.target.checked);
  };

  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const settingPage = ({user}) => {
    navigate('/Setting');
  }

  const homePage = () => {
    navigate('/Home');
  }

  const profilePage = () => {
    navigate('/Profile');
  }

  const logOut = () => {
    signOut(authInstance)
      .then(() => {
        navigate('/');
        console.log('logged out successfully');
      })
      .catch((error) => {
        console.log('Error logging out:', error);
      });
  };

  return (
    <ThemeProvider theme={theme}>
      <div>
        <Box sx={{ flexGrow: 1 }}>
          <AppBar position="static">
            <Toolbar>
              <IconButton
                size="large"
                edge="start"
                color="inherit"
                aria-label="menu"
                sx={{ mr: 2 }}
                // onClick={() => console.log('menu clicked')}
              >
                <MenuIcon />
              </IconButton>
              <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                LinkUp
              </Typography>
              {auth && (
                <div className="user-detail">
                  <h2>{user?.displayName}</h2>
                  <IconButton
                    size="large"
                    aria-label="account of current user"
                    aria-controls="menu-appbar"
                    aria-haspopup="true"
                    onClick={handleMenu}
                    color="inherit"
                  >
                    <AccountCircle />
                  </IconButton>
                  <Menu
                    id="menu-appbar"
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
                    open={Boolean(anchorEl)}
                    onClose={handleClose}
                  >
                    <MenuItem onClick={profilePage}>Profile</MenuItem>
                    <MenuItem onClick={homePage}>Home</MenuItem>
                    <MenuItem onClick={settingPage}>Setting</MenuItem>
                    <MenuItem onClick={logOut}>Log Out</MenuItem>
                  </Menu>
                </div>
              )}
            </Toolbar>
          </AppBar>
        </Box>
      </div>
    </ThemeProvider>
  );
}

export default Navbar;
