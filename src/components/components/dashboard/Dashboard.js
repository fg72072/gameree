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
// import {
//   whiteLogo,
//   userIcon,
//   userSearchIcon,
//   walletIcon,
//   Amount,
//   Profit,
//   Shares,
// } from "../components/Images";
// import { mainListItems, secondaryListItems } from "./listItems";
// import Deposits from "./Deposits";
// import Orders from "./Orders";

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

const drawerWidth = 300;

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
    marginLeft: drawerWidth,
    // width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

const Drawer = styled(MuiDrawer, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
  "& .MuiDrawer-paper": {
    position: "relative",
    whiteSpace: "nowrap",
    width: drawerWidth,
    transition: theme.transitions.create("width", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
    backgroundColor: "#FFFBFB",
    boxSizing: "border-box",
    ...(!open && {
      overflowX: "hidden",
      transition: theme.transitions.create("width", {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
      }),
      width: theme.spacing(7),
      [theme.breakpoints.up("sm")]: {
        width: theme.spacing(9),
      },
    }),
  },
}));

export const mainListItems = (
  <React.Fragment>
    <ListItemButton
      className="justify-content-center px-5 mt-2 list-main"
      sx={{
        border: "1px solid #f1f1f1",
        backgroundColor: "#F1F1F1",
        boxShadow: "0px 2px 5px 2px rgb(116 113 113 / 27%);",
      }}
    >
      <ListItemIcon>
        <img src={DashboardIcon} />
      </ListItemIcon>
      <ListItemText className="text-grey" primary="Dashboard" />
    </ListItemButton>
    <ListItemButton
      className="justify-content-center px-5 mt-2 list-main"
      sx={{
        border: "1px solid #f1f1f1",
      }}
    >
      <ListItemIcon>
        <img src={Accountactivity} />
      </ListItemIcon>
      <ListItemText className="text-grey" primary="Account activity" />
    </ListItemButton>
    <ListItemButton
      className="justify-content-center px-5 mt-2 list-main"
      sx={{
        border: "1px solid #f1f1f1",
      }}
    >
      <ListItemIcon>
        <img src={ProfileIcon} />
      </ListItemIcon>
      <ListItemText className="text-grey" primary="Profile" />
    </ListItemButton>
    <ListItemButton
      className="justify-content-center px-5 mt-2 list-main"
      sx={{
        border: "1px solid #f1f1f1",
      }}
    >
      <ListItemIcon>
        <img src={Accountactivity} />
      </ListItemIcon>
      <ListItemText className="text-grey" primary="User" />
    </ListItemButton>
    <ListItemButton
      className="justify-content-center px-5 mt-2 list-main"
      sx={{
        border: "1px solid #f1f1f1",
      }}
    >
      <ListItemIcon>
        <img src={Accountactivity} />
      </ListItemIcon>
      <ListItemText className="text-grey" primary="Platefrom Fee" />
    </ListItemButton>
    <ListItemButton
      className="justify-content-center px-5 mt-2 list-main"
      sx={{
        border: "1px solid #f1f1f1",
      }}
    >
      <ListItemIcon>
        <img src={Accountactivity} />
      </ListItemIcon>
      <ListItemText className="text-grey" primary="Platform Fee" />
    </ListItemButton>
  </React.Fragment>
);

const mdTheme = createTheme({
  background: {
    default: "#fff",
  },
});

