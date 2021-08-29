import {
  Box,
  Button,
  Divider,
  Grid,
  makeStyles,
  Typography,
  Dialog,
  DialogContent,
  CircularProgress,
  Snackbar,
  Backdrop,
} from "@material-ui/core";
import React, { useEffect, useState } from "react";
import Seat from "../seat/seat";
import { connect } from "react-redux";
import * as scheduleActions from "../../store/schedule/actions";
import { useHistory, useParams } from "react-router-dom";
import config from "../../config";
import { Alert } from "@material-ui/lab";

const useStyles = makeStyles((theme) => ({
  screen: {
    height: (props) => {
      const height = (props.cols * 4) / 3;
      return `${height}px`;
    },
    width: (props) => {
      const width = props.cols * 12;
      return `${width}px`;
    },
    border: "solid 1px #000",
    borderColor: "#000000 transparent transparent transparent",
    borderRadius: "50%/100% 100% 0 0",
  },
  title: {
    fontWeight: "bold",
  },
  content: {
    color: "#616161",
    fontSize: "12px",
  },
}));

const SelectSeat = (props) => {
  const params = useParams();
  const [seats, setSeats] = useState({});
  const [selectedSeats, setSelectedSeats] = useState([]);
  const history = useHistory();
  useEffect(() => {
    if (localStorage.getItem(config.storage)) history.push("/checkouts");
    props.fetchDetailSchedule(params.id);
    return () => {
      props.resetReserveSeats();
    };
  }, []);
  useEffect(() => {
    if (props.scheduleDetail.data && props.scheduleDetail.data.hall.seats.grid) {
      setSeats(props.scheduleDetail.data.hall.seats.grid);
    }
  }, [props.scheduleDetail.data]);

  useEffect(() => {
    if (props.reservedSeats.success) {
      history.push("/checkouts");
    }
  }, [props.reservedSeats.success]);

  const calculateTotalPrice = () => {
    let price = 0;
    selectedSeats.forEach((selectedSeat) => {
      if (selectedSeat.isVip) {
        price += props.scheduleDetail.data.price.vip;
      } else {
        price += props.scheduleDetail.data.price.regular;
      }
    });
    return price;
  };

  const selectedSeatsNames = () => {
    return selectedSeats
      .map((selectedSeat) => selectedSeat.seatName)
      .toString();
  };

  const classes = useStyles({
    cols:
      props.scheduleDetail.data && props.scheduleDetail.data.hall.seats.cols,
  });

  const selectSeat = (row, col, seatName, isVip) => {
    if (selectedSeats.length < 5) {
      const selected = { row, col, seatName, isVip };
      setSeats({
        ...seats,
        [row]: {
          ...seats[row],
          [col]: {
            ...seats[row][col],
            isSelected: true,
          },
        },
      });
      setSelectedSeats([...selectedSeats, selected]);
    }
  };
  const unSelectSeat = (row, col) => {
    const selected = selectedSeats.filter(
      (selectedSeat) => !(selectedSeat.row == row && selectedSeat.col == col)
    );
    setSeats({
      ...seats,
      [row]: {
        ...seats[row],
        [col]: {
          ...seats[row][col],
          isSelected: false,
        },
      },
    });
    setSelectedSeats(selected);
  };

  return (
    <div>
      {/* fetch schedule detail  */}
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

      {/* reserve seat  */}
      <Dialog open={props.reservedSeats.loading}>
        <DialogContent>
          <CircularProgress disableShrink />
        </DialogContent>
      </Dialog>
      <Snackbar
        autoHideDuration={2000}
        anchorOrigin={{ vertical: "top", horizontal: "right" }}
        open={props.reservedSeats.error}
        onClose={() => props.resetReserveSeats()}
      >
        <Alert severity="error">{props.reservedSeats.error}</Alert>
      </Snackbar>
      {props.scheduleDetail.data && (
        <Grid container spacing={2}>
          <Grid item xs={12} md={8}>
            <Box display="flex" justifyContent="center">
              <div className={classes.screen}></div>
            </Box>
            <Box mt={2} />

            {Object.keys(seats).map((row) => {
              return (
                <Box display="flex" justifyContent="center">
                  {Object.keys(seats[row]).map((col) => {
                    return (
                      <Seat
                        selectSeat={selectSeat}
                        unSelectSeat={unSelectSeat}
                        row={row}
                        col={col}
                        seat={seats[row][col]}
                      />
                    );
                  })}
                </Box>
              );
            })}
          </Grid>
          <Grid item xs={12} md={4}>
            <Typography className={classes.title}>
              {props.scheduleDetail.data.movie.title}
            </Typography>
            <Typography className={classes.content}>
              {props.scheduleDetail.data.movie.language} &nbsp;|&nbsp;
              {props.scheduleDetail.data.screen}
            </Typography>
            <Box mt={2} mb={2}>
              <Divider />
            </Box>
            <Typography className={classes.title}>Cinema Hall</Typography>
            <Typography className={classes.content}>
              {props.scheduleDetail.data.hall.name}
            </Typography>
            <Box mt={2} mb={2}>
              <Divider />
            </Box>
            <Typography className={classes.title}>Schedule</Typography>
            <Typography className={classes.content}>
              {new Date(
                props.scheduleDetail.data.start_date_time
              ).toLocaleString("en-ca")}
            </Typography>
            <Box mt={2} mb={2}>
              <Divider />
            </Box>
            <Typography className={classes.title}>Seats Selected</Typography>
            <Typography className={classes.content}>
              {selectedSeatsNames()}
            </Typography>
            <Box mt={2} />
            <Box display="flex" justifyContent="space-between">
              <Typography className={classes.content}>
                {selectedSeats.length} seats
              </Typography>
              <Typography className={classes.content}>
                {calculateTotalPrice()} ETB
              </Typography>
            </Box>
            <Box mt={5} display="flex" justifyContent="flex-end">
              <Button
                color="primary"
                variant="contained"
                size="small"
                disabled={selectedSeats.length == 0}
                onClick={() => {
                  props.reserveSeats(params.id, selectedSeats);
                }}
              >
                checkout
              </Button>
            </Box>
          </Grid>
        </Grid>
      )}
    </div>
  );
};
const mapStateToProps = (state) => {
  return {
    scheduleDetail: state.schedule.scheduleDetail,
    reservedSeats: state.schedule.reservedSeats,
  };
};
const mapDispatchToProps = (dispatch) => {
  return {
    fetchDetailSchedule: (id) =>
      dispatch(scheduleActions.fetchDetailSchedule(id)),
    reserveSeats: (scheduleId, selectedSeats) =>
      dispatch(scheduleActions.reserveSeats(scheduleId, selectedSeats)),
    resetReserveSeats: () => dispatch(scheduleActions.resetReserveSeats()),
    resetFetchDetailSchedule: () =>
      dispatch(scheduleActions.resetFetchDetailSchedule()),
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(SelectSeat);
