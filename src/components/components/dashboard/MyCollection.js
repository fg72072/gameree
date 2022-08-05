import * as React from "react";
import {  createTheme, ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import collectionnft from "../../../assets/images/collection-nft.png";

const mdTheme = createTheme({
  background: {
    default: "#fff",
  },
});

function MyCollection(props) {
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
                <div className="content d-flex">
                  <div className="heading">
                    <h3>My Collections</h3>
                  </div>
                 
                </div>
              </Grid>
         
            </Grid>
            <Grid container spacing={3}>
              {/* small boxes */}
              <Grid item xs={3} md={3} lg={3}>
                <div className="sell-box-layer-1">
                <div className="sell-box-layer-2">
                    <div className="sell-box">
                        <img src={collectionnft} className="nft-img"/>
                    </div>
                    <div className="sell-box-body">
                        <h3>McDonald’s</h3>
                        <h4>291B Oxford St, W1C 2DT, UK</h4>
                    </div>
                    <div className="buttons mainside nft-footer w-100 mt-2">
                         <a className="d-block custom-mt-1">My Collection</a>
                     </div>
                </div>
                </div>
              </Grid>
              <Grid item xs={3} md={3} lg={3}>
                <div className="sell-box-layer-1">
                <div className="sell-box-layer-2">
                    <div className="sell-box">
                        <img src={collectionnft} className="nft-img"/>
                    </div>
                    <div className="sell-box-body">
                        <h3>McDonald’s</h3>
                        <h4>291B Oxford St, W1C 2DT, UK</h4>
                    </div>
                    <div className="buttons mainside nft-footer w-100 mt-2">
                         <a className="d-block custom-mt-1">My Collection</a>
                     </div>
                </div>
                </div>
              </Grid>
              <Grid item xs={3} md={3} lg={3}>
                <div className="sell-box-layer-1">
                <div className="sell-box-layer-2">
                    <div className="sell-box">
                        <img src={collectionnft} className="nft-img"/>
                    </div>
                    <div className="sell-box-body">
                        <h3>McDonald’s</h3>
                        <h4>291B Oxford St, W1C 2DT, UK</h4>
                    </div>
                    <div className="buttons mainside nft-footer w-100 mt-2">
                         <a className="d-block custom-mt-1">My Collection</a>
                     </div>
                </div>
                </div>
              </Grid>
              <Grid item xs={3} md={3} lg={3}>
                <div className="sell-box-layer-1">
                <div className="sell-box-layer-2">
                    <div className="sell-box">
                        <img src={collectionnft} className="nft-img"/>
                    </div>
                    <div className="sell-box-body">
                        <h3>McDonald’s</h3>
                        <h4>291B Oxford St, W1C 2DT, UK</h4>
                    </div>
                    <div className="buttons mainside nft-footer w-100 mt-2">
                         <a className="d-block custom-mt-1">My Collection</a>
                     </div>
                </div>
                </div>
              </Grid>
              <Grid item xs={3} md={3} lg={3}>
                <div className="sell-box-layer-1">
                <div className="sell-box-layer-2">
                    <div className="sell-box">
                        <img src={collectionnft} className="nft-img"/>
                    </div>
                    <div className="sell-box-body">
                        <h3>McDonald’s</h3>
                        <h4>291B Oxford St, W1C 2DT, UK</h4>
                    </div>
                    <div className="buttons mainside nft-footer w-100 mt-2">
                         <a className="d-block custom-mt-1">My Collection</a>
                     </div>
                </div>
                </div>
              </Grid>
              <Grid item xs={3} md={3} lg={3}>
                <div className="sell-box-layer-1">
                <div className="sell-box-layer-2">
                    <div className="sell-box">
                        <img src={collectionnft} className="nft-img"/>
                    </div>
                    <div className="sell-box-body">
                        <h3>McDonald’s</h3>
                        <h4>291B Oxford St, W1C 2DT, UK</h4>
                    </div>
                    <div className="buttons mainside nft-footer w-100 mt-2">
                         <a className="d-block custom-mt-1">My Collection</a>
                     </div>
                </div>
                </div>
              </Grid>
              {/* Chart */}
            </Grid>
          </Container>
        </Box>
      </Box>
    </ThemeProvider>
  );
}

export default MyCollection