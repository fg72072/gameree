import * as React from "react";
import ApiLink from "../ApiLink";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import { useDispatch } from "react-redux";
import ReCAPTCHA from "react-google-recaptcha";
import axios from "axios";
import Shake from "react-reveal/Shake";

import { navigate } from "@reach/router";

import GoogleLogin from "react-google-login";
import GoogleButton from "react-google-button";

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
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";

import IconButton from "@mui/material/IconButton";
import OutlinedInput from "@mui/material/OutlinedInput";
import InputLabel from "@mui/material/InputLabel";
import InputAdornment from "@mui/material/InputAdornment";
import FormControl from "@mui/material/FormControl";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import Modal from "react-modal";
import { motion } from "framer-motion";
import NewHeader from "../../components/styledComponents/NewHeader.js";
import Header from "../../menu/header.js";
import { LoginUser } from "../../../store/reducers/UserActions.js";
import CustomCarousel from "../../components/custom/carousel.js";
import GoogleClientId from "../../../GoogleClientId";

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

export default function SignIn() {
  const dispatch = useDispatch();

  const [data, setData] = useState({
    email: "",
    password: "",
  });
  const [captcha, setCaptha] = useState();
  const [values, setValues] = React.useState({
    amount: "",
    password: "",
    weight: "",
    weightRange: "",
    showPassword: false,
  });
  // const [showWarning, setWarning] = useState({ show: false, message: "" });

  const [emailError, setEmailError] = useState(false);
  const [passError, setPassError] = useState(false);
  const [message, setMessage] = useState({});

  const [showSpinner, setShowSpinner] = useState(false);
  const [showCard, setCard] = useState({ show: false, message: "", type: "" });

  const [rememberMe, setRememberMe] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  useEffect(() => {
    if (localStorage.checkbox && localStorage.email !== "") {
      setRememberMe(true);
      setEmailError(false);
      setData({ ...values, email: localStorage.email });
      setPassError(false);
      setData({ ...values, password: localStorage.password });
    }
  }, []);

  const handleVerify = (value) => {
    setCaptha(value);
  };

  const responseGoogleSuccess = async (response) => {
    setShowSpinner(true);
    try {
      const result = await axios({
        method: "POST",
        url: `${ApiLink}/googlelogin`,
        data: { idToken: response.tokenId },
      })
        .then((response) => {
          if (response.data.success === true) {
            dispatch(
              LoginUser(
                response.data.user.email,
                response.data.user.resetPasswordToken
              )
            );
            // setShowSpinner(false);

            setTimeout(() => {
              navigate(`/landmap`);
            }, 3000);
          }
          setMessage(response.data.message);
          setCard({
            show: true,
            message: response.data.message,
            type: "success",
          });

          // setIsOpen(true);
          // setShowSpinner(false);
        })
        .catch((error) => {
          var errMessage = "Google Authentication is faild.";
          if (error.response.status == 401) {
            errMessage = error.response.error;
          }
          setCard({ show: true, message: errMessage, type: "danger" });

          setShowSpinner(false);
          setMessage({ ...message, ServerMessage: errMessage });
          console.error("Error:", error);
        });
    } catch (error) {
      console.log(error);
    }
  };

  const responseGoogleError = (response) => {
    setShowSpinner(false);
    setCard({ show: true, message: "Sign In Failed", type: "danger" });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setCard({ show: true, message: "Sign In in progress", type: "info" });

    setShowSpinner(true);

    const data = new FormData(event.currentTarget);

    if (data.get("email").trim().length === 0) {
      setMessage({
        passwordMessage: "Enter Email",
      });
      // setIsOpen(true);
      setCard({ show: true, message: "Please Enter Email", type: "warning" });

      setShowSpinner(false);
      return;
    }

    if (values.password.trim().length < 8) {
      setMessage({
        passwordMessage: "Enter  Password",
      });
      setCard({
        show: true,
        message: "Please Enter Password",
        type: "warning",
      });

      // setIsOpen(true);
      setShowSpinner(false);
      return;
    }

    const body = {
      email: data.get("email").trim(),
      password: values.password,
    };

    if (rememberMe && body.email !== "") {
      localStorage.email = body.email;
      localStorage.password = body.password;
      localStorage.checkbox = rememberMe;
    }

    const result = await axios({
      method: "POST",
      url: `${ApiLink}/login`,
      data: body,
    })
      .then((response) => {
        if (response.data.success === true) {
          dispatch(LoginUser(body.email, values.password));
          setTimeout(() => {
            navigate(`/landmap`);
          }, 3000);

          setMessage(response.data.message);
          setCard({
            show: true,
            message: response.data.message,
            type: "success",
          });
        } else {
          setMessage(data.errMessage);
          setCard({
            show: true,
            message: response.data.errMessage,
            type: "danger",
          });
        }

        // setIsOpen(true);
        setShowSpinner(false);
      })
      .catch((error) => {
        console.log("error", error);
        //let errMessage = "Internal Server Request.";
        setCard({
          show: true,
          message: error.response.data.message,
          type: "danger",
        });
        setShowSpinner(false);
        // setCard({show: true , message: .message} )
        setMessage({ ...message, ServerMessage: error.response.data.message });
      });
  };

  const handleChangePassword = (prop) => (event) => {
    var password = event.target.value;
    setValues({ ...values, [prop]: event.target.value });
    if (password === null) {
      setPassError(true);
    } else {
      if (password.length < 8) {
        setPassError(true);
      } else {
        setPassError(false);
        setData({ ...data, password: event.target.value });
      }
    }
  };

  const handleChangeEmail = (prop) => (event) => {
    var email = event.target.value;
    var reg = /.+\@.+\..+/;
    let Emailmatches = email.match(reg);

    if (Emailmatches === null) {
      setEmailError(true);
    } else {
      if (email.length < 10 && Emailmatches.length === 0) {
        setEmailError(true);
      } else {
        setEmailError(false);
        setValues({ ...values, [prop]: event.target.value });
      }
    }
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

  const handleRememberMe = (event) => {
    setRememberMe(event.target.checked);
  };

  return (
    <>
      <Header />
      {/* <NewHeader /> */}

      <ThemeProvider theme={theme}>
        <Container component="main" maxWidth="xs">
          <CssBaseline />

          <Box
            sx={{
              marginTop: 10,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              boxShadow: 3,
              padding: 2,
            }}
          >
            <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
              {/* <LockOutlinedIcon /> */}
            </Avatar>
            <Typography component="h1" variant="h5">
              {showSpinner == true ? (
                <CircularProgress color="secondary" />
              ) : (
                <> </>
              )}
            </Typography>

            <Box
              component="form"
              noValidate
              onSubmit={handleSubmit}
              sx={{ mt: 3 }}
            >
              <Grid container spacing={1}>
                <Grid item xs={12}>
                  <TextField
                    required
                    fullWidth
                    id="email"
                    label="Email Address"
                    name="email"
                    autoComplete="email"
                    onChange={handleChangeEmail("email")}
                  />
                  <Fade bottom when={emailError}>
                    <div
                      className="invalid-feedback"
                      style={{ display: "block", fontSize: "10px" }}
                    >
                      Please provide valid email
                    </div>
                  </Fade>
                </Grid>

                <Grid item xs={12}>
                  <FormControl xs={12} variant="outlined" required fullWidth>
                    <InputLabel htmlFor="outlined-adornment-password">
                      Password
                    </InputLabel>
                    <OutlinedInput
                      id="outlined-adornment-password"
                      type={values.showPassword ? "text" : "password"}
                      value={values.password}
                      onChange={handleChangePassword("password")}
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
                      style={{ display: "block", fontSize: "10px" }}
                    >
                      Please enter password
                    </div>
                  </Fade>
                </Grid>
              </Grid>
              <FormControlLabel
                control={
                  <Checkbox
                    checked={rememberMe}
                    name="rememberMe"
                    onChange={handleRememberMe}
                  />
                }
                label="Remember me"
                sx={{ mb: 1 }}
              />
              <div className="text-center">
                <Grid item xs={12}>
                  <ReCAPTCHA
                    sitekey={`6LfdRLQgAAAAAOyw9BBnSsQ0qofcp4QkMpG9jalf`}
                    onChange={handleVerify}
                  />
                </Grid>
              </div>
              {captcha == null ? (
                <>
                  <Button
                    type="submit"
                    size="large"
                    fullWidth
                    variant="contained"
                    sx={{ mt: 3, mb: 2, height: "50px" }}
                    disabled
                  >
                    Login
                  </Button>
                  <Grid container sx={{ mb: 1 }}>
                    <Grid item xs={12}>
                      <GoogleLogin
                        // use your client id here
                        clientId={GoogleClientId}
                        buttonText="Login with google"
                        render={(renderProps) => (
                          <GoogleButton
                            onClick={renderProps.onClick}
                            style={{ width: "100%" }}
                            disabled
                          >
                            Sign in with Google
                          </GoogleButton>
                        )}
                        onSuccess={responseGoogleSuccess}
                        onFailure={responseGoogleError}
                        cookiePolicy={"single_host_origin"}
                        style={{ width: "50px" }}
                      />
                    </Grid>
                  </Grid>
                </>
              ) : (
                <>
                  <Button
                    type="submit"
                    size="large"
                    fullWidth
                    variant="contained"
                    sx={{ mt: 3, mb: 2, height: "50px", background: "#4285f4" }}
                  >
                    Login
                  </Button>
                  <Grid container sx={{ mb: 1 }}>
                    <Grid item xs={12}>
                      <GoogleLogin
                        // use your client id here
                        clientId={GoogleClientId}
                        buttonText="Login with google"
                        render={(renderProps) => (
                          <GoogleButton
                            onClick={() => {
                              setCard({
                                show: true,
                                message: "Google Login in progress",
                                type: "info",
                              });

                              renderProps.onClick();
                              // alert("alert");

                              setShowSpinner(true);
                            }}
                            onMouseUp={() => {
                              // alert("check");

                              showSpinner(true);
                            }}
                            style={{ width: "100%" }}
                          >
                            Sign in with Google
                          </GoogleButton>
                        )}
                        onSuccess={responseGoogleSuccess}
                        onFailure={responseGoogleError}
                        cookiePolicy={"single_host_origin"}
                        style={{ width: "50px" }}
                      />
                    </Grid>
                  </Grid>
                </>
              )}

              <Grid container justifyContent="flex-end">
                <Grid item>
                  <RouterLink to={"/signUp"}>
                    <Link variant="body2">Not signed up</Link>
                  </RouterLink>
                </Grid>{" "}
              </Grid>
              <Grid container justifyContent="flex-end" sx={{ mb: 2 }}>
                <Grid item>
                  <RouterLink to={"/forgotPassword"}>
                    <Link variant="body2">Fotgot password</Link>
                  </RouterLink>
                </Grid>{" "}
              </Grid>
              {showCard.show === true && (
                <Shake>
                  <div
                    className={`alert alert-${showCard.type}`}
                    style={{ fontSize: "18px" }}
                  >
                    {showCard.message}
                  </div>
                </Shake>
              )}
            </Box>
          </Box>
        </Container>
      </ThemeProvider>
    </>
  );
}
