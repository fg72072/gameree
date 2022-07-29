import * as React from "react";
import ApiLink from "./ApiLink.js";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";

import Link from "@mui/material/Link";
import { Link as RouterLink } from "@reach/router";

import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import CircularProgress from "@mui/material/CircularProgress";
import { useEffect, useState } from "react";
import Fade from "react-reveal/Fade";
import IconButton from "@mui/material/IconButton";
import OutlinedInput from "@mui/material/OutlinedInput";
import InputLabel from "@mui/material/InputLabel";
import InputAdornment from "@mui/material/InputAdornment";
import FormControl from "@mui/material/FormControl";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import Modal from "react-modal";

import { motion } from "framer-motion";
import Header from "../menu/header.js";
// import { toast } from "react-toastify";

// import FormControlLabel from '@mui/material/FormControlLabel';
// import Checkbox from '@mui/material/Checkbox';
// import { LinearProgress } from '@mui/material';
// import { LinearProgress } from "@mui/material";
// import { Link as RouterLink } from "react-router-dom";

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
Modal.setAppElement("#root");

export default function SignUp() {
  // const notify = () => toast();

  const [showCard, setCard] = useState({ show: false, message: "" });

  const [message, setMessage] = useState({});

  const [showSpinner, setShowSpinner] = useState(false);

  const [data, setData] = useState({
    username: "",
    email: "",
    password: "",
  });

  const handleSubmit = async (event) => {
    event.preventDefault();
    setShowSpinner(true);
    const data = new FormData(event.currentTarget);

    if (data.get("userName").trim().length === 0) {
      setMessage({
        passwordMessage: "Enter User Name ",
      });

      setCard({ show: true, message: "Please Enter User Name" });
      // setIsOpen(true);

      setShowSpinner(false);
      return;
    }
    if (data.get("email").trim().length === 0) {
      setMessage({
        passwordMessage: "Enter Email",
      });
      setCard({ show: true, message: "Please Enter Email" });

      // setIsOpen(true);
      setShowSpinner(false);
      return;
    }

    if (values.password.trim().length < 8) {
      setMessage({
        passwordMessage: "Enter Strong Password",
      });
      setCard({ show: true, message: "Please Enter Strong Password" });

      // setIsOpen(true);
      setShowSpinner(false);
      return;
    }
    const body = {
      userName: data.get("userName").trim(),
      email: data.get("email").trim(),
      password: values.password,
    };

    await fetch(`${ApiLink}/register`, {
      method: "POST", // or 'PUT'

      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.error) setMessage(data.error.errors);
        else {
          setMessage(data.message);
        }

        setCard({ show: true, message: data.message });

        // setIsOpen(true);
        setShowSpinner(false);
      })
      .catch((error) => {
        setShowSpinner(false);
        setCard({ show: true, message: JSON.stringify(error.error) });

        setMessage({ ServerMessage: JSON.stringify(error) });

        console.error("Error:", error);
      });
  };

  const [emailError, setEmailError] = useState(false);
  const [passError, setPassError] = useState(false);
  const [userNameError, setUserNameError] = useState(false);

  useEffect(() => {
    if (data.username.length < 5) {
      setUserNameError(true);
    } else {
      setUserNameError(false);
    }

    var email = data.email;
    var reg = /.+@.+\..+/;
    let Emailmatches = email.match(reg);
    // console.log(email);
    if (Emailmatches == null) {
      setEmailError(true);
    } else {
      if (data.email.length < 10 && Emailmatches.length === 0) {
        setEmailError(true);
      } else {
        setEmailError(false);
      }
    }

    var password = data.password;
    reg = /^(?=.*\d)(?=.*[A-Z])(?=.*[a-z])(?=.*[^\w\d\s:])([^\s]){8,16}$/;
    let matches = password.match(reg);

    if (matches == null) {
      setPassError(true);
    } else {
      if (data.password.length < 8 && matches.length === 0) {
        setPassError(true);
      } else {
        setPassError(false);
      }
    }
  }, [data]);

  let subtitle;
  const [modalIsOpen, setIsOpen] = useState(false);

  function afterOpenModal() {
    subtitle.style.color = "#f00";
  }

  function closeModal() {
    setIsOpen(false);
  }

  const [values, setValues] = React.useState({
    password: "",
    showPassword: false,
  });

  const handleChange = (prop) => (event) => {
    setData({ ...data, password: event.target.value });
    setValues({ ...values, [prop]: event.target.value });
  };

  const handleClickShowPassword = () => {
    setValues({
      ...values,
      showPassword: !values.showPassword,
    });
  };

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  return (
    <>
      <Header />
      <ThemeProvider theme={theme}>
        <Container component="main" maxWidth="xs">
          <CssBaseline />

          <Modal
            isOpen={modalIsOpen}
            onAfterOpen={afterOpenModal}
            onRequestClose={closeModal}
            style={customStyles}
            contentLabel=""
          >
            <div>{JSON.stringify(message)}</div>
            <div className="text-center">
              <motion.button
                whileHover={{
                  scale: 1.1,
                  transition: { duration: 1 },
                }}
                className="btn-main-large inline lead "
                onClick={closeModal}
              >
                Close
              </motion.button>
            </div>
          </Modal>

          <Box
            sx={{
              marginTop: 8,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}></Avatar>
            <Typography component="h1" variant="h5">
              {showSpinner ? <CircularProgress color="secondary" /> : <> </>}
            </Typography>

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
                    id="userName"
                    label="User Name"
                    name="userName"
                    autoComplete="userName"
                    onChange={(e) => {
                      setData({ ...data, username: e.target.value });
                    }}
                  />
                </Grid>
                <Fade bottom when={userNameError}>
                  <div
                    className="invalid-feedback"
                    style={{ display: "block" }}
                  >
                    Please Provide Valid UserName
                  </div>
                </Fade>

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

                <Grid item xs={12}>
                  <FormControl xs={12} variant="outlined" required fullWidth>
                    <InputLabel htmlFor="outlined-adornment-password">
                      Password
                    </InputLabel>
                    <OutlinedInput
                      id="outlined-adornment-password"
                      type={values.showPassword ? "text" : "password"}
                      value={values.password}
                      onChange={handleChange("password")}
                      endAdornment={
                        <InputAdornment position="end">
                          <IconButton
                            aria-label="toggle password visibility"
                            onClick={handleClickShowPassword}
                            onMouseDown={handleMouseDownPassword}
                            edge="end"
                          >
                            {values.showPassword ? (
                              <VisibilityOff />
                            ) : (
                              <Visibility />
                            )}
                          </IconButton>
                        </InputAdornment>
                      }
                      label="Password"
                    />
                  </FormControl>
                  <Fade bottom when={passError}>
                    <div
                      className="invalid-feedback"
                      //Boostrap 4 uses some CSS tricks to simplify
                      //error handling but we're doing it differently
                      //so the next line disables these tricks
                      style={{ display: "block" }}
                    >
                      Please Provide Password with min length of 8 and
                      <br />1 number , upper,lowercase, special char
                    </div>
                  </Fade>
                </Grid>
              </Grid>
              <Button
                type="submit"
                size="large"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
                style={{ borderRadius: 15 }}
              >
                Sign Up
              </Button>

              {showCard.show === true && (
                <div class="card text-white bg-success mb-3">
                  <div class="card-body">
                    {/* <h5 class="card-title"></h5> */}
                    <p class="card-text">{showCard.message}</p>
                  </div>
                </div>
              )}
              {/* <LinearProgress />  */}
              <Grid container justifyContent="flex-end">
                <Grid item>
                  <RouterLink to={"/signIn"}>
                    <Link variant="body2">
                      Already have an account? Sign In
                    </Link>
                  </RouterLink>
                </Grid>
              </Grid>
            </Box>
          </Box>
        </Container>
      </ThemeProvider>
    </>
  );
}
