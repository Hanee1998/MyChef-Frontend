import React, { useEffect, useState } from 'react';
import { useAuth } from '../context/AuthContext';
import {
  AppBar,
  Box,
  Toolbar,
  IconButton,
  Typography,
  Menu,
  Container,
  Avatar,
  Button,
  Tooltip,
  MenuItem,
} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import '../css/Navbar.css';

const Navbar = () => {
  const { currentUser, logout } = useAuth();
  const [userName, setUserName] = useState(null);
  const [anchorElNav, setAnchorElNav] = useState(null);
  const [anchorElUser, setAnchorElUser] = useState(null);

  useEffect(() => {
    const updateUserName = () => {
      if (currentUser) {
        const storedUser = JSON.parse(sessionStorage.getItem('user'));
        if (storedUser) {
          setUserName(storedUser.displayName || storedUser.email.split('@')[0]);
        } else if (currentUser.displayName) {
          setUserName(currentUser.displayName);
        } else {
          setUserName(currentUser.email.split('@')[0]);
        }
      } else {
        setUserName(null);
      }
    };

    updateUserName();
  }, [currentUser]);

  const handleLogout = async () => {
    await logout();
    setUserName(null);
  };

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  const renderNavItems = () => {
    if (!currentUser) {
      return (
        <>
          <MenuItem onClick={handleCloseNavMenu}>
            <a href="/Login" style={{ textDecoration: 'none', color: 'inherit' }}>Login</a>
          </MenuItem>
          <MenuItem onClick={handleCloseNavMenu}>
            <a href="/Signup" style={{ textDecoration: 'none', color: 'inherit' }}>Signup</a>
          </MenuItem>
        </>
      );
    }

    if (currentUser.isAdmin) {
      return (
        <>
          <MenuItem onClick={handleCloseNavMenu}>
            <a href="/admin/settings" style={{ textDecoration: 'none', color: 'inherit' }}>Admin Settings</a>
          </MenuItem>
        </>
      );
    }

    return (
      <>
       <MenuItem onClick={handleCloseNavMenu}>
          <a href="/" style={{ textDecoration: 'none', color: 'inherit' }}>Home</a>
        </MenuItem>
        <MenuItem onClick={handleCloseNavMenu}>
          <a href="/addRecipes" style={{ textDecoration: 'none', color: 'inherit' }}>Add Recipes</a>
        </MenuItem>
        <MenuItem onClick={handleCloseNavMenu}>
          <a href="/userRecipes" style={{ textDecoration: 'none', color: 'inherit' }}>User Recipes</a>
        </MenuItem>
        <MenuItem onClick={handleCloseNavMenu}>
          <a href="/recipesGenerator" style={{ textDecoration: 'none', color: 'inherit' }}>Recipes Generator</a>
        </MenuItem>
        <MenuItem onClick={handleCloseNavMenu}>
          <a href="/contactus" style={{ textDecoration: 'none', color: 'inherit' }}>Contact Us</a>
        </MenuItem>
        <MenuItem onClick={handleCloseNavMenu}>
          <a href="/aboutus" style={{ textDecoration: 'none', color: 'inherit' }}>About Us</a>
        </MenuItem>
      </>
    );
  };

  return (
    <AppBar position="static">
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <Typography
            variant="h6"
            noWrap
            component="a"
            href="/"
            sx={{
              mr: 2,
              display: { xs: 'none', md: 'flex' },
              fontFamily: 'monospace',
              fontWeight: 700,
              letterSpacing: '.3rem',
              color: 'inherit',
              textDecoration: 'none',
            }}
          >
            <img src="/mychef_logo.png" alt="Logo" style={{ height: '70px' }} />
          </Typography>

          <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
            <IconButton
              size="large"
              aria-label="menu"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleOpenNavMenu}
              color="inherit"
            >
              <MenuIcon />
            </IconButton>
            <Menu
              id="menu-appbar"
              anchorEl={anchorElNav}
              anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'left',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'left',
              }}
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}
              sx={{
                display: { xs: 'block', md: 'none' },
              }}
            >
              {renderNavItems()}
            </Menu>
          </Box>
          <Typography
            variant="h5"
            noWrap
            component="a"
            href="/"
            sx={{
              mr: 2,
              display: { xs: 'flex', md: 'none' },
              flexGrow: 1,
              fontFamily: 'monospace',
              fontWeight: 700,
              letterSpacing: '.3rem',
              color: 'inherit',
              textDecoration: 'none',
            }}
          >
            <img src="/mychef_logo.png" alt="Logo" style={{ height: '50px' }} />
          </Typography>
          <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
            <Button
              onClick={handleCloseNavMenu}
              sx={{ my: 2, color: 'white', display: 'block' }}
            >
            </Button>
            {renderNavItems()}
          </Box>

          <Box sx={{ flexGrow: 0 }}>
            {currentUser ? (
              <Tooltip title="Open settings">
                <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                  <Avatar>{userName ? userName.charAt(0).toUpperCase() : 'U'}</Avatar>
                </IconButton>
              </Tooltip>
            ) : null}
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
              <MenuItem onClick={handleCloseUserMenu}>
                <a href="/profile/personal-info" style={{ textDecoration: 'none', color: 'inherit' }}>Manage Profile</a>
              </MenuItem>
              <MenuItem onClick={handleLogout}>
                <Typography textAlign="center">Logout</Typography>
              </MenuItem>
            </Menu>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
};

export default Navbar;
