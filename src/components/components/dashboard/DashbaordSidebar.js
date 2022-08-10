import * as React from "react";
import { useState } from "react";
import {  useParams } from "react-router-dom";
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
import nft_sell from "../../../assets/images/nft-sell.png";
import collection from "../../../assets/images/collection.png";
import sidebar_profile from "../../../assets/images/sidebar-profile.png";
import activity from "../../../assets/images/activity.png";
import { useNavigate } from "@reach/router";

const drawerWidth = 250;

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
    backgroundColor: "#100E22",
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
const MainListItems = (props) => {
const nav = useNavigate()
return   <React.Fragment>
<ListItemButton
  className="justify-content-center px-5 mt-2 list-main active-list-main"
  sx={{
    border: "1px solid #f1f1f1",
    backgroundColor: "#F1F1F1",
    boxShadow: "0px 2px 5px 2px rgb(116 113 113 / 27%);",
  }} onClick={(e)=>nav('/dashboard')}>
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
  onClick={(e)=>nav('/nft-sell')}>
  <ListItemIcon>
    <img src={nft_sell} />
  </ListItemIcon>
  <ListItemText className="text-grey" primary="NFTs Sell" />
</ListItemButton>
    <ListItemButton
    className="justify-content-center px-5 mt-2 list-main"
    sx={{
        border: "1px solid #f1f1f1",
    }}
    onClick={(e)=>nav('/collection')}>
  <ListItemIcon>
    <img src={collection} />
  </ListItemIcon>
  <ListItemText className="text-grey" primary="Collection" />
</ListItemButton>
<ListItemButton
  className="justify-content-center px-5 mt-2 list-main"
  sx={{
    border: "1px solid #f1f1f1",
  }}
>
  <ListItemIcon>
    <img src={sidebar_profile} />
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
    <img src={activity} />
  </ListItemIcon>
  <ListItemText className="text-grey" primary="Acount Activity" />
</ListItemButton>
</React.Fragment>

}

function DashboardSidebar(){
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
function closeSidebar()
{
  let element = document.getElementsByClassName("MuiDrawer-paper")[0];
  element.style.width = '0px'
}
const popOpen = Boolean(anchorEl);
const id = popOpen ? "simple-popover" : undefined;
    return <>
    <Drawer variant="permanent" open={open} className="custom-sidebar">
    <div className="logo d-flex sidebar-logo-div">
        <a href="/">
          {" "}
          <img src={DashboardLogo} alt="logo" />{" "}
        </a>
        <i class="fa-solid fa-xmark close-sidebar" onClick={closeSidebar}></i>
    </div>
    <Toolbar
      sx={{
        display: "flex",
        alignItems: "center",
        justifyContent: "flex-end",
        px: [1],
      }}
    >
      {/* <IconButton onClick={toggleDrawer} className="chevron-icon">
        <ChevronLeftIcon />
      </IconButton> */}
    </Toolbar>
    <Divider />
    <List component="nav" >
      <MainListItems />
      {/* <Divider sx={{ my: 1 }} /> */}
      {/* {secondaryListItems} */}
    </List>
  </Drawer>
    </>
}

export default DashboardSidebar