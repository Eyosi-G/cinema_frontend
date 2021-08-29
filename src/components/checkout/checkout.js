import {
  Box,
  Grid,
  makeStyles,
  TextField,
  Typography,
  Card,
  Button,
  FormControl,
  Checkbox,
  FormControlLabel,
  Dialog,
  DialogContent,
  CircularProgress,
  Snackbar,
  DialogTitle,
  FormHelperText,
} from "@material-ui/core";
import React, { useEffect, useState } from "react";
import yenepay from "../../assets/images/yenepay_logo.png";
import hellocash from "../../assets/images/hellocash.png";
import { connect } from "react-redux";
import * as scheduleActions from "../../store/schedule/actions";
import config from "../../config";
import { useHistory } from "react-router";
import { useFormik } from "formik";
import { Alert } from "@material-ui/lab";

const useStyle = makeStyles((theme) => ({
  title: {
    fontWeight: "bold",
  },
  content: {
    color: "#616161",
    fontSize: "12px",
  },
  card: {
    padding: theme.spacing(2),
  },
}));
const Checkout = (props) => {
  const classes = useStyle();
  const [time, setTime] = useState("");
  const history = useHistory();

  useEffect(() => {
    const data = localStorage.getItem(config.storage);
    if (!data) history.goBack();
    props.fetchCheckout();
    return () => {
      props.resetSubmitPaymentInfo();
    };
  }, []);

  useEffect(() => {
    const timer = setInterval(() => {
      if (props.checkout.data.checkout.start_date) {
        let interval =
          config.min -
          Math.abs(
            (new Date() - new Date(props.checkout.data.checkout.start_date)) /
              60000
          );
        if (interval < 0) {
          localStorage.clear();
          history.goBack();
        }
        setTime(interval.toLocaleString("en-us"));
      }
    }, 1000);

    return () => {
      clearInterval(timer);
    };
  }, [props.checkout.data.checkout.start_date]);

  useEffect(() => {
    if (props.canceledReservation.success) {
      history.goBack();
    }
    return () => {
      props.resetCancelReservation();
    };
  }, [props.canceledReservation.success]);
  const adjustPhoneNumber = (phonenumber) => {
    //0911139074
    //+2510911139074
    //911139074
    let adjusted = "";
    if (phonenumber.length === 10 && phonenumber[0] == "0") {
      adjusted = "+251" + phonenumber.slice(1);
    }
    if (phonenumber.length === 14 && phonenumber.slice(0, 5) == "+2510") {
      adjusted = "+251" + phonenumber.slice(5);
    }
    if (phonenumber.length === 9 && phonenumber[0] == "9") {
      adjusted = "+251" + phonenumber;
    }
    if (phonenumber.length === 13 && phonenumber.slice(0, 5) == "+2519") {
      adjusted = phonenumber;
    }
    return adjusted;
  };
  const formik = useFormik({
    initialValues: {
      email: "",
      phonenumber: "",
      agreed: false,
    },
    onSubmit: (values) => {
      const adjustedPhonenumber = adjustPhoneNumber(values.phonenumber);
      props.submitPaymentInfo(adjustedPhonenumber, values.email);
    },
    validate: (values) => {
      const error = {};
      if (values.email.length <= 0) {
        error.email = "email can't be empty";
      }
      if (
        values.phonenumber.length < 9 ||
        !new RegExp("^[0-9+]+$").test(values.phonenumber)
      ) {
        error.phonenumber = "phonenumber is wrong format";
      }
      if (!values.agreed) {
        error.agreed = "please agree to term and condition";
      }
      return error;
    },
  });
  return (
    <div>
      <Dialog open={props.paymentInfo.data}>
        <DialogTitle>Invoice is created successfully !</DialogTitle>
        <DialogContent>
          Invoice has been sent to your HelloCash account with code &nbsp;
          {props.paymentInfo.data}. Please, confirm to finish purchase!
        </DialogContent>
      </Dialog>
      <Dialog open={props.paymentInfo.loading}>
        <DialogContent>
          <CircularProgress disableShrink />
        </DialogContent>
      </Dialog>
      <Snackbar
        autoHideDuration={2000}
        anchorOrigin={{ vertical: "top", horizontal: "right" }}
        open={props.paymentInfo.error}
      >
        <Alert severity="error">{props.paymentInfo.error}</Alert>
      </Snackbar>

      <Card elevation="0" className={classes.card}>
        <Typography align="right"> {time} min</Typography>
        <Grid container spacing={4}>
          <Grid item xs={12} md={6}>
            <Typography className={classes.title}>
              {props.checkout.data.movie.title}
            </Typography>
            <Box mt={1} />
            <Typography className={classes.title}>
              {props.checkout.data.movie.language} &nbsp;|&nbsp;
              {props.checkout.data.screen}
            </Typography>
            <Box mt={2} />
            <Typography className={classes.title}>Schedule Date</Typography>
            <Typography className={classes.content}>
              {new Date(props.checkout.data.scheduleDate).toLocaleString(
                "en-us"
              )}
            </Typography>
            <Box mt={2} />
            <Typography className={classes.title}>Synopsis</Typography>
            <Typography
              className={classes.content}
              style={{ textAlign: "justify" }}
            >
              {props.checkout.data.movie.summary}
            </Typography>
          </Grid>
          <Grid item xs={12} md={6}>
            <Box display="flex" justifyContent="space-between">
              <Typography className={classes.title}>
                Ticket {props.checkout.data.checkout.seats.length}x
              </Typography>
              <Typography className={classes.title}>
                {props.checkout.data.totalPrice} ETB
              </Typography>
            </Box>
            <form onSubmit={formik.handleSubmit}>
              <Box mt={3} />
              <Typography className={classes.content}>
                *Please, provide ticketing email
              </Typography>
              <TextField
                variant="outlined"
                label="Email"
                fullWidth
                margin="dense"
                type="email"
                name="email"
                value={formik.values.email}
                onChange={formik.handleChange}
                error={formik.touched.email && formik.errors.email}
              />

              <Box mt={2} />
              <Typography className={classes.content}>
                *Please, provide phonenumber
              </Typography>
              <TextField
                variant="outlined"
                label="Phone Number"
                type="text"
                fullWidth
                margin="dense"
                name="phonenumber"
                value={formik.values.phonenumber}
                onChange={formik.handleChange}
                error={formik.touched.phonenumber && formik.errors.phonenumber}
              />

              <Box mt={2} />
              <Box mt={2} />
              <div>
                <img src={hellocash} width="140px" height="40px" />
              </div>
              <Box mt={2}>
                <FormControl
                  required
                  error={formik.touched.agreed && formik.errors.agreed}
                >
                  <FormControlLabel
                    control={
                      <Checkbox
                        name="agreed"
                        checked={formik.values.agreed}
                        onChange={formik.handleChange}
                      />
                    }
                    label={
                      <Typography
                        color={
                          formik.touched.agreed &&
                          formik.errors.agreed &&
                          "error"
                        }
                      >
                        I have read and agree to the website terms and
                        conditions *
                      </Typography>
                    }
                  />
                </FormControl>
              </Box>
              <Box mt={1} />
              <Box display="flex" justifyContent="flex-end">
                {localStorage.getItem(config.storage) && (
                  <Button
                    color="primary"
                    variant="outlined"
                    onClick={props.cancelReservation}
                  >
                    cancel
                  </Button>
                )}
                <Box mr={4} />
                <Button
                  color="primary"
                  variant="contained"
                  type="submit"
                  disabled={!(formik.dirty && formik.isValid)}
                >
                  Continue
                </Button>
              </Box>
            </form>
          </Grid>
        </Grid>
      </Card>
    </div>
  );
};
const mapStateToProps = (state) => {
  return {
    checkout: state.schedule.checkout,
    paymentInfo: state.schedule.paymentInfo,
    canceledReservation: state.schedule.canceledReservation,
  };
};
const mapDispatchToProps = (dispatch) => {
  return {
    fetchCheckout: () => dispatch(scheduleActions.fetchCheckout()),
    submitPaymentInfo: (phonenumber, email) =>
      dispatch(scheduleActions.submitPaymentInfo(phonenumber, email)),
    resetSubmitPaymentInfo: () =>
      dispatch(scheduleActions.resetSubmitPaymentInfo()),
    cancelReservation: () => dispatch(scheduleActions.cancelReservation()),
    resetCancelReservation: () =>
      dispatch(scheduleActions.resetCancelReservation()),
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(Checkout);
