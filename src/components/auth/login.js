import React from "react";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import loginStyles from "./login-styles";
import { useFormik } from "formik";
import { connect } from "react-redux";
import * as authActions from "../../store/auth/actions";
import {
  CircularProgress,
  Dialog,
  DialogContent,
  Snackbar,
  IconButton,
  Typography,
  Container,
  CssBaseline,
  TextField,
  Avatar,
  Button,
  InputAdornment,
} from "@material-ui/core";
import { useState } from "react";
import { useEffect } from "react";
import { Redirect } from "react-router-dom";
import Alert from "@material-ui/lab/Alert";
import VisibilityIcon from "@material-ui/icons/Visibility";
import VisibilityOffIcon from "@material-ui/icons/VisibilityOff";

const SignIn = (props) => {
  const classes = loginStyles();
  const [loading, setLoading] = useState(false);
  const [signedIn, setSignedIn] = useState(false);
  const [visibility, setVisibility] = useState(false);
  const formik = useFormik({
    initialValues: {
      password: "",
      username: "",
    },
    validate: (values) => {
      const errors = {};
      if (values.password.length < 8) {
        errors.password = "password is too short";
      }
      if (values.username.length <= 4) {
        errors.username = "username too short";
      }
      return errors;
    },
    onSubmit: (values) => {
      props.attemptLogin(values);
    },
  });


  useEffect(() => {
    props.resetLogin();
  }, []);

  if (props.login.data) {
    console.log('here')
    return <Redirect to="/dashboard" />;
  }
  return (
    <Container maxWidth="xs">
      <Dialog open={props.login.isLoading}>
        <DialogContent>
          <CircularProgress disableShrink />
        </DialogContent>
      </Dialog>
      <Snackbar
        autoHideDuration={1000}
        anchorOrigin={{ vertical: "top", horizontal: "right" }}
        open={props.login.error}
      >
        <Alert severity="error">{props.login.error}</Alert>
      </Snackbar>
      <CssBaseline />
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Sign in
        </Typography>
        <form className={classes.form} onSubmit={formik.handleSubmit}>
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            label="Username"
            name="username"
            value={formik.values.username}
            onChange={formik.handleChange}
            error={formik.touched.username && formik.errors.username}
            autoFocus
          />
          {formik.touched.username && formik.errors.username && (
            <Typography color="error">{formik.errors.username}</Typography>
          )}
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            label="Password"
            type={visibility ? "text" : "password"}
            name="password"
            InputProps={{
              endAdornment: (
                <InputAdornment>
                  {!visibility ? (
                    <IconButton onClick={() => setVisibility(true)}>
                      <VisibilityIcon color="primary" />
                    </IconButton>
                  ) : (
                    <IconButton onClick={() => setVisibility(false)}>
                      <VisibilityOffIcon color="primary" />
                    </IconButton>
                  )}
                </InputAdornment>
              ),
            }}
            value={formik.values.password}
            onChange={formik.handleChange}
            error={formik.touched.password && formik.errors.password}
          />
          {formik.touched.password && formik.errors.password && (
            <Typography color="error">{formik.errors.password}</Typography>
          )}

          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
            disabled={!(formik.dirty && formik.isValid)}
          >
            Sign In
          </Button>
        </form>
      </div>
    </Container>
  );
};
const mapStateToProps = (state) => {
  return {
    login: state.auth.login,
  };
};
const mapDispatchToProps = (dispatch) => {
  return {
    attemptLogin: (user) => dispatch(authActions.login(user)),
    resetLogin: () => dispatch(authActions.resetLogin()),
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(SignIn);
