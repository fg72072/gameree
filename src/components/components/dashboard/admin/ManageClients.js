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
import EditUser from "./EditUser";
const mdTheme = createTheme({
  background: {
    default: "#fff",
  },
});

function ManageClients(props) {
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
                <h3>Managing Clients</h3>
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
                    <i class="fa-solid fa-ellipsis pointer" onClick={(e)=>setEdit(true)}></i>
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

export default ManageClients