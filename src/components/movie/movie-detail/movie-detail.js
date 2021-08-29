import {
  Box,
  Card,
  CardHeader,
  Chip,
  Grid,
  makeStyles,
  Typography,
  CircularProgress,
} from "@material-ui/core";
import React, { useEffect } from "react";
import Footer from "../../footer/footer";
import ScheduleCard from "../../schedule-card/schedule-card";
import CalendarTodayIcon from "@material-ui/icons/CalendarToday";
import ScheduleIcon from "@material-ui/icons/Schedule";
import { connect } from "react-redux";
import * as movieActions from "../../../store/movie/actions";
import config from "../../../config";
import { useParams } from "react-router-dom";

const useStyles = makeStyles((theme) => ({
  cover: {
    width: "100%",
    height: "100%",
    overflow: "hidden",
    objectFit: "cover",
  },
  coverWrapper: {
    position: "relative",
  },
  coverContent: {
    position: "absolute",
    padding: theme.spacing(2),
    backgroundColor: "#000000",
    top: "0px",
    color: "#ffffff",
    fontWeight: "bold",
  },
  title: {
    fontWeight: "bold",
  },
  content: {
    color: "#616161",
    fontSize: "13px",
    maxHeight: "130px",
    overflow: "hidden",
    textAlign: "justify",
  },
  card: {
    padding: theme.spacing(1),
  },
}));

const MovieDetail = (props) => {
  const classes = useStyles();

  const params = useParams();
  useEffect(() => {
    props.fetchMovieDetail(params.id);
  }, []);
  return (
    <div>
      {props.detail.loading && (
        <Box mt={2} mb={2} display="flex" justifyContent="center">
          <CircularProgress disableShrink />
        </Box>
      )}
      {!(props.detail.loading || props.detail.error) && (
        <div>
          <Card className={classes.card} elevation={0}>
            <Grid container spacing={2}>
              <Grid item xs={12} md={4}>
                <div className={classes.coverWrapper}>
                  <img
                    className={classes.cover}
                    src={`${config.baseURL}/images/${props.detail.data.cover_image}`}
                  />
                </div>
              </Grid>
              <Grid item xs={12} md={8}>
                <Box mt={1} />
                <Typography className={classes.title}>
                  {props.detail.data.title}
                </Typography>
                <Box mt={1} />
                <Box display="flex">
                  <Box>
                    <Typography className={classes.title}>
                      Release Date
                    </Typography>
                    <Box display="flex">
                      <CalendarTodayIcon style={{ fontSize: 18 }} />
                      <Box mr={1} />
                      <Typography className={classes.content}>
                        {new Date(
                          props.detail.data.release_date
                        ).toLocaleDateString("en-us")}
                      </Typography>
                    </Box>
                  </Box>
                  <Box mr={5} />
                  <Box>
                    <Typography className={classes.title}>Runtime</Typography>
                    <Box display="flex">
                      <ScheduleIcon style={{ fontSize: 18 }} />
                      <Box mr={1} />
                      <Typography className={classes.content}>
                        {props.detail.data.duration} min
                      </Typography>
                    </Box>
                  </Box>
                </Box>
                <Box mt={2} />
                <Typography className={classes.title}>Summary</Typography>
                <Typography className={classes.content}>
                  {props.detail.data.summary}
                </Typography>
                <Box mt={2} />
                <Typography className={classes.title}>Casts</Typography>
                <Typography className={classes.content}>
                  {props.detail.data.casts.toString()}
                </Typography>
                <Box mt={2} />
                <Typography className={classes.title}>Genres</Typography>
                <Typography className={classes.content}>
                  {props.detail.data.genres.toString()}
                </Typography>
                <Box mt={2} />
                <Typography className={classes.title}>Language</Typography>
                <Typography className={classes.content}>
                  {props.detail.data.language}
                </Typography>
              </Grid>
            </Grid>
          </Card>
          <Box mt={4} />
          <Typography className={classes.title}>Schedules</Typography>
          <Box mt={2} />
          {props.detail.data.schedules.map((schedule) => (
            <ScheduleCard schedule={schedule} />
          ))}
          <div>
            <Footer />
          </div>
          <Box mt={2} />
        </div>
      )}
    </div>
  );
};
const mapStateToProps = (state) => {
  return {
    detail: state.movie.detail,
  };
};
const mapDispatchToProps = (dispatch) => {
  return {
    fetchMovieDetail: (id) => dispatch(movieActions.fetchMovieDetail(id)),
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(MovieDetail);