function DashboardContent() {
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

  const popOpen = Boolean(anchorEl);
  const id = popOpen ? "simple-popover" : undefined;

  return (
    <ThemeProvider theme={mdTheme} className="dashboard" backgroundColor>
      <Box sx={{ display: "flex", backgroundColor: "#FFF" }}>
        <CssBaseline />
        <AppBar position="absolute" open={open}>
          <Toolbar
            className="main-nav"
            sx={{
              pr: "24px", // keep right padding when drawer closed
            }}
          >
            {/* <IconButton
              edge="start"
              color="inherit"
              aria-label="open drawer"
              onClick={toggleDrawer}
              sx={{
                marginRight: "36px",
                color: "#E60E10",
                ...(open && { display: "none" }),
              }}
            >
              <MenuIcon />
            </IconButton> */}
            <div className="logo d-flex ">
              <a href="/">
                {" "}
                <img src={DashboardLogo} alt="logo" />{" "}
              </a>
            </div>
            <div className="nav-dropdown d-flex mx-3">
              <div className="navbar-item px-3">
                <div ref={ref2} className="dashboard-nav">
                  <div
                    className="dropdown-custom dropdown-toggle btn"
                    onClick={handleBtnClick2}
                  >
                    <Typography color={"#545352"}>Products</Typography>
                  </div>
                  {openMenu2 && (
                    <div className="item-dropdown">
                      <div className="dropdown" onClick={closeMenu2}>
                        <NavLink to="/party">Party</NavLink>
                        <NavLink to="/business-meeting">
                          Business Meetings
                        </NavLink>
                      </div>
                    </div>
                  )}
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
                  {openMenu2 && (
                    <div className="item-dropdown">
                      <div className="dropdown" onClick={closeMenu2}>
                        <NavLink to="/party">Party</NavLink>
                        <NavLink to="/business-meeting">
                          Business Meetings
                        </NavLink>
                      </div>
                    </div>
                  )}
                </div>
              </div>
              <div className="navbar-item px-3">
                <div ref={ref2} className="dashboard-nav">
                  <div
                    className="dropdown-custom dropdown-toggle btn"
                    onClick={handleBtnClick2}
                  >
                    <Typography color={"#545352"}>Company</Typography>
                  </div>
                  {openMenu2 && (
                    <div className="item-dropdown">
                      <div className="dropdown" onClick={closeMenu2}>
                        <NavLink to="/party">Party</NavLink>
                        <NavLink to="/business-meeting">
                          Business Meetings
                        </NavLink>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>

            <div className="login-box d-flex align-items-center justify-content-end">
              {" "}
              <Link to="/login">
                {" "}
                <Typography color={"#545352"}>Login </Typography>
              </Link>
              <Link to="registor">
                <Typography color={"#545352"}>Registor</Typography>
              </Link>
              <IconButton
                color="inherit"
                aria-describedby={id}
                variant="contained"
                onClick={handleClick}
              >
                <img src={UserIcon} alt="userIcon" />
              </IconButton>
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
            </div>
          </Toolbar>
        </AppBar>
        <Drawer variant="permanent" open={open}>
          <Toolbar
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "flex-end",
              px: [1],
            }}
          >
            <IconButton onClick={toggleDrawer} className="chevron-icon">
              <ChevronLeftIcon />
            </IconButton>
          </Toolbar>
          <Divider />
          <List component="nav">
            {mainListItems}
            {/* <Divider sx={{ my: 1 }} /> */}
            {/* {secondaryListItems} */}
          </List>
        </Drawer>
        <Box
          component="main"
          sx={{
            backgroundColor: (theme) =>
              theme.palette.mode === "light"
                ? theme.palette.grey[0]
                : theme.palette.grey[900],
            flexGrow: 1,
            height: "100vh",
            overflow: "auto",
          }}
        >
          <Toolbar />
          <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
            <Grid container sx={{ mt: 4, mb: 4 }}>
              <Grid item xs={12}>
                <div className="content d-flex">
                  <div className="heading">
                    <h3>Account Balance</h3>
                  </div>
                  <div className="buttons mainside">
                    <a className="#">Deposit</a>
                    <a className="withdraw-btn">WithDraw</a>
                  </div>
                </div>
              </Grid>
              <Grid item xs={12}>
                <div className="content">
                  <div className="heading">
                    <h6>Wallet Balance</h6>
                    <h5 className="mt-4">0.00 BTC</h5>
                  </div>
                </div>
              </Grid>
            </Grid>
            <Grid container spacing={3}>
              {/* small boxes */}
              <Grid item xs={3} md={3} lg={3}>
                <Paper
                  sx={{
                    p: 2,
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    padding: "35px",
                  }}
                  className="dashboard-box first-box"
                >
                  <img src={BitcoinImg} alt="bitcoin" />

                  <h6 className="text-center color-primary">BTC</h6>
                  <span className="color-primary">Bitcoin</span>
                  <h6 className="color-primary">0.00000000</h6>
                </Paper>
              </Grid>
              <Grid item xs={3} md={3} lg={3}>
                <Paper
                  sx={{
                    p: 2,
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    padding: "35px",
                  }}
                  className="dashboard-box "
                >
                  <img src={EthImg} alt="EthImg.png" />

                  <h6 className="text-center color-primary">BTC</h6>
                  <span className="color-primary">Bitcoin</span>
                  <h6 className="color-primary">0.00000000</h6>
                </Paper>
              </Grid>

              <Grid item xs={3} md={3} lg={3}>
                <Paper
                  sx={{
                    p: 2,
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    padding: "35px",
                  }}
                  className="dashboard-box "
                >
                  <img src={Busd} alt="Busd.png" />

                  <h6 className="text-center color-primary">BTC</h6>
                  <span className="color-primary">Bitcoin</span>
                  <h6 className="color-primary">0.00000000</h6>
                </Paper>
              </Grid>

              <Grid item xs={3} md={3} lg={3}>
                <Paper
                  sx={{
                    p: 2,
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    padding: "35px",
                  }}
                  className="dashboard-box "
                >
                  <img src={Usdt} alt="Usdt.png" />

                  <h6 className="text-center color-primary">BTC</h6>
                  <span className="color-primary">Bitcoin</span>
                  <h6 className="color-primary">0.00000000</h6>
                </Paper>
              </Grid>

              {/* Chart */}
            </Grid>
          </Container>
        </Box>
      </Box>
    </ThemeProvider>
  );
}

export default function Dashboard() {
  return <DashboardContent />;
}
