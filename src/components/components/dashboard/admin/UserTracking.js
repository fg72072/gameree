import * as React from "react";
import {  createTheme, ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import Mapbox from "../../mapbox";
import Form from 'react-bootstrap/Form';
import { IconButton, TextField } from "@mui/material";
import { Search } from "@material-ui/icons";
import { Dropdown, Table } from "react-bootstrap";
import noimage from '../../../../assets/images/no-image.png'
import FinancialChart from "./chart/FinancialChart";
const mdTheme = createTheme({
  background: {
    default: "#fff",
  },
});

function UserTracking(props) {
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
              <Grid item xs={12} sm={12} lg={12}>
              <div className="content d-flex justify-content-between heading-flex-column">
                <div className="heading">
                <h3>User Tracking</h3>
                </div>
                 </div>
              </Grid>
            </Grid>
          </Container>
          <div className="chart-section">
            <FinancialChart/>
          </div>
          
        </Box>
      
      </Box>
    </ThemeProvider>
  );
}

export default UserTracking