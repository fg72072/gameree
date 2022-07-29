import Header from "../menu/header";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
// import FormControlLabel from '@mui/material/FormControlLabel';
// import Checkbox from '@mui/material/Checkbox';
// import Link from "@mui/material/Link";
// import { Link as RouterLink } from "react-router-dom";
import { Link as RouterLink } from "@reach/router";
import Fade from "react-reveal/Fade";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import CircularProgress from "@mui/material/CircularProgress";

import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { useEffect, useState } from "react";
import ApiLink from "./ApiLink";

const customStyles = {
  content: {
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",
  },
};

const theme = createTheme();
const ResetVerification = () => {
  const [emailError, setEmailError] = useState(false);
  const [message, setMessage] = useState({});
  const [showCard, setCard] = useState({ show: false, message: "" });

  const [showSpinner, setShowSpinner] = useState(false);

  const [data, setData] = useState({
    email: "",
    password: "",
  });
  const handleSubmit = async (event) => {
    event.preventDefault();
    setShowSpinner(true);
    const data = new FormData(event.currentTarget);

    if (data.get("email").trim().length === 0) {
      setMessage({
        passwordMessage: "Enter Email",
      });
      // setIsOpen(true);
      setCard({ show: true, message: "Please Enter Email" });

      setShowSpinner(false);
      return;
    }
    const body = {
      email: data.get("email").trim(),
    };
    const apiResult = await fetch(`${ApiLink}/api/forgotPassword`, {
      method: "POST", // or 'PUT'
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    })
      .then((response) => response.json())
      .then((data) => {
        setMessage(data.message);
        setCard({ show: true, message: data.message });

        // setIsOpen(true);
        setShowSpinner(false);

        // console.log("Success:", data);
      })
      .catch((error) => {
        setCard({ show: true, message: JSON.stringify(data) });

        setShowSpinner(false);
        // setCard({show: true , message: .message} )

        setMessage({ ...message, ServerMessage: JSON.stringify(data) });

        console.error("Error:", error);
      });
  };
  return (
    <>
      <Header />
      <ThemeProvider theme={theme}>
        <Container component="main" maxWidth="xs">
          <CssBaseline />
          <Box
            sx={{
              marginTop: 8,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <Grid>
              <div className="display-5 mt-5">Resend Verification</div>
            </Grid>

            <Box
              component="form"
              noValidate
              onSubmit={handleSubmit}
              sx={{ mt: 3 }}
            >
              <Grid container spacing={2}>
                <Grid item xs={12}>
                  <TextField
                    required
                    fullWidth
                    id="email"
                    label="Email Address"
                    name="email"
                    autoComplete="email"
                    onChange={(e) => {
                      setData({ ...data, email: e.target.value });
                    }}
                  />
                </Grid>
                <Fade bottom when={emailError}>
                  <div
                    className="invalid-feedback"
                    //Boostrap 4 uses some CSS tricks to simplify
                    //error handling but we're doing it differently
                    //so the next line disables these tricks
                    style={{ display: "block" }}
                  >
                    Please Provide Valid Email
                  </div>
                </Fade>
              </Grid>
              <Typography className="text-center" component="h1" variant="h5">
                {showSpinner ? <CircularProgress color="secondary" /> : <> </>}
              </Typography>

              <Grid>
                <Button
                  type="submit"
                  size="large"
                  fullWidth
                  variant="contained"
                  sx={{ mt: 3, mb: 2 }}
                  style={{ borderRadius: 15 }}
                >
                  Login
                </Button>
              </Grid>
              {showCard.show === true && (
                <div className="card text-white bg-success mb-3">
                  <div className="card-body">
                    <h5 className="card-title"></h5>
                    <p className="card-text">{showCard.message}</p>
                  </div>
                </div>
              )}
            </Box>
          </Box>
        </Container>
      </ThemeProvider>
    </>
  );
};
export default ResetVerification;
