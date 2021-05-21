import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { Link, useHistory, useLocation } from "react-router-dom";
import { AppBar, Avatar, Button, Toolbar, Typography } from "@material-ui/core";
import UseStyle from "./NavbarStyles";
import decode from "jwt-decode";

import memories from "../../images/memories-Text.png";
import logo from "../../images/memories-Logo.png";
const NavBar = () => {
  const classes = UseStyle();
  const dispatch = useDispatch();
  const history = useHistory();
  const location = useLocation();
  const [token, setToken] = useState(null);
  const [user, setUser] = useState(JSON.parse(localStorage.getItem("profile")));
  const logout = () => {
    dispatch({ type: "LOGOUT" });
    history.push("/");
    setUser(null);
  };
  useEffect(() => {
    setToken(user?.token);
    //JWT ...

    if (token) {
      const decodedtoken = decode(token);

      if (decodedtoken * 1000 < new Date().getTime()) logout();
    }
    setUser(JSON.parse(localStorage.getItem("profile")));
  }, [location]);

  return (
    <AppBar className={classes.appBar} position="static" color="inherit">
      <Link to="/" className={classes.brandContainer}>
        <img src={memories} alt="icon" height="45" />
        <img className={classes.image} src={logo} alt="icon" height="40" />
      </Link>
      <Toolbar className={classes.toolBar}>
        {user ? (
          <div className={classes.profile}>
            <Avatar className={classes.avatar} alt={user.result?.name} src={user.result?.imageUrl}>
              {user.result?.name.charAt(0)}
            </Avatar>
            <Typography className={classes.userName} variant="h6">
              {user.result?.name}
            </Typography>
            <Button className={classes.logout} variant="contained" color="secondary" onClick={logout}>
              Logout
            </Button>
          </div>
        ) : (
          <Button component={Link} to="/auth" variant="contained" color="primary">
            Sign In
          </Button>
        )}
      </Toolbar>
    </AppBar>
  );
};

export default NavBar;
