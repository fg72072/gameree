import * as React from "react";
import ApiLink from "./ApiLink.js";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import { useDispatch } from "react-redux";
import ReCAPTCHA from "react-google-recaptcha";

import { navigate } from "@reach/router";

// import {
//   GoogleReCaptchaProvider,
//   GoogleReCaptcha,
// } from "react-google-recaptcha-v3";

import Fade from "react-reveal/Fade";

import Link from "@mui/material/Link";
import { Link as RouterLink } from "@reach/router";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import CircularProgress from "@mui/material/CircularProgress";
import { useEffect, useState } from "react";

import IconButton from "@mui/material/IconButton";
import OutlinedInput from "@mui/material/OutlinedInput";
import InputLabel from "@mui/material/InputLabel";
import InputAdornment from "@mui/material/InputAdornment";
import FormControl from "@mui/material/FormControl";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import Modal from "react-modal";
import Header from "../menu/header.js";
import { LoginUser } from "../../store/reducers/UserActions.js";
// import NewHeader from "../components/styledComponents/NewHeader.js";
// import CustomCarousel from "../components/custom/carousel.js";

// import { motion } from "framer-motion";

// const customStyles = {
//   content: {
//     top: "50%",
//     left: "50%",
//     right: "auto",
//     bottom: "auto",
//     marginRight: "-50%",
//     transform: "translate(-50%, -50%)",
//   },
// };

const theme = createTheme();
Modal.setAppElement("#root");

export default function SignIn() {
  const dispatch = useDispatch();
  const [data, setData] = useState({
    email: "",
    password: "",
  });
  const [captcha, setCaptha] = useState();
  const handleVerify = (value) => {
    setCaptha(value);
  };
  const [emailError, setEmailError] = useState(false);
  const [passError, setPassError] = useState(false);
  const [message, setMessage] = useState({});

  const [showSpinner, setShowSpinner] = useState(false);

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

    if (values.password.trim().length < 8) {
      setMessage({
        passwordMessage: "Enter  Password",
      });
      setCard({ show: true, message: "Please Enter Password" });

      // setIsOpen(true);
      setShowSpinner(false);
      return;
    }
    const body = {
      email: data.get("email").trim(),
      password: values.password,
    };

    await fetch(`${ApiLink}/login`, {
      method: "POST", // or 'PUT'
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.success === true) {
          dispatch(LoginUser(body.email, values.password));
          setTimeout(() => {
            navigate(`/landmap`);
          }, 3000);
        }
        setMessage(data.message);
        setCard({ show: true, message: data.message });

        // setIsOpen(true);
        // setShowSpinner(false);

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

  const [showCard, setCard] = useState({ show: false, message: "" });

  useEffect(() => {
    var email = data.email;
    var reg = /.+@.+\..+/;
    let matches = email.match(reg);

    if (matches == null) {
      setEmailError(true);
    } else {
      if (data.email.length < 10 && matches.length === 0) {
        setEmailError(true);
      } else {
        setEmailError(false);
      }
    }

    var password = data.password;
    // var reg = /^(?=.*\d)(?=.*[A-Z])(?=.*[a-z])(?=.*[^\w\d\s:])([^\s]){8,16}$/;
    // matches = password.match(reg);
    // console.log(matches);
    if (password == null) {
      setPassError(true);
    } else {
      if (data.password.length < 8) {
        setPassError(true);
      } else {
        setPassError(false);
      }
    }
  }, [data]);

  const [values, setValues] = React.useState({
    amount: "",
    password: "",
    weight: "",
    weightRange: "",
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
                      Please Enter Password
                      <br />
                    </div>
                  </Fade>
                </Grid>
              </Grid>
              <div className="text-center">
                <Grid item xs={12}>
                  <ReCAPTCHA
                    sitekey={`6LfdRLQgAAAAAOyw9BBnSsQ0qofcp4QkMpG9jalf`}
                    onChange={handleVerify}
                  />
                </Grid>
              </div>

              {captcha == null ? (
                <Button
                  type="submit"
                  size="large"
                  fullWidth
                  variant="contained"
                  sx={{ mt: 3, mb: 2 }}
                  style={{ borderRadius: 15 }}
                  disabled
                >
                  Login
                </Button>
              ) : (
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
              )}
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
                  <RouterLink to={"/signUp"}>
                    <Link variant="body2">Don't have an account? Sign Up</Link>
                  </RouterLink>
                </Grid>{" "}
              </Grid>

              <Grid container justifyContent="flex-end">
                <Grid item>
                  <RouterLink to={"/forgotPassword"}>
                    <Link variant="body2">Fotgot Password</Link>
                  </RouterLink>
                </Grid>{" "}
              </Grid>

              <Grid container justifyContent="flex-end">
                <Grid item>
                  <RouterLink to={"/resetLink"}>
                    <Link variant="body2">Reset Link</Link>
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
