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
const mdTheme = createTheme({
  background: {
    default: "#fff",
  },
});

function BlockUser(props) {
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
                <h3>Block</h3>
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
              </Grid>
            </Grid>
          </Container>
          <div className="table-section">
          <Table >
            <thead>
                <tr>
                <th></th>
                <th>Client Name</th>
                <th>Wallet Address</th>
                <th>Email Address</th>
                <th>Action</th>
                </tr>
            </thead>
            <tbody>
                <tr>
                <td className="text-center"><input type="checkbox"/></td>
                <td>Mark</td>
                <td>Otto</td>
                <td>@mdo</td>
                <td>
                    <Dropdown className="user-action-dropdown">
                        <Dropdown.Toggle className="user-action-dropdown-btn" id="dropdown-basic">
                            <i class="fa-solid fa-ellipsis"></i>
                        </Dropdown.Toggle>
                        <Dropdown.Menu>
                            <div className="profile-header">
                                <img src={noimage}/>
                                <p>John Wick</p>
                            </div>
                            <div className="dropdown-body">
                                <ul>
                                    <li>
                                        <span>
                                        User Name:
                                        </span>
                                        <p>
                                        johnwick
                                        </p>
                                    </li>
                                    <li>
                                        <span>
                                        DOB:
                                        </span>
                                        <p>
                                        24 July 1980
                                        </p>
                                    </li>
                                    <li>
                                        <span>
                                        Email:
                                        </span>
                                        <p>
                                        john.wick@gameree.net
                                        </p>
                                    </li>
                                    <li>
                                        <span>
                                        Wallet Address:
                                        </span>
                                        <p>
                                        asdklhasdklashdaskl
                                        </p>
                                    </li>
                                </ul>
                            </div>
                            <div className="user-action-footer">
                                <button className="custom-btn dark-danger-btn">Block</button>
                                <button className="custom-btn gray-btn">Delete</button>
                            </div>
                        </Dropdown.Menu>
                    </Dropdown>    
                </td>
                </tr>
            
            </tbody>
            </Table>
          </div>
          
        </Box>
      
      </Box>
    </ThemeProvider>
  );
}

export default BlockUser