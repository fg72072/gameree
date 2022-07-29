import Header from "../../menu/header";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import Link from "@mui/material/Link";

import { Link as RouterLink } from "@reach/router";
import Fade from "react-reveal/Fade";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import CircularProgress from "@mui/material/CircularProgress";

import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { useEffect, useState } from "react";
import ApiLink from "../ApiLink";

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
const ForgotPassword = () => {
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
    await fetch(`${ApiLink}/api/forgotPassword`, {
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

        setShowSpinner(false);
      })
      .catch((error) => {
        setCard({ show: true, message: JSON.stringify(data) });

        setShowSpinner(false);

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
              marginTop: 10,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <Box
              component="form"
              noValidate
              onSubmit={handleSubmit}
              sx={{ mt: 3, boxShadow: 3, padding: 2 }}
            >
              <Grid sx={{ mb: 2 }}>
                <div className="display-7 mt-5">Forgot Password</div>
              </Grid>
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
                    style={{ display: "block" }}
                  >
                    Please provide valid email
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
                >
                  Send Request
                </Button>
              </Grid>
              {showCard.show === true && (
                <div
                  className="alert alert-danger"
                  style={{ fontSize: "18px" }}
                >
                  {showCard.message}
                </div>
              )}
            </Box>
          </Box>
        </Container>
      </ThemeProvider>
    </>
  );
};
export default ForgotPassword;
