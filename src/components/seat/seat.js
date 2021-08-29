import { makeStyles, Tooltip } from "@material-ui/core";
import React from "react";
import { amber } from "@material-ui/core/colors";
const useStyles = makeStyles((theme) => ({
  seatBox: {
    margin: "4px",
    border: "1px solid",
    padding: "7px",
    borderRadius: "5px",
  },
  empty: {
    margin: "4px",
    padding: "7px",
    borderRadius: "5px",
    border: "1px solid #f1f1f1",
  },
  seatSelected: {
    backgroundColor: "#1b5e20",
    // border: "1px solid #ffffff !important",
    // borderRadius: "5px",
  },
  seatTaken: {
    margin: "4px",
    padding: "7px",
    borderRadius: "5px",
    backgroundColor: "#424242",
    border: "1px solid #f1f1f1",
  },
  seatVip: {
    borderColor: amber[500],
  },
}));
const Seat = (props) => {
  const classes = useStyles();
  {
    if (props.seat.isSeat && props.seat.isTaken)
      return <div className={classes.seatTaken}></div>;
  }

  return (
    <>
      {props.seat.isSeat && !props.seat.isVip && (
        <Tooltip title={props.seat.seatName} arrow>
          <div
            className={`${classes.seatBox} ${
              props.seat.isSelected && classes.seatSelected
            }`}
            onClick={() => {
              props.seat.isSelected
                ? props.unSelectSeat(props.row, props.col)
                : props.selectSeat(
                    props.row,
                    props.col,
                    props.seat.seatName,
                    props.seat.isVip
                  );
            }}
          ></div>
        </Tooltip>
      )}
      {!props.seat.isSeat && <div className={classes.empty}></div>}
      {props.seat.isSeat && props.seat.isVip && (
        <Tooltip title={props.seat.seatName} arrow>
          <div
            className={`${classes.seatBox} ${classes.seatVip} ${
              props.seat.isSelected && classes.seatSelected
            }`}
            onClick={() => {
              props.seat.isSelected
                ? props.unSelectSeat(props.row, props.col)
                : props.selectSeat(
                    props.row,
                    props.col,
                    props.seat.seatName,
                    props.seat.isVip
                  );
            }}
          ></div>
        </Tooltip>
      )}
    </>
  );
};

export default Seat;
