import { Breadcrumbs, Card, makeStyles, Typography } from "@material-ui/core";
import {
  Box,
  Button,
  Dialog,
  DialogContent,
  Grid,
  TextField,
  Link,
  CircularProgress,
  Snackbar,
} from "@material-ui/core";
import { useFormik } from "formik";
import React, { useEffect, useState } from "react";
import SeatForm from "../../seat-form/seat-form";
import { connect } from "react-redux";
import * as cinemaActions from "../../../store/cinema/actions";
import { Link as RouterLink, useHistory, useParams } from "react-router-dom";
import { Alert } from "@material-ui/lab";

const useStyle = makeStyles((theme) => ({
  screenWrapper: {
    width: (props) => {
      const width = props.cols * (15 + 15 + 5);
      return `${width}px`;
    },
    display: "flex",
    justifyContent: "center",
  },
  screen: {
    width: (props) => {
      const width = props.cols * (10 + 10);
      return `${width}px`;
    },
    backgroundColor: "#e0e0e0",
  },
  card: {
    padding: theme.spacing(2),
  },
}));

const CinemaForm = (props) => {
  const history = useHistory();
  const generateTable = (rows, columns) => {
    const table = {};
    for (let row = 0; row < rows; row++) {
      table[`${row}`] = {};
      for (let column = 0; column < columns; column++) {
        table[`${row}`][`${column}`] = {
          isSeat: false,
          isVip: false,
          seatName: null,
        };
      }
    }
    return table;
  };

  const [formValues, setFormValues] = useState({
    rows: "5",
    cols: "5",
    cinema_hall_name: "",
  });
  const [numOfSeats, setNumOfSeats] = useState(0);
  const [grid, setGrid] = useState(() => {
    const generated = generateTable(formValues.rows, formValues.cols);
    return generated;
  });
  useEffect(() => {
    console.log("here");
    new Promise((resolve, reject) => {
      const generated = generateTable(formValues.rows, formValues.cols);
      resolve(generated);
    }).then((generated) => setGrid(generated));
  }, [formValues.cols, formValues.rows]);

  const handleChange = (e) => {
    setFormValues({ ...formValues, [e.target.name]: e.target.value });
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    const cinema = {
      name: formValues.cinema_hall_name,
      num_of_seats: numOfSeats,
      seats: {
        cols: formValues.cols,
        rows: formValues.rows,
        grid: grid,
      },
    };
    // console.log(cinema)
    if (props.edit) {
      cinema.cinemaID = params.id;
      return props.editCinema(cinema);
    }
    props.createCinema(cinema);
  };

  const classes = useStyle({ cols: formValues.cols });

  const selectSeat = (row, col, isVip, seatName) => {
    const newGrid = {
      ...grid,
      [row]: {
        ...grid[row],
        [col]: {
          ...grid[row][col],
          isSeat: true,
          isVip: isVip,
          seatName: seatName,
        },
      },
    };
    setGrid(newGrid);
    const num = Number(numOfSeats) + 1;
    setNumOfSeats(num);
  };
  const unSelectSeat = (row, col) => {
    const newGrid = {
      ...grid,
      [row]: {
        ...grid[row],
        [col]: {
          ...grid[row][col],
          isSeat: false,
          isVip: false,
          seatName: null,
        },
      },
    };
    setGrid(newGrid);
    const num = Number(numOfSeats) - 1;
    setNumOfSeats(num);
  };
  /*

   0: {
     0: {
       isSeat: false,
       isVip: false,
     }
   },
   1: {

   }

 */
  const params = useParams();
  useEffect(() => {
    if (props.edit) {
      props.fetchSingleCinema(params.id);
    }
  }, []);
  useEffect(() => {
    if (props.edit && props.singleCinema.data) {
      setFormValues({
        rows: props.singleCinema.data.seats.rows,
        cols: props.singleCinema.data.seats.cols,
        cinema_hall_name: props.singleCinema.data.name,
      });
      setNumOfSeats(props.singleCinema.data.num_of_seats);
    }
  }, [props.singleCinema.data]);
  useEffect(() => {
    if (props.edit && props.singleCinema.data) {
      setGrid(props.singleCinema.data.seats.grid);
    }
    if (props.newCinema.success) {
      setGrid(generateTable(5, 5));
    }
  }, [grid]);

  useEffect(() => {
    if (props.editedCinema.success) {
      history.goBack();
    }
    if (props.newCinema.success) {
      setFormValues({
        rows: 5,
        cols: 5,
        cinema_hall_name: "",
      });
      setNumOfSeats(0);
    }
  }, [props.editedCinema.success, props.newCinema.success]);

  return (
    <>
      {/* create cinema */}
      <Dialog open={props.newCinema.loading}>
        <DialogContent>
          <CircularProgress disableShrink />
        </DialogContent>
      </Dialog>
      <Snackbar
        autoHideDuration={2000}
        anchorOrigin={{ vertical: "top", horizontal: "right" }}
        open={props.newCinema.success}
        onClose={() => props.resetCreateCinema()}
      >
        <Alert severity="success">{props.newCinema.success}</Alert>
      </Snackbar>
      <Snackbar
        autoHideDuration={2000}
        anchorOrigin={{ vertical: "top", horizontal: "right" }}
        open={props.newCinema.error}
        onClose={() => props.resetCreateCinema()}
      >
        <Alert severity="error">{props.newCinema.error}</Alert>
      </Snackbar>

      {/* edit cinema */}
      <Dialog open={props.editedCinema.loading}>
        <DialogContent>
          <CircularProgress disableShrink />
        </DialogContent>
      </Dialog>
      <Snackbar
        autoHideDuration={2000}
        anchorOrigin={{ vertical: "top", horizontal: "right" }}
        open={props.editedCinema.error}
        onClose={() => props.resetEditCinema()}
      >
        <Alert severity="error">{props.editedCinema.error}</Alert>
      </Snackbar>
      {/* populate fields  */}
      <Dialog open={props.singleCinema.loading}>
        <DialogContent>
          <CircularProgress disableShrink />
        </DialogContent>
      </Dialog>
      <Snackbar
        autoHideDuration={2000}
        anchorOrigin={{ vertical: "top", horizontal: "right" }}
        open={props.singleCinema.error}
        onClose={() => props.resetFetchSingleCinema()}
      >
        <Alert severity="error">{props.singleCinema.error}</Alert>
      </Snackbar>

      <Box display="flex" justifyContent="flex-end">
        <Breadcrumbs>
          <p>
            <Link to="/cinemas" component={RouterLink}>
              cinemas
            </Link>
          </p>
          {props.edit ? <p>edit cinema hall</p> : <p>new cinema hall</p>}
        </Breadcrumbs>
      </Box>
      <form onSubmit={handleSubmit}>
        <Card variant="outlined" className={classes.card}>
          <Grid container spacing={1}>
            <Grid item xs={12} md={6} style={{ overflowX: "auto" }}>
              <Box display="flex" justifyContent="center">
                <div className={classes.screenWrapper}>
                  <Card className={classes.screen} variant="outlined">
                    <Typography align="center">screen</Typography>
                  </Card>
                </div>
              </Box>
              {Object.keys(grid).map((row, index) => {
                return (
                  <Box display="flex" justifyContent="center">
                    {Object.keys(grid[row]).map((col) => (
                      <SeatForm
                        row={row}
                        col={col}
                        properties={grid[row][col]}
                        selectSeat={selectSeat}
                        unSelectSeat={unSelectSeat}
                      />
                    ))}
                  </Box>
                );
              })}
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                label="cinema hall name"
                variant="outlined"
                margin="dense"
                type="text"
                name="cinema_hall_name"
                value={formValues.cinema_hall_name}
                onChange={handleChange}
              />
              <Grid container item spacing={2}>
                <Grid item xs={12} md={6}>
                  <TextField
                    fullWidth
                    label="rows"
                    variant="outlined"
                    margin="dense"
                    type="number"
                    name="rows"
                    value={formValues.rows}
                    onChange={handleChange}
                  />
                </Grid>
                <Grid item xs={12} md={6}>
                  <TextField
                    fullWidth
                    label="columns"
                    variant="outlined"
                    margin="dense"
                    type="number"
                    name="cols"
                    value={formValues.cols}
                    onChange={handleChange}
                  />
                </Grid>
              </Grid>
              <Box display="flex" justifyContent="flex-end" mt={1}>
                <Button variant="outlined" size="small" color="error" onClick={()=>
                  history.goBack()
                }>
                  Cancel
                </Button>
                <Box mr={2} />
                <Button
                  variant="contained"
                  size="small"
                  type="submit"
                  color="primary"
                >
                  Submit
                </Button>
              </Box>
            </Grid>
          </Grid>
        </Card>
      </form>
    </>
  );
};

const mapStateToProps = (state) => {
  return {
    newCinema: state.cinema.newCinema,
    singleCinema: state.cinema.singleCinema,
    editedCinema: state.cinema.editedCinema,
  };
};
const mapDispatchToProps = (dispatch) => {
  return {
    createCinema: (cinema) => dispatch(cinemaActions.createCinema(cinema)),
    resetCreateCinema: () => dispatch(cinemaActions.resetCreateCinema()),
    fetchSingleCinema: (id) => dispatch(cinemaActions.fetchSingleCinema(id)),
    resetFetchSingleCinema: () =>
      dispatch(cinemaActions.resetFetchSingleCinema()),
    editCinema: (cinema) => dispatch(cinemaActions.editCinema(cinema)),
    resetEditCinema: () => dispatch(cinemaActions.resetEditCinema()),
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(CinemaForm);
