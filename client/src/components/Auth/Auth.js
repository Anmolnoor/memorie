import React, { useState } from "react";
import { Avatar, Button, Container, Grid, Paper, Typography } from "@material-ui/core";
import { GoogleLogin } from "react-google-login";
import useStyle from "./AuthStyle";
import Input from "./Input";
import LockOutlineIcon from "@material-ui/icons/LockOutlined";
import Icon from "./Icon";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import { signin, signup } from "../../actions/auth";

const initialState = { firstname: "", lastname: "", email: "", password: "", confirmPassword: "" };
const Auth = () => {
  const classes = useStyle();
  const dispatch = useDispatch();
  const history = useHistory();
  const [showPassword, setShowPassword] = useState(false);
  const [isSignup, setIsSignup] = useState(false);
  const [formData, setFormData] = useState(initialState);
  const handleSubmit = (e) => {
    e.preventDefault();
    if (isSignup) {
      dispatch(signup(formData, history));
    } else {
      dispatch(signin(formData, history));
    }
  };
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };
  const switchMode = () => {
    setIsSignup(!isSignup);
    setShowPassword(false);
  };
  const handleShowPassword = () => setShowPassword((prevShowpassword) => !prevShowpassword);

  const googleSuccess = async (res) => {
    const result = res.profileObj;
    const token = res.tokenId;

    try {
      dispatch({ type: "AUTH", data: { result, token } });
      history.push("/");
    } catch (error) {
      console.log(error);
    }
  };
  const googleFailure = (error) => {
    console.log(error);
    console.log("Google Sign In UnSuccessFull");
  };

  return (
    <Container component="main" maxWidth="xs">
      <Paper className={classes.paper} elevation={3}>
        <Avatar className={classes.avatar}>
          <LockOutlineIcon />
        </Avatar>
        <Typography variant="h5">{isSignup ? "Sign Up" : "Sign In"}</Typography>
        <form className={classes.form} onSubmit={handleSubmit}>
          <Grid container spacing={2}>
            {isSignup && (
              <>
                <Input name="firstname" label="First Name" handleChange={handleChange} autoFocus half />
                <Input name="lastname" label="Last Name" handleChange={handleChange} half />
              </>
            )}
            <Input name="email" label="Email Address" handleChange={handleChange} type="email" />
            <Input
              name="password"
              label="Password"
              handleChange={handleChange}
              type={showPassword ? "text" : "password"}
              handleShowPassword={handleShowPassword}
            />
            {isSignup && (
              <Input name="confirmPassword" label="Repeat Password" handleChange={handleChange} type="password" />
            )}
          </Grid>
          <Button variant="contained" type="submit" fullWidth color="primary" className={classes.submit}>
            {isSignup ? "Sign Up" : "Sign in"}
          </Button>
          <GoogleLogin
            clientId="915023247893-eg5hdbfmste3h1b6fjvg07el03229apf.apps.googleusercontent.com"
            render={(renderProps) => (
              <>
                <Button
                  onClick={renderProps.onClick}
                  disabled={renderProps.disabled}
                  startIcon={<Icon />}
                  variant="contained"
                  type="submit"
                  fullWidth
                  color="primary"
                  className={classes.googleButton}
                >
                  Google Sign In
                </Button>
              </>
            )}
            onSuccess={googleSuccess}
            onFailure={googleFailure}
            cookiePolicy="single_host_origin"
          />
          <Grid container justify="flex-end">
            <Button onClick={switchMode}>
              {isSignup ? "Already have account? Sign In" : "Don't have an Account Yet? Sign Up"}
            </Button>
          </Grid>
        </form>
      </Paper>
    </Container>
  );
};

export default Auth;
