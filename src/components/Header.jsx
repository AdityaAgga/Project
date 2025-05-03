import React, { useState } from 'react';
import { Link, useNavigate } from "react-router-dom";
import { AppBar, Toolbar, Typography, Button, Box, useTheme, Menu, MenuItem, IconButton, Avatar } from '@mui/material';
import { AccountCircle, Brightness4, Brightness7, Logout } from '@mui/icons-material';
import { useAuth } from '../context/AuthContext';

const Header = ({ toggleTheme }) => {
  const theme = useTheme();
  const navigate = useNavigate();
  const { isAuthenticated, userRole, logout } = useAuth();
  const [anchorEl, setAnchorEl] = useState(null);
  const isMenuOpen = Boolean(anchorEl);
  const isMobile = false; // Remove mobile logic for simplicity, or use useMediaQuery if needed

  const handleProfileMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = () => {
    logout();
    handleMenuClose();
    navigate('/');
  };

  const handleDashboard = () => {
    navigate(`/${userRole}/dashboard`);
    handleMenuClose();
  };

  const menuId = 'primary-search-account-menu';
  const renderMenu = (
    <Menu
      anchorEl={anchorEl}
      anchorOrigin={{
        vertical: 'bottom',
        horizontal: 'right',
      }}
      id={menuId}
      keepMounted
      transformOrigin={{
        vertical: 'top',
        horizontal: 'right',
      }}
      open={isMenuOpen}
      onClose={handleMenuClose}
    >
      <MenuItem onClick={handleDashboard}>
        <AccountCircle sx={{ mr: 1 }} />
        Dashboard
      </MenuItem>
      <MenuItem onClick={() => { navigate('/profile'); handleMenuClose(); }}>
        <AccountCircle sx={{ mr: 1 }} />
        Profile
      </MenuItem>
      <MenuItem onClick={handleLogout}>
        <Logout sx={{ mr: 1 }} />
        Logout
      </MenuItem>
    </Menu>
  );

  return (
    <AppBar 
      position="sticky" 
      color="inherit" 
      elevation={1} 
      sx={{ 
        borderBottom: `1px solid ${theme.palette.divider}`, 
        bgcolor: theme.palette.background.paper,
        transition: 'background-color 0.3s'
      }}
    >
      <Toolbar>
        <Typography
          variant="h6"
          component={Link}
          to="/"
          sx={{
            flexGrow: 0,
            textDecoration: 'none',
            color: 'primary.main',
            fontWeight: 700,
            letterSpacing: 2,
            mr: 4
          }}
        >
          CRES
        </Typography>

        <Box sx={{ display: 'flex', gap: 2, alignItems: 'center', flexGrow: 1 }}>
          {!isMobile && (
            <>
              <Button component={Link} to="/" color="inherit">
                Home
              </Button>
              <Button component={Link} to="/about" color="inherit">
                About
              </Button>
              <Button component={Link} to="/how-it-works" color="inherit">
                How it Works
              </Button>
            </>
          )}
        </Box>

        <Box sx={{ display: 'flex', gap: 1, alignItems: 'center' }}>
          <IconButton onClick={toggleTheme} color="inherit">
            {theme.palette.mode === 'dark' ? <Brightness7 /> : <Brightness4 />}
          </IconButton>

          {isAuthenticated ? (
            <>
              <IconButton
                edge="end"
                aria-label="account of current user"
                aria-controls={menuId}
                aria-haspopup="true"
                onClick={handleProfileMenuOpen}
                color="inherit"
              >
                <Avatar sx={{ width: 32, height: 32 }}>
                  <AccountCircle />
                </Avatar>
              </IconButton>
              {renderMenu}
            </>
          ) : (
            <>
              <Button component={Link} to="/sign-in" color="inherit">
                Sign In
              </Button>
              <Button
                component={Link}
                to="/register"
                variant="contained"
                color="primary"
              >
                Register
              </Button>
            </>
          )}
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Header;
