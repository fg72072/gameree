import { useParams } from "@reach/router";
import { useState } from "react";
import Header from "./menu/header";
import ApiLink from "./pages/ApiLink";
import { useNavigate } from "@reach/router";
import { Container } from "@mui/system";
import * as React from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";

import Link from "@mui/material/Link";
import { Link as RouterLink } from "@reach/router";

import Grid from "@mui/material/Grid";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import CircularProgress from "@mui/material/CircularProgress";
import { useEffect } from "react";
import Box from "@mui/material/Box";

import Fade from "react-reveal/Fade";
import IconButton from "@mui/material/IconButton";
import OutlinedInput from "@mui/material/OutlinedInput";
import InputLabel from "@mui/material/InputLabel";
import InputAdornment from "@mui/material/InputAdornment";
import FormControl from "@mui/material/FormControl";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";

const theme = createTheme();
const ChangePassword = () => {
  const handleClickShowPassword = () => {
    setValues({
      ...values,
      showPassword: !values.showPassword,
    });
  };

  const [values, setValues] = useState({
    password: "",
    showPassword: false,
  });

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  const handleChange = (prop) => (event) => {
    setValues({ ...values, [prop]: event.target.value });
  };

  const [passError, setPassError] = useState(false);

  const [showSpinner, setShowSpinner] = useState(false);
  const navigate = useNavigate();
  const [showCard, setCard] = useState({ show: false, message: "" });
  const { id } = useParams();
  const handleSubmit = async (event) => {
    event.preventDefault();
    setShowSpinner(true);
    const data = new FormData(event.currentTarget);
    if (data.get("password").trim().length === 0) {
      // setIsOpen(true);
      setCard({ show: true, message: "Please Enter password" });
      setShowSpinner(false);
      return;
    }
    if (data.get("password2").trim().length === 0) {
      // setIsOpen(true);
      setCard({ show: true, message: "Please Enter password" });
      setShowSpinner(false);
      return;
    }

    var password = data.get("password");
    let reg;
    reg = /^(?=.*\d)(?=.*[A-Z])(?=.*[a-z])(?=.*[^\w\d\s:])([^\s]){8,16}$/;
    let matches = password.match(reg);

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
          setTimeout(() => {
            navigate(`/landmap`);
          }, 3000);
        }
        setCard({ show: true, message: data.message });

        setShowSpinner(false);
      })
      .catch((error) => {
        setCard({ show: true, message: JSON.stringify(data) });

        setShowSpinner(false);
        // setCard({show: true , message: .message} )
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
            <Box
              component="form"
              noValidate
              onSubmit={handleSubmit}
              sx={{ mt: 3 }}
            >
              <Grid container spacing={2}>
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
                Reset Password
              </Button>

              {showCard.show === true && (
                <div class="card text-white bg-success mb-3">
                  <div class="card-body">
                    {/* <h5 class="card-title"></h5> */}
                    <p class="card-text">{showCard.message}</p>
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
export default ChangePassword;
