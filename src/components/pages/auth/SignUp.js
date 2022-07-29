import * as React from "react";
import ApiLink from "../ApiLink";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import Link from "@mui/material/Link";
import { Link as RouterLink, navigate } from "@reach/router";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import CircularProgress from "@mui/material/CircularProgress";
import { useEffect, useState } from "react";
import Fade from "react-reveal/Fade";
import ReCAPTCHA from "react-google-recaptcha";
import Checkbox from "@mui/material/Checkbox";
import FormControlLabel from "@mui/material/FormControlLabel";
import Shake from "react-reveal/Shake";

import IconButton from "@mui/material/IconButton";
import OutlinedInput from "@mui/material/OutlinedInput";
import InputLabel from "@mui/material/InputLabel";
import InputAdornment from "@mui/material/InputAdornment";
import FormControl from "@mui/material/FormControl";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import Modal from "react-modal";
import Header from "../../menu/header.js";
import axios from "axios";
import { useDispatch } from "react-redux";
import { LoginUser } from "../../../store/reducers/UserActions";
import GoogleClientId from "../../../GoogleClientId";

import GoogleLogin from "react-google-login";
import GoogleButton from "react-google-button";

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
  const dispatch = useDispatch();

  const [showCard, setCard] = useState({ show: false, message: "", type: "" });

  const [message, setMessage] = useState({});
  const [showSpinner, setShowSpinner] = useState(false);
  const [data, setData] = useState({
    username: "",
    email: "",
    password: "",
  });

  const [emailError, setEmailError] = useState(false);
  const [passError, setPassError] = useState(false);

  const [userNameError, setUserNameError] = useState(false);
  const [values, setValues] = React.useState({
    password: "",
    confirmPassword: "",
    showPassword: false,
    showConfirmPassword: false,
  });

  const [isSuccess, setIsSuccess] = useState(false);

  const [captcha, setCaptha] = useState();
  const [termCondition, setTermCondition] = useState(false);

  useEffect(() => {}, []);

  const handleVerify = (value) => {
    setCaptha(value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setCard({
      show: true,
      message: "Registration in Progress",
      type: "info",
    });

    setShowSpinner(true);
    const data = new FormData(event.currentTarget);

    if (data.get("userName").trim().length === 0) {
      setMessage({
        passwordMessage: "Enter User Name ",
      });

      setCard({
        show: true,
        message: "Please Enter User Name",
        type: "warning",
      });
      setShowSpinner(false);
      return;
    }
    if (data.get("email").trim().length === 0) {
      setMessage({
        passwordMessage: "Enter Email",
      });
      setCard({ show: true, message: "Please Enter Email", type: "warning" });
      setShowSpinner(false);
      return;
    }

    if (values.password.trim().length < 8) {
      setMessage({
        passwordMessage: "Enter Strong Password",
      });
      setCard({
        show: true,
        message: "Please Enter Strong Password",
        type: "warning",
      });

      // setIsOpen(true);
      setShowSpinner(false);
      return;
    }
    const body = {
      userName: data.get("userName").trim(),
      email: data.get("email").trim(),
      password: values.password,
    };

    const result = await axios({
      method: "POST",
      url: `${ApiLink}/register`,
      data: body,
    })
      .then((response) => {
        if (response.data.success == true) {
          setIsSuccess(true);
          setMessage(response.data.message);
        }

        setCard({
          show: true,
          message: response.data.message,
          type: "success",
        });
        // setShowSpinner(false);
      })
      .catch((error) => {
        console.error("Error:", error);
        setShowSpinner(false);
        let errMessage = "Internal Server Request.";
        if (error.response.status == 500) {
          errMessage = error.response.data.errMessage;
        } else if (error.response.status == 400) {
          errMessage = error.response.data.message;
        }
        setCard({ show: true, message: errMessage, type: "danger" });
        setMessage({ ServerMessage: error.response.data.message });
      });
  };
  /**
   *  For Google Auth
   * */
  const responseGoogleSuccess = async (response) => {
    setShowSpinner(true);

    try {
      const result = await axios({
        method: "POST",
        url: `${ApiLink}/googlelogin`,
        data: { idToken: response.tokenId },
      })
        .then((response) => {
          // setShowSpinner(false);

          if (response.data.success === true) {
            // setShowSpinner(false);

            dispatch(
              LoginUser(
                response.data.user.email,
                response.data.user.resetPasswordToken
              )
            );
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
      setCard({ show: true, message: "Sign In Failed", type: "danger" });

      setShowSpinner(false);

      console.log(error);
    }
  };

  const handleChangeUsername = (prop) => (event) => {
    let value = event.target.value;
    if (value.length < 5) {
      setUserNameError(true);
    } else {
      setUserNameError(false);
      setValues({ ...values, [prop]: value });
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

  const handleChangePassword = (prop) => (event) => {
    setValues({ ...values, [prop]: event.target.value });
    var password = event.target.value;
    var reg = /^(?=.*\d)(?=.*[A-Z])(?=.*[a-z])(?=.*[^\w\d\s:])([^\s]){8,16}$/;
    let matches = password.match(reg);
    if (matches === null) {
      setPassError(true);
    } else {
      if (password.length < 8 && matches.length === 0) {
        setPassError(true);
      } else {
        setPassError(false);
        setData({ ...data, password: event.target.value });
      }
    }
  };

  const responseGoogleError = (response) => {
    setCard({ show: true, message: "Sign In Failed", type: "danger" });
    showSpinner(false);
  };

  const handleTermCondition = (event) => {
    setTermCondition(event.target.checked);
  };
  const handleClickShowPassword = () => {
    setValues({
      ...values,
      showPassword: !values.showPassword,
    });
  };

  const handleClickShowConfirmPassword = () => {
    setValues({
      ...values,
      showConfirmPassword: !values.showConfirmPassword,
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
              marginTop: 10,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              boxShadow: 3,
              padding: 2,
            }}
          >
            <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}></Avatar>
            <Typography component="h1" variant="h5">
              {showSpinner && <CircularProgress color="secondary" />}
            </Typography>

            <Box
              component="form"
              noValidate
              onSubmit={handleSubmit}
              sx={{ mt: 3 }}
            >
              <Grid container spacing={1} sx={{ mb: 1 }}>
                <Grid item xs={12}>
                  <TextField
                    required
                    fullWidth
                    id="userName"
                    label="User Name"
                    name="userName"
                    autoComplete="userName"
                    onChange={handleChangeUsername("username")}
                  />
                  <Fade bottom when={userNameError}>
                    <div
                      className="invalid-feedback"
                      style={{ display: "block", fontSize: "10px" }}
                    >
                      Please provide valid username
                    </div>
                  </Fade>
                </Grid>

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
                      Please provide password with min length of 8 and 1 number
                      , upper,lowercase, special char
                    </div>
                  </Fade>
                </Grid>
              </Grid>

              <Grid container spacing={1}>
                <Grid item xs={1}>
                  <FormControlLabel
                    control={
                      <Checkbox
                        checked={termCondition}
                        name="rememberMe"
                        onChange={handleTermCondition}
                      />
                    }
                    sx={{ mb: 1, marginTop: "-10px" }}
                  />
                </Grid>
                <Grid item xs={11}>
                  <label htmlFor="agree">
                    {"  "}I agree to{" "}
                    <RouterLink to={"/terms"}>
                      <Link variant="body2">
                        <b>Terms of use </b>
                      </Link>
                    </RouterLink>
                    and{" "}
                    <RouterLink to={"/policy"}>
                      <Link variant="body2">
                        <b>Privacy policy</b>
                      </Link>
                    </RouterLink>
                  </label>
                </Grid>
              </Grid>
              <Grid item xs={12}>
                <ReCAPTCHA
                  sitekey={`6LfdRLQgAAAAAOyw9BBnSsQ0qofcp4QkMpG9jalf`}
                  onChange={handleVerify}
                />
              </Grid>

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
                    Sign Up
                  </Button>
                  <Grid container sx={{ mb: 1 }}>
                    <Grid item xs={12}>
                      <GoogleLogin
                        disabled
                        // use your client id here
                        clientId={GoogleClientId}
                        buttonText="Login with google"
                        render={(renderProps) => (
                          <GoogleButton
                            disabled
                            onClick={renderProps.onClick}
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
              ) : (
                <>
                  <Button
                    type="submit"
                    size="large"
                    fullWidth
                    variant="contained"
                    sx={{ mt: 3, mb: 2, height: "50px", background: "#4285f4" }}
                  >
                    Sign Up
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
                              renderProps.onClick();
                              setShowSpinner(true);
                            }}
                            onMouseUp={() => {
                              setCard({
                                show: true,
                                message: "Google Login in Progress",
                                type: "info",
                              });

                              setShowSpinner(true);
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

              {/* <LinearProgress />  */}
              <Grid container justifyContent="flex-end" sx={{ mb: 2 }}>
                <Grid item>
                  <RouterLink to={"/signIn"}>
                    <Link variant="body2">
                      Already have an account? Sign In
                    </Link>
                  </RouterLink>
                </Grid>
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
