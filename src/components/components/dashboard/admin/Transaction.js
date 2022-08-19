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
import outgoing from '../../../../assets/images/outgoing.png'
import incoming from '../../../../assets/images/incoming.png'
import EditUser from "./EditUser";
const mdTheme = createTheme({
  background: {
    default: "#fff",
  },
});

function Transaction(props) {
    const [edit,setEdit] = React.useState(false)
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
                <h3>Financial Transaction</h3>
                </div>
                <div>
                <TextField id={'address'} placeholder='Search users NFTs'
                            variant='standard'
                            margin='dense' color={"secondary"} sx={{color: '#FFF'}}
                            InputProps={{
                                endAdornment: (
                                    <IconButton sx={{ color: '#FFF' }}><Search/></IconButton>)
                            }}
                />
                </div>
                 </div>
                <div className="table-head-btn">
                  <p>
                    <span>Show</span>
                    <Dropdown className="data-limit-dropdown">
                      <Dropdown.Toggle className="data-limit" id="dropdown-basic">
                        10 <i class="fa-solid fa-sort"></i>
                      </Dropdown.Toggle>
                      <Dropdown.Menu>
                        <Dropdown.Item href="#/action-1">10</Dropdown.Item>
                        <Dropdown.Item href="#/action-2">50</Dropdown.Item>
                        <Dropdown.Item href="#/action-3">100</Dropdown.Item>
                      </Dropdown.Menu>
                    </Dropdown>
                    <span>entries</span>
                  </p>
                  <div className="btns">
                    <button className="action-btn">
                    Excell
                    </button>
                    <button className="action-btn">
                    PDF
                    </button>
                    <button className="action-btn">
                    Print
                    </button>
                  </div>
                </div>
              </Grid>
            </Grid>
          </Container>
          <div className="table-section">
          <Table >
            <thead>
                <tr>
                <th className="text-center"><input type="checkbox"/></th>
                <th>Transaction ID</th>
                <th>Date</th>
                <th>From</th>
                <th>To</th>
                <th>Coin</th>
                <th>Amount</th>
                <th>Note</th>
                <th>Status</th>
                </tr>
            </thead>
            <tbody>
                <tr>
                  <td className="text-center"><div className="send-box primary-bg"><img src={outgoing}/></div></td>
                  <td>#1112568974564564</td>
                  <td>2/5/2022 10:50 AM</td>
                  <td>Marquez</td>
                  <td>Samuel</td>
                  <td>BTC</td>
                  <td>₿ 2,580</td>
                  <td>Lorem ipsum...</td>
                  <td>
                      <span className="custom-btn primary-btn d-block text-center">Completed</span>
                  </td>
                </tr>
                <tr>
                  <td className="text-center"><div className="send-box red-bg"><img src={incoming}/></div></td>
                  <td>#1112568974564564</td>
                  <td>2/5/2022 10:50 AM</td>
                  <td>Marquez</td>
                  <td>Samuel</td>
                  <td>BTC</td>
                  <td>₿ 2,580</td>
                  <td>Lorem ipsum...</td>
                  <td>
                      <span className="custom-btn danger-btn-2 w-100 d-block text-center">Cancel</span>
                  </td>
                </tr>
            </tbody>
            </Table>
          </div>
          <div className="table-footer-navigation">
            <button className="paginate-btn">
              1
            </button>
            <p>
            of Pages
            </p>
            <div className="arrow-btn">
              <button className="btn-move" disabled>
              <i class="fa-solid fa-chevron-left"></i>
              </button>
              <button className="btn-move">
              <i class="fa-solid fa-chevron-right"></i>
              </button>
            </div>
          </div>
          <EditUser isopen={edit ? '0px' : '-250px'} setEdit={setEdit}/>
        </Box>
      
      </Box>
    </ThemeProvider>
  );
}

export default Transaction