import * as React from "react";
import {  createTheme, ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import Mapbox from "../../mapbox";
import Form from 'react-bootstrap/Form';
const mdTheme = createTheme({
  background: {
    default: "#fff",
  },
});

function Admin(props) {
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
                <Mapbox/>
              </Grid>
            </Grid>
            <aside className="left-sidebar">
                <header>
                    <button className="custom-btn primary-btn">Enable</button>
                    <button className="custom-btn white-btn">Disable</button>
                </header>
                <section className="body-section">
                    <Form>
                    <Form.Group className="form-group" controlId="name">
                        <Form.Label>Building Name</Form.Label>
                        <Form.Control as="textarea"  value={"W1 Curates, Art Gallery, Oxford Street, London, UK"}/>
                    </Form.Group>
                    <Form.Group className="form-group" controlId="number">
                        <Form.Label>Building Number</Form.Label>
                        <Form.Control value={"007"}/>
                    </Form.Group>
                    <Form.Group className="form-group" controlId="bussiness_name">
                        <Form.Label>Business Name</Form.Label>
                        <Form.Control value={"Software House"}/>
                    </Form.Group>
                    <Form.Group className="form-group" controlId="post_code">
                        <Form.Label>Post Code</Form.Label>
                        <Form.Control value={"1000897"}/>
                    </Form.Group>
                    <Form.Group className="form-group" controlId="city">
                        <Form.Label>City</Form.Label>
                        <Form.Control value={"London"}/>
                    </Form.Group>
                    <Form.Group className="form-group" controlId="avatar">
                        <Form.Label>Avatar</Form.Label>
                        <Form.Control value={"Tyson"}/>
                    </Form.Group>
                    <Form.Group className="form-group form-footer-btn-group">
                        <button type="button" className="custom-btn danger-btn">
                          Cancel
                        </button>
                        <button type="button" className="custom-btn light-primary-btn">
                          Save
                        </button>
                    </Form.Group>
                    </Form>
                </section>    
            </aside>
          </Container>
          
        </Box>
      
      </Box>
    </ThemeProvider>
  );
}

export default Admin