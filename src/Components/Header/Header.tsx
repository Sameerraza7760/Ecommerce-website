import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import Container from '@mui/material/Container';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import Tooltip from '@mui/material/Tooltip';
import MenuItem from '@mui/material/MenuItem';
import AdbIcon from '@mui/icons-material/Adb';
import Fontawesome from '@fortawesome/fontawesome-svg-core';


import './style.css'
const pages = ['Products', 'Pricing', 'Blog'];
const settings = ['Profile', 'Account', 'Dashboard', 'Logout'];




function ResponsiveAppBar() {
  const [anchorElNav, setAnchorElNav] = React.useState<null | HTMLElement>(null);
  const [anchorElUser, setAnchorElUser] = React.useState<null | HTMLElement>(null);

  const handleOpenNavMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElNav(event.currentTarget);
  };
  const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  return (
    <AppBar position="static" style={{backgroundColor:'white'}}>
    <Container maxWidth="xl">
      <Toolbar disableGutters>
        <AdbIcon sx={{ display: { xs: 'none', md: 'flex' }, mr: 1 }} />
        <Typography
          variant="h6"
          noWrap
          component="a"
          href="#app-bar-with-responsive-menu"
          className="ecommercy-heading"
          sx={{
              mr: 2,
              display: { xs: 'none', md: 'flex' },
              fontFamily: 'Roboto, Arial, sans-serif',
              fontWeight: 800,
              letterSpacing: '.3rem',
              color: 'black',
              textDecoration: 'none',
         
            }}
            
        >
          Ecommercery
        </Typography>

        <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
          <IconButton
            size="large"
            aria-label="account of current user"
            aria-controls="menu-appbar"
            aria-haspopup="true"
            onClick={handleOpenNavMenu}
           style={{color:'black'}}
          >
            <MenuIcon />
          </IconButton>
          <span style={{width:'100%'}}></span>
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
           
   <Button
  onClick={handleCloseNavMenu}
  sx={{ my: 2, color: 'black', display: 'block', fontFamily: 'sans-serif', fontWeight: '300' }}
>
  Home
</Button>

<Button
  onClick={handleCloseNavMenu}
  sx={{ my: 2, color: 'black', display: 'block', fontFamily: 'sans-serif', fontWeight: '300' }}
>
  SHOP
</Button>
<Button
  onClick={handleCloseNavMenu}
  sx={{ my: 2, color: 'black', display: 'block', fontFamily: 'sans-serif', fontWeight: '300' }}
>
  BLOG
</Button>
<Button
  onClick={handleCloseNavMenu}
  sx={{ my: 2, color: 'black', display: 'block', fontFamily: 'sans-serif', fontWeight: '300' }}
>
  ABOUT
</Button>
<Button
  onClick={handleCloseNavMenu}
  sx={{ my: 2, color: 'black', display: 'block', fontFamily: 'sans-serif', fontWeight: '300' }}
>
  CONTACT
</Button>
          </Menu>
        </Box>
        <AdbIcon sx={{ display: { xs: 'flex', md: 'none' }, paddingleft: '15% ' }} />
        <Typography
          variant="h5"
          noWrap
          component="a"
          href="#app-bar-with-responsive-menu"
          className='responsiveheading'
          sx={{
            mr: 2,
            display: { xs: 'flex', md: 'none' },
            flexGrow: 1,
            fontFamily: 'monospace',
            fontWeight: 700,
            letterSpacing: '.1rem',
            color: 'black',
            textDecoration: 'none',
          }}
        >
          Ecommercy
        </Typography>
        <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex', } } }  >
<Button
  onClick={handleCloseNavMenu}
  sx={{ my: 2, color: 'black', display: 'block', fontFamily: 'sans-serif', fontWeight: '300' }}

>
  Home
</Button>
<Button
  onClick={handleCloseNavMenu}
  sx={{ my: 2, color: 'black', display: 'block', fontFamily: 'sans-serif', fontWeight: '300' }}
>
  SHOP
</Button>
<Button
  onClick={handleCloseNavMenu}
  sx={{ my: 2, color: 'black', display: 'block', fontFamily: 'sans-serif', fontWeight: '300' }}
>
  BLOG
</Button>
<Button
  onClick={handleCloseNavMenu}
  sx={{ my: 2, color: 'black', display: 'block', fontFamily: 'sans-serif', fontWeight: '300' }}
>
  ABOUT
</Button>
<Button
  onClick={handleCloseNavMenu}
  sx={{ my: 2, color: 'black', display: 'block', fontFamily: 'sans-serif', fontWeight: '300' }}
>
  CONTACT
</Button>
</Box>




        <Box sx={{ flexGrow: 0 }}>
          <Tooltip title="Open settings">
            <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
            <script src="https://cdn.lordicon.com/bhenfmcm.js"></script>
      
         
            </IconButton>
        
          </Tooltip>
       <Button  style={{color:'black', fontFamily:'sans-serif'}}>  <span>Login</span>   <Menu
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
            {settings.map((setting) => (
              <MenuItem key={setting} onClick={handleCloseUserMenu}>
                <Typography textAlign="center">{setting}</Typography>
              </MenuItem>
            ))}
          </Menu>
          {/* <FontAwesomeIcon icon="fa-duotone fa-user" fade /> */}
          </Button>
        </Box>
      </Toolbar>
    </Container>
  </AppBar>  );
}
export default ResponsiveAppBar;