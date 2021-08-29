import React, { useState } from "react";
import EventSeatIcon from "@material-ui/icons/EventSeat";
import {
  Box,
  Button,
  Card,
  CardContent,
  Dialog,
  DialogContent,
  makeStyles,
  TextField,
  Checkbox,
  Typography,
  FormControlLabel,
  Tooltip,
} from "@material-ui/core";
import CssBaseline from "@material-ui/core/CssBaseline";
import { DriveEtaOutlined } from "@material-ui/icons";
import { amber, pink } from "@material-ui/core/colors";
import { useFormik } from "formik";

const useStyles = makeStyles((theme) => ({
  root: {
    margin: "5px",
    width: "15px",
    height: "15px",
    justifyContent: "center",
    alignItems: "center",
    border: "1px solid #bdbdbd",
    padding: "10px",
    borderRadius: "5px",
  },
  seatSelected: {
    borderColor: theme.palette.primary.main,
  },
  seatVip: {
    borderColor: amber[500],
  },
}));
const SeatForm = ({ unSelectSeat, selectSeat, properties, col, row }) => {
  const classes = useStyles();
  const [dialog, setDialog] = useState({ isOpen: false });
  const formik = useFormik({
    initialValues: {
      isVip: false,
      seatName: "",
    },
    onSubmit: (values) => {
      selectSeat(row, col, values.isVip, values.seatName);
      setDialog({ isOpen: false });
    },
  });
  return (
    <div>
      <Dialog open={dialog.isOpen} onClose={() => setDialog({ isOpen: false })}>
        <DialogContent>
          <form onSubmit={formik.handleSubmit}>
            <Box>
              <TextField
                margin="dense"
                name="seatName"
                label="seat name"
                value={formik.values.seatName}
                onChange={formik.handleChange}
              />
            </Box>
            <Box mt={1} />
            <Box>
              <FormControlLabel
                control={
                  <Checkbox
                    checked={formik.values.isVip}
                    onChange={formik.handleChange}
                    name="isVip"
                  />
                }
                label="vip"
              />
            </Box>
            <Box mt={1} />
            <Box display="flex" justifyContent="stretch">
              <Button
                type="submit"
                variant="contained"
                size="small"
                color="primary"
                fullWidth
              >
                select
              </Button>
            </Box>
          </form>
        </DialogContent>
      </Dialog>
      {properties.isSeat && properties.isVip && (
        <Tooltip title={properties.seatName}>
        <Box
          display="flex"
          onClick={() => unSelectSeat(row, col)}
          className={`${classes.root} ${classes.seatVip}`}
        ></Box>
        </Tooltip>
      )}
      {properties.isSeat && !properties.isVip && (
        <Tooltip title={properties.seatName}>
          <Box
            display="flex"
            onClick={() => unSelectSeat(row, col)}
            className={`${classes.root} ${classes.seatSelected}`}
          ></Box>
        </Tooltip>
      )}
      {!properties.isSeat && (
        <Box
          className={classes.root}
          onClick={() => {
            console.log("here");
            setDialog({ isOpen: true });
          }}
        />
      )}
    </div>
  );
};

export default SeatForm;
