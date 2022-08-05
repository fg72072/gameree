import * as React from "react";
import { useEffect, useState } from "react";
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
import CertificateModal from "../../CertificateModal";


import { useWeb3React } from "@web3-react/core";
import { ethers } from "ethers";

import {NFT_addr , gBPG_addr} from '../../../contract/addresses'
import TokenABI from '../../../contract/GBPG.json'
import NFTABI from '../../../contract/GameRee1155.json'


import Web3Modal from 'web3modal'
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





const mdTheme = createTheme({
  background: {
    default: "#fff",
  },
});

function DashboardContent(props) {

  const [balance, setBalance] = useState();
  const [tokenBalance, setTokenBalance] = useState();


  const {
    connector,
    library,
    account,
    chainId,
    activate,
    deactivate,
    active,
    errorWeb3Modal
} = useWeb3React();


useEffect(()=>{
  (async ()=>{
    
    if(library && account){

      try {
        const _balance = await library.getBalance(account);
        setBalance(ethers.utils.formatEther(_balance));
        getDetail()
      }
      catch(error){
        console.log("Error ",error.message);
        setBalance("0");
      }
      return () => {
        setBalance(undefined);
      };
    }
    console.log(account)
  })();
}, [library, account, chainId]);


const loadProvider = async () => {
  try {
      const web3Modal = new Web3Modal();
      const connection = await web3Modal.connect();
      const provider = new ethers.providers.Web3Provider(connection);
      return provider.getSigner();
  }
  catch (e) {
      console.log("loadProvider: ", e)
      
  }
}

const getDetail = async () => {
  try {

      let signer = await loadProvider()
      let TokenContract = new ethers.Contract(gBPG_addr, TokenABI, signer);
      let _balance = await TokenContract.balanceOf(account)
      setTokenBalance(ethers.utils.formatEther(_balance))

  }catch(error){

  }
}

const deposit = async () => {
  try {

      let signer = await loadProvider()
      let TokenContract = new ethers.Contract(gBPG_addr, TokenABI, signer);
      let _deposit = await TokenContract.deposit({value:"1"})
      let tx = _deposit.wait()

  }catch(error){
    console.log(error)
  }
}

  return (
    <ThemeProvider theme={mdTheme} className="dashboard" backgroundColor>
      <Box sx={{ display: "flex", backgroundColor: "#FFF" }} className="dashboard">
        <CssBaseline />
        {
          props.sidebar
        }
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
          {/* <Toolbar /> */}
        
          {
            props.header
          }
          <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
            <Grid container sx={{ mt: 4, mb: 4 }}>
              <Grid item xs={12}>
                <div className="content d-flex heading-flex-column">
                  <div className="heading">
                    <h3>Account Balances</h3>
                  </div>
                  <div className="buttons mainside">
                    <a className="#" onClick={deposit}>Deposit</a>
                    {/* <button className="#" onClick={deposit}>Deposit</button> */}
                    <a className="withdraw-btn">WithDraw</a>
                  </div>
                </div>
              </Grid>
              <Grid item xs={12}>
                <div className="content">
                  <div className="heading">
                    <h6>Wallet Balance</h6>
                    <h5 className="mt-4"> {balance}</h5>
                    <h6>GBPG Balance</h6>
                    <h5 className="mt-4">{tokenBalance}</h5>
                  </div>
                </div>
              </Grid>
            </Grid>
            <Grid container spacing={3}>
              {/* small boxes */}
              <Grid item xs={12} sm={4} md={4} lg={3}>
                <div className="box-layer-1">
                <div className="box-layer-2">
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
                  <h6 className="color-primary">$ 5,150,208,345</h6>
                </Paper>
                </div>
                </div>
              </Grid>
              <Grid item xs={12} sm={4} md={4} lg={3}>
              <div className="box-layer-1">
                <div className="box-layer-2">
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
                  <h6 className="color-primary">$ 5,150,208,345</h6>
                </Paper>
                </div>
                </div>
              </Grid>

              <Grid item xs={12} sm={4} md={4} lg={3}>
              <div className="box-layer-1">
                <div className="box-layer-2">
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
                  <h6 className="color-primary">$ 5,150,208,345</h6>
                </Paper>
                </div>
                </div>
              </Grid>

              <Grid item xs={12} sm={4} md={4} lg={3}>
              <div className="box-layer-1">
                <div className="box-layer-2">
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
                  <h6 className="color-primary">$ 5,150,208,345</h6>
                </Paper>
                </div>
                </div>
              </Grid>

              {/* Chart */}
            </Grid>
          </Container>
        </Box>
      </Box>
      <CertificateModal/>
    </ThemeProvider>
  );
}

export default function Dashboard(props) {
  return <DashboardContent header={props.header} sidebar={props.sidebar}/>;
}
