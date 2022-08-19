import * as React from "react";
import { useState } from "react";
import { useParams } from "react-router-dom";
import { styled, createTheme, ThemeProvider } from "@mui/material/styles";
import useOnclickOutside from "react-cool-onclickoutside";
import CssBaseline from "@mui/material/CssBaseline";
import MuiDrawer from "@mui/material/Drawer";
import Box from "@mui/material/Box";
import MuiAppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import List from "@mui/material/List";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import Badge from "@mui/material/Badge";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import Link from "@mui/material/Link";
// import MenuIcon from "@mui/icons-material/Menu";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
// import NotificationsIcon from "@mui/icons-material/Notifications";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
// import ListSubheader from "@mui/material/ListSubheader";
// import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
// import PeopleIcon from "@mui/icons-material/People";
// import BarChartIcon from "@mui/icons-material/BarChart";
// import LayersIcon from "@mui/icons-material/Layers";
// import AssignmentIcon from "@mui/icons-material/Assignment";
// import Avatar from "@mui/material/Avatar";
import Popover from "@mui/material/Popover";
import Button from "@mui/material/Button";
import BitcoinImg from "../../../assets/images/bitcoin.png";
import EthImg from "../../../assets/images/eth.png";
import Busd from "../../../assets/images/busd.png";
import Usdt from "../../../assets/images/usdt.png";
import DashboardIcon from "../../../assets/images/dashboard-icon.png";
import Accountactivity from "../../../assets/images/account-activity.png";
import ProfileIcon from "../../../assets/images/profile.png";
import DashboardLogo from "../../../assets/images/logo-dashboard.png";
import UserIcon from "../../../assets/images/user.png";
import NotificationIcon from "../../../assets/images/notification.png";
const drawerWidth = 270;

const AppBar = styled(MuiAppBar, {
    shouldForwardProp: (prop) => prop !== "open",
  })(({ theme, open }) => ({
    background: "#FFF",
    zIndex: theme.zIndex.drawer + 1,
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    ...(open && {
      // marginLeft: drawerWidth,
      // width: `calc(100% - ${drawerWidth}px)`,
      transition: theme.transitions.create(["width", "margin"], {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.enteringScreen,
      }),
    }),
}));
const NavLink = (props) => (
    <Link
      {...props}
      getProps={({ isCurrent }) => {
        // the object returned here is passed to the
        // anchor element's props
        return {
          className: isCurrent ? "active" : "non-active",
        };
      }}
    />
  );
function DashboardHeader()
{
    const auth = localStorage.getItem('user');
  // localStorage.removeItem('user');
  //  localStorage.setItem('user','admin');
    const [anchorEl, setAnchorEl] = React.useState(null);
    const [open, setOpen] = React.useState(true);
    const [TotalUsers, setTotalUsers] = useState("loading ...");
    const [openMenu2, setOpenMenu2] = useState(false);

    const toggleDrawer = () => {
    setOpen(!open);
    };
    const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
    };
    const handleBtnClick2 = () => {
    setOpenMenu2(!openMenu2);
    };
    const closeMenu2 = () => {
    setOpenMenu2(false);
    };
    const handleClose = () => {
    setAnchorEl(null);
    };
    const ref2 = useOnclickOutside(() => {
    closeMenu2();
    });
    function openSidebar()
    {
      let element = document.getElementsByClassName("MuiDrawer-paper")[0];
      element.style.width = '270px'
    }
    const popOpen = Boolean(anchorEl);
    const id = popOpen ? "simple-popover" : undefined;
    return <>
      <AppBar position="absolute" open={open} className="custom-header">
          <Toolbar
            className="main-nav"
            sx={{
              pr: "24px", // keep right padding when drawer closed
            }}
          >
            
            <div className="nav-dropdown d-flex mx-3">
              <i class="fa-solid fa-bars open-sidebar" onClick={()=>openSidebar()}></i>
              {
                auth == "user" ?
                <>
                <div className="navbar-item px-3">
                <div ref={ref2} className="dashboard-nav">
                <div>
                  </div>
                  <div
                    className="dropdown-custom dropdown-toggle btn"
                    onClick={handleBtnClick2}
                  >
                    <Typography color={"#545352"}>Products</Typography>
                  </div>
                  {/* {openMenu2 && (
                    <div className="item-dropdown">
                      <div className="dropdown" onClick={closeMenu2}>
                        <NavLink to="/party">Party</NavLink>
                        <NavLink to="/business-meeting">
                          Business Meetings
                        </NavLink>
                      </div>
                    </div>
                  )} */}
                </div>
              </div>
              <div className="navbar-item px-3">
                <div ref={ref2} className="dashboard-nav">
                  <div
                    className="dropdown-custom dropdown-toggle btn"
                    onClick={handleBtnClick2}
                  >
                    <Typography color={"#545352"}>Market</Typography>
                  </div>
                  {/* {openMenu2 && (
                    <div className="item-dropdown">
                      <div className="dropdown" onClick={closeMenu2}>
                        <NavLink to="/party">Party</NavLink>
                        <NavLink to="/business-meeting">
                          Business Meetings
                        </NavLink>
                      </div>
                    </div>
                  )} */}
                </div>
              </div>
              <div className="navbar-item px-3">
                <div ref={ref2} className="dashboard-nav p-relative">
                  <div
                    className="dropdown-custom dropdown-toggle btn"
                    onClick={handleBtnClick2}
                  >
                    <Typography color={"#545352"}>Company</Typography>
                  </div>
                 
                </div>
              </div>
                </>:''
              }
            </div>
            <div className="login-box d-flex align-items-center justify-content-end">
              {" "}
              {/* <Link to="/login">
                {" "}
                <Typography color={"#545352"}>Login </Typography>
              </Link>
              <Link to="registor">
                <Typography color={"#545352"}>Registor</Typography>
              </Link> */}
               <IconButton
                color="inherit"
                aria-describedby={id}
                variant="contained"
                onClick={handleClick}
              >
                <img src={NotificationIcon} alt="notifiaction" />
              </IconButton>
              <Popover
                id={id}
                open={popOpen}
                anchorEl={anchorEl}
                onClose={handleClose}
                anchorOrigin={{
                  vertical: "bottom",
                  horizontal: "left",
                }}
              >
                <Typography sx={{ p: 2 }}>
                  The content of the Popover.
                </Typography>
              </Popover>
              <IconButton
                color="inherit"
                aria-describedby={id}
                variant="contained"
              >
                <img src={UserIcon} alt="userIcon" />
              </IconButton>
             
            </div>
          </Toolbar>
          </AppBar>
    </>
}

export default DashboardHeader