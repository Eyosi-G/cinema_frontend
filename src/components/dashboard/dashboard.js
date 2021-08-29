import {
  Box,
  Button,
  Grid,
  Dialog,
  DialogContent,
  CircularProgress,
} from "@material-ui/core";
import React, { useEffect } from "react";
import DashboardCard from "../dashboard-card/dashboard-card";
import { connect } from "react-redux";
import * as dashboardActions from "../../store/dashboard/actions";
const Dashboard = (props) => {
  useEffect(() => {
    props.fetchDashBoard();
  }, []);

  if (props.dashboard.error)
    return (
      <Box display="flex" justifyContent="center" my={10}>
        <Button variant="outlined" onClick={props.fetchDashBoard}>
          try again
        </Button>
      </Box>
    );
  if (props.dashboard.loading)
    return (
      <Dialog open={props.dashboard.loading}>
        <DialogContent>
          <CircularProgress disableShrink />
        </DialogContent>
      </Dialog>
    );
  return (
    <div>
      <Grid container spacing={2}>
        <Grid item xs={12} md={4}>
          <DashboardCard
            amount={props.dashboard.datas.cinemas}
            title="Cinema Hall"
            path="/cinemas"
          />
        </Grid>
        <Grid item xs={12} md={4}>
          <DashboardCard amount={props.dashboard.datas.movies} title="Movies" path="/movies" />
        </Grid>
        <Grid item xs={12} md={4}>
          <DashboardCard
            amount={props.dashboard.datas.bookings}
            title="Bookings"
            path="/booking-reports"
          />
        </Grid>
      </Grid>
    </div>
  );
};
const mapStateToProps = (state) => {
  return {
    dashboard: state.dashboard.dashboard,
  };
};
const mapDispatchToProps = (dispatch) => {
  return {
    fetchDashBoard: () => dispatch(dashboardActions.fetchDashBoard()),
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(Dashboard);
