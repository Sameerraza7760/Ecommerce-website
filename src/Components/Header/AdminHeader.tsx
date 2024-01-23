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
import { useDispatch } from "react-redux";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import useAuth from "./../../hooks/useAuth";

import "./style.css";

import { setAdmin } from "./../../store/slice/adminSlice";

function ResponsiveAppBar() {
  const dispatch = useDispatch();
  const { logout } = useAuth();
  const email = useSelector((state?: any) => state?.admin?.admin?.email);

  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);

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

      setTimeout(() => {
        dispatch(setAdmin(null));
        logout();
      }, 2000);
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
        
          
          <Typography
            variant="h5"
            noWrap
            component="a"
            href="#app-bar-with-responsive-menu"
            className="ecommercy-heading"
            sx={{
              mr: 2,
              display: { xs: "flex",  },
              flexGrow: 1,
              fontFamily: "monospace",
              fontWeight: 700,
              letterSpacing: ".3rem",

              color: "black",
              textDecoration: "none",
              
            }}
          >
            Ecommercy
          </Typography>

          <Box sx={{ flexGrow: 0 }}>
            <Tooltip title="Open settings">
              <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                <script src="https://cdn.lordicon.com/bhenfmcm.js"></script>
              </IconButton>
            </Tooltip>

            <div className="mb-3">
              <Button
                aria-controls="simple-menu"
                aria-haspopup="true"
                onClick={handleClick}
                className="mb-[10px] "
              >
                {email ? email.replace(/\d+/g, "").split("@")[0] : "Login"}
              </Button>
              {email ? (
                <Menu
                  id="simple-menu"
                  anchorEl={anchorEl}
                  keepMounted
                  open={Boolean(anchorEl)}
                  onClose={handleClose}
                >
                  <MenuItem onClick={() => handleClose("/AdminProfile")}>
                    Setting
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
