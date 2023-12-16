import AdbIcon from "@mui/icons-material/Adb";
import MenuIcon from "@mui/icons-material/Menu";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Container from "@mui/material/Container";
import IconButton from "@mui/material/IconButton";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import Toolbar from "@mui/material/Toolbar";
import Tooltip from "@mui/material/Tooltip";
import Typography from "@mui/material/Typography";
import * as React from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import useAuth from "./../../hooks/useAuth";

import "./style.css";
const pages = ["Products", "Pricing", "Blog"];
const settings = ["Profile", "Account", "Dashboard", "Logout"];

function ResponsiveAppBar() {
  const { logout } = useAuth();
  const email = useSelector((state?: any) => state?.user?.user?.email);
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = (Route: string) => {
    navigate(Route);
  };

  const [anchorElNav, setAnchorElNav] = React.useState<null | HTMLElement>(
    null
  );
  const [anchorElUser, setAnchorElUser] = React.useState<null | HTMLElement>(
    null
  );
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      toast.success("Logout successful!");
      setTimeout(() => logout(), 2000);
    } catch (error) {
      console.log(error);
    }
  };

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
    <AppBar position="static" style={{ backgroundColor: "white" }}>
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <AdbIcon sx={{ display: { xs: "none", md: "flex" }, mr: 1 }} />
          <Typography
            variant="h6"
            noWrap
            component="a"
            href="#app-bar-with-responsive-menu"
            className="ecommercy-heading"
            sx={{
              mr: 2,
              display: { xs: "none", md: "flex" },
              fontFamily: "Roboto, Arial, sans-serif",
              fontWeight: 800,
              letterSpacing: ".3rem",
              color: "black",
              textDecoration: "none",
            }}
          >
            Ecommercery
          </Typography>

          <Box sx={{ flexGrow: 1, display: { xs: "flex", md: "none" } }}>
            <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleOpenNavMenu}
              style={{ color: "black" }}
            >
              <MenuIcon />
            </IconButton>
            <span style={{ width: "100%" }}></span>
            <Menu
              id="menu-appbar"
              anchorEl={anchorElNav}
              anchorOrigin={{
                vertical: "bottom",
                horizontal: "left",
              }}
              keepMounted
              transformOrigin={{
                vertical: "top",
                horizontal: "left",
              }}
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}
              sx={{
                display: { xs: "block", md: "none" },
              }}
            >
              <Button
                onClick={() => navigate("/Home")}
                sx={{
                  my: 2,
                  color: "black",
                  display: "block",
                  fontFamily: "sans-serif",
                  fontWeight: "300",
                }}
              >
                Home
              </Button>

              <Button
                onClick={() => navigate("/Shop")}
                sx={{
                  my: 2,
                  color: "black",
                  display: "block",
                  fontFamily: "sans-serif",
                  fontWeight: "300",
                }}
              >
                SHOP
              </Button>
              <Button
                onClick={handleCloseNavMenu}
                sx={{
                  my: 2,
                  color: "black",
                  display: "block",
                  fontFamily: "sans-serif",
                  fontWeight: "300",
                }}
              >
                BLOG
              </Button>
              <Button
                onClick={handleCloseNavMenu}
                sx={{
                  my: 2,
                  color: "black",
                  display: "block",
                  fontFamily: "sans-serif",
                  fontWeight: "300",
                }}
              >
                ABOUT
              </Button>
              <Button
                onClick={handleCloseNavMenu}
                sx={{
                  my: 2,
                  color: "black",
                  display: "block",
                  fontFamily: "sans-serif",
                  fontWeight: "300",
                }}
              >
                CONTACT
              </Button>
            </Menu>
          </Box>
          <AdbIcon
            sx={{ display: { xs: "flex", md: "none" }, paddingleft: "15% " }}
          />
          <Typography
            variant="h5"
            noWrap
            component="a"
            href="#app-bar-with-responsive-menu"
            className="responsiveheading"
            sx={{
              mr: 2,
              display: { xs: "flex", md: "none" },
              flexGrow: 1,
              fontFamily: "monospace",
              fontWeight: 700,
              letterSpacing: ".1rem",
              color: "black",
              textDecoration: "none",
            }}
          >
            Ecommercy
          </Typography>
          <Box sx={{ flexGrow: 1, display: { xs: "none", md: "flex" } }}>
            <Button
              onClick={() => navigate("/Home")}
              sx={{
                my: 2,
                color: "black",
                display: "block",
                fontFamily: "sans-serif",
                fontWeight: "300",
              }}
            >
              Home
            </Button>
            <Button
              onClick={() => navigate("/Shop")}
              sx={{
                my: 2,
                color: "black",
                display: "block",
                fontFamily: "sans-serif",
                fontWeight: "300",
              }}
            >
              SHOP
            </Button>
            <Button
              sx={{
                my: 2,
                color: "black",
                display: "block",
                fontFamily: "sans-serif",
                fontWeight: "300",
              }}
              onClick={() => navigate("/Blog")}
            >
              BLOG
            </Button>
            <Button
              onClick={handleCloseNavMenu}
              sx={{
                my: 2,
                color: "black",
                display: "block",
                fontFamily: "sans-serif",
                fontWeight: "300",
              }}
            >
              ABOUT
            </Button>
            <Button
              onClick={handleCloseNavMenu}
              sx={{
                my: 2,
                color: "black",
                display: "block",
                fontFamily: "sans-serif",
                fontWeight: "300",
              }}
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
            <div className="mb-3" >
              <Button
                aria-controls="simple-menu"
                aria-haspopup="true"
                onClick={handleClick}
                className="mb-[10px]"
              >
                {/* IN THIS IF EMAIL TRUTY SO YOU DO REMOVE ALL NUMBER BY USING REPLACE (\/d+/g,"") AFTER REMOVE ALL THE NUMBER
                YOU USED SPLIT TO MAKE ARRAY LIKE .SPLIT(@)[0] mean  ['EXAMPLE','EXAPMLEGMAIL.COM'] BY [0] YOU SELCT FIRST INDEX */}
                {email ? email.replace(/\d+/g, "").split('@')[0] : "Login"}
              </Button>
              {email ? (
                <Menu
                  id="simple-menu"
                  anchorEl={anchorEl}
                  keepMounted
                  open={Boolean(anchorEl)}
                  onClose={handleClose}
                >
                  <MenuItem onClick={() => handleClose("/Profile")}>
                    Profile
                  </MenuItem>
                  <MenuItem onClick={() => handleClose("/Account")}>
                    Account
                  </MenuItem>
                  <MenuItem onClick={handleLogout}>Logout</MenuItem>
                </Menu>
              ) : null}
            </div>
          </Box>
        </Toolbar>
      </Container>
      <ToastContainer />
    </AppBar>
  );
}
export default ResponsiveAppBar;
