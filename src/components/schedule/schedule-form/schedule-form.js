import {
  Box,
  Button,
  Card,
  TextField,
  makeStyles,
  Switch,
  FormControlLabel,
  Grid,
  Breadcrumbs,
  useMediaQuery,
  useTheme,
  Snackbar,
  Dialog,
  DialogContent,
  CircularProgress,
  Link,
} from "@material-ui/core";
import React, { useEffect, useState } from "react";
import { Autocomplete } from "@material-ui/lab";
import { connect } from "react-redux";
import * as moviesActions from "../../../store/movie/actions";
import * as scheduleActions from "../../../store/schedule/actions";
import * as dateFormat from "../../../utils/date-time-format";

import axios from "axios";
import config from "../../../config";
import { useFormik } from "formik";
import { Alert } from "@material-ui/lab";
import { Link as RouterLink, useHistory, useParams } from "react-router-dom";

const useStyle = makeStyles((theme) => ({
  card: {
    padding: theme.spacing(2),
  },
}));

const ScheduleForm = (props) => {
  const theme = useTheme();
  const isSmall = useMediaQuery(theme.breakpoints.down("sm"));
  const classes = useStyle();
  const params = useParams();

  const [hall, setHall] = useState({
    inputValue: "",
    loading: false,
    options: [],
  });
  const [movie, setMovie] = useState({
    inputValue: "",
    loading: false,
    options: [],
  });

  const history = useHistory();

  useEffect(async () => {
    setMovie({ ...movie, loading: true });
    const response = await axios.get(
      `${config.baseURL}/movies?name=${movie.inputValue}&released=true`
    );
    console.log(response.data.movies);
    setMovie({ ...movie, loading: false, options: response.data.movies });
  }, [movie.inputValue]);

  useEffect(async () => {
    setHall({ ...hall, loading: true });
    const response = await axios.get(
      `${config.baseURL}/cinemas?name=${hall.inputValue}`
    );
    setHall({ ...hall, loading: false, options: response.data.cinemas });
  }, [hall.inputValue]);

  const formik = useFormik({
    initialValues: {
      status: false,
      movie: null,
      start_date_time: dateFormat.convertToDateTime(new Date()),
      screen: "",
      hall: null,
      price: {
        vip: "",
        regular: "",
      },
    },
    onSubmit: (values) => {
      const body = { ...values, status: values.status ? "active" : "inactive" };
      if (props.edit) {
        body.scheduleId = params.id;
        return props.editSchedule(body);
      }
      props.createSchedule(body);
    },
  });
  useEffect(() => {
    if (props.newSchedule.success) {
      formik.setValues({
        status: false,
        movie: null,
        start_date_time: dateFormat.convertToDateTime(new Date()),
        screen: "",
        hall: null,
        price: {
          vip: "",
          regular: "",
        },
      });
    }
    if (props.editedSchedule.success) {
      history.goBack();
    }
  }, [props.newSchedule.success, props.editedSchedule.success]);

  useEffect(() => {
    if (props.edit) {
      const id = params.id;
      props.fetchScheduleDetail(id);
    }
    return () => {
      if (props.edit) {
        props.resetFetchDetailSchedule();
        props.resetEditSchedule();
      }
    };
  }, []);

  useEffect(() => {
    if (props.edit && props.scheduleDetail.data) {
      formik.setValues({
        status: props.scheduleDetail.data.status == "active",
        movie: props.scheduleDetail.data.movie,
        start_date_time: dateFormat.convertToDateTime(
          new Date(props.scheduleDetail.data.start_date_time)
        ),
        screen: props.scheduleDetail.data.screen,
        hall: props.scheduleDetail.data.hall,
        price: {
          vip: props.scheduleDetail.data.price.vip,
          regular: props.scheduleDetail.data.price.regular,
        },
      });
    }
  }, [props.scheduleDetail.data]);
  return (
    <div>
      {/* edit schedule */}
      <Dialog open={props.editedSchedule.loading}>
        <DialogContent>
          <CircularProgress disableShrink />
        </DialogContent>
      </Dialog>
      <Snackbar
        autoHideDuration={2000}
        anchorOrigin={{ vertical: "top", horizontal: "right" }}
        open={props.editedSchedule.error}
        onClose={() => props.resetEditSchedule()}
      >
        <Alert severity="error">{props.editedSchedule.error}</Alert>
      </Snackbar>
      {/* fetch schedule */}
      <Dialog open={props.scheduleDetail.loading}>
        <DialogContent>
          <CircularProgress disableShrink />
        </DialogContent>
      </Dialog>
      <Snackbar
        autoHideDuration={2000}
        anchorOrigin={{ vertical: "top", horizontal: "right" }}
        open={props.scheduleDetail.error}
        onClose={() => props.resetFetchDetailSchedule()}
      >
        <Alert severity="error">{props.scheduleDetail.error}</Alert>
      </Snackbar>

      {/* new schedule  */}
      <Dialog open={props.newSchedule.loading}>
        <DialogContent>
          <CircularProgress disableShrink />
        </DialogContent>
      </Dialog>
      <Snackbar
        autoHideDuration={2000}
        anchorOrigin={{ vertical: "top", horizontal: "right" }}
        open={props.newSchedule.success}
        onClose={() => props.resetCreateSchedule()}
      >
        <Alert severity="success">{props.newSchedule.success}</Alert>
      </Snackbar>
      <Snackbar
        autoHideDuration={2000}
        anchorOrigin={{ vertical: "top", horizontal: "right" }}
        open={props.newSchedule.error}
        onClose={() => props.resetCreateSchedule()}
      >
        <Alert severity="error">{props.newSchedule.error}</Alert>
      </Snackbar>
      <Box display="flex" justifyContent="flex-end">
        <Breadcrumbs>
          <p>
            <Link component={RouterLink} to="/schedules">
              schedules
            </Link>
          </p>
          {props.edit ? <p>edit schedule</p> : <p>new schedule</p>}
        </Breadcrumbs>
      </Box>
      <Card variant="outlined" className={classes.card}>
        <form onSubmit={formik.handleSubmit}>
          <Box display="flex" justifyContent="flex-end">
            <FormControlLabel
              label="activate"
              control={
                <Switch
                  checked={formik.values.status}
                  name="status"
                  onChange={formik.handleChange}
                />
              }
            />
          </Box>
          <TextField
            variant="outlined"
            label="show time"
            margin="dense"
            type="datetime-local"
            InputLabelProps={{ shrink: true }}
            fullWidth
            name="start_date_time"
            value={formik.values.start_date_time}
            onChange={formik.handleChange}
          />
          <TextField
            variant="outlined"
            label="screen"
            margin="dense"
            fullWidth
            name="screen"
            value={formik.values.screen}
            onChange={formik.handleChange}
          />
          <Autocomplete
            fullWidth
            filterSelectedOptions
            options={movie.options}
            value={formik.values.movie}
            loading={movie.loading}
            getOptionLabel={(option) => option.title}
            onChange={(event, newValue) => {
              formik.setValues({ ...formik.values, movie: newValue });
            }}
            onInputChange={(event, newInputValue) => {
              setMovie({ ...movie, inputValue: newInputValue });
            }}
            renderInput={(params) => {
              return (
                <TextField
                  {...params}
                  label="movies"
                  variant="outlined"
                  margin="dense"
                />
              );
            }}
            renderOption={(option) => {
              return <p>{option.title}</p>;
            }}
          />
          <Autocomplete
            fullWidth
            filterSelectedOptions
            options={hall.options}
            value={formik.values.hall}
            loading={hall.loading}
            getOptionLabel={(option) => option.name}
            onChange={(event, newValue) => {
              formik.setValues({ ...formik.values, hall: newValue });
            }}
            onInputChange={(event, newInputValue) => {
              setHall({ ...hall, inputValue: newInputValue });
            }}
            renderInput={(params) => {
              return (
                <TextField
                  {...params}
                  label="Cinema Hall"
                  variant="outlined"
                  margin="dense"
                />
              );
            }}
            renderOption={(option) => {
              return <p>{option.name}</p>;
            }}
          />
          <Grid container spacing={isSmall ? 0 : 2}>
            <Grid item xs={12} md={6}>
              <TextField
                variant="outlined"
                label="Vip Price"
                margin="dense"
                type="number"
                fullWidth
                name="price.vip"
                value={formik.values.price.vip}
                onChange={formik.handleChange}
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField
                variant="outlined"
                label="Regular Price"
                margin="dense"
                type="number"
                fullWidth
                name="price.regular"
                value={formik.values.price.regular}
                onChange={formik.handleChange}
              />
            </Grid>
          </Grid>

          <Box display="flex" justifyContent="flex-end" mt={1}>
            <Button variant="outlined" onClick={()=>history.goBack()}>Cancel</Button>
            <Box mr={2} />
            <Button variant="contained" type="submit" color="primary">
              Submit
            </Button>
          </Box>
        </form>
      </Card>
    </div>
  );
};
const mapStateToProps = (state) => {
  return {
    movies: state.movie.movies,
    newSchedule: state.schedule.newSchedule,
    scheduleDetail: state.schedule.scheduleDetail,
    editedSchedule: state.schedule.editedSchedule,
  };
};
const mapDispatchToProps = (dispatch) => {
  return {
    createSchedule: (schedule) =>
      dispatch(scheduleActions.createSchedule(schedule)),
    resetCreateSchedule: () => dispatch(scheduleActions.resetCreateSchedule()),
    fetchScheduleDetail: (id) =>
      dispatch(scheduleActions.fetchDetailSchedule(id)),
    resetFetchDetailSchedule: () =>
      dispatch(scheduleActions.resetFetchDetailSchedule()),
    editSchedule: (schedule) =>
      dispatch(scheduleActions.editSchedule(schedule)),
    resetEditSchedule: () => dispatch(scheduleActions.resetEditSchedule()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ScheduleForm);
