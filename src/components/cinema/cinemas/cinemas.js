import {
  Box,
  Breadcrumbs,
  Button,
  Card,
  CardHeader,
  Grid,
  IconButton,
  Link,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TablePagination,
  TableRow,
  Snackbar,
} from "@material-ui/core";
import { withStyles, makeStyles } from "@material-ui/core/styles";
import EditIcon from "@material-ui/icons/Edit";
import DeleteIcon from "@material-ui/icons/Delete";
import AddCircleIcon from "@material-ui/icons/AddCircle";
import React, { useEffect, useState } from "react";
import MoreVertIcon from "@material-ui/icons/MoreVert";
import { Alert } from "@material-ui/lab";
import AddIcon from "@material-ui/icons/Add";
import { Link as RouterLink, useHistory } from "react-router-dom";
import { connect } from "react-redux";
import * as cinemasAction from "../../../store/cinema/actions";
import Confirm from "../../confirm/confirm";
import RemoveCircleOutlineIcon from "@material-ui/icons/RemoveCircleOutline";
import * as cinemaActions from "../../../store/cinema/actions";
const StyledTableCell = withStyles((theme) => ({
  head: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  body: {
    fontSize: 14,
  },
}))(TableCell);

const StyledTableRow = withStyles((theme) => ({
  root: {
    "&:nth-of-type(odd)": {
      backgroundColor: theme.palette.action.hover,
    },
  },
}))(TableRow);

const Cinemas = (props) => {
  const [page, setPage] = useState(0);
  const [limit, setLimit] = useState(5);
  const history = useHistory();
  const [confirmDialog, setConfirmDialog] = useState({ open: false });
  const deleteCinema = (id) => {
    setConfirmDialog({
      open: true,
      title: "Are you sure ?",
      message: "Are you sure you want to delete this cinema ?",
      onConfirm: () => {
        props.deleteCinema(id);
      },
    });
  };
  useEffect(() => {
    props.fetchCinemas("", page, limit);
  }, [page, limit]);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleLimitChange = (event) => {
    setLimit(+event.target.value);
  };
  return (
    <div>
      {/* edit cinema success  */}
      <Snackbar
        autoHideDuration={2000}
        anchorOrigin={{ vertical: "top", horizontal: "right" }}
        open={props.editedCinema.success}
        onClose={() => props.resetEditCinema()}
      >
        <Alert severity="success">{props.editedCinema.success}</Alert>
      </Snackbar>
      {/* delete cinema */}
      <Snackbar
        autoHideDuration={2000}
        anchorOrigin={{ vertical: "top", horizontal: "right" }}
        open={props.deletedCinema.success}
        onClose={() => props.resetDeleteCinema()}
      >
        <Alert severity="success">{props.deletedCinema.success}</Alert>
      </Snackbar>

      <Snackbar
        autoHideDuration={2000}
        anchorOrigin={{ vertical: "top", horizontal: "right" }}
        open={props.deletedCinema.error}
        onClose={() => props.resetDeleteCinema()}
      >
        <Alert severity="error">{props.deletedCinema.error}</Alert>
      </Snackbar>

      <Confirm
        confirmDialog={confirmDialog}
        setConfirmDialog={setConfirmDialog}
      />
      <Box display="flex" justifyContent="flex-end">
        <Link to="/cinemas/new" component={RouterLink}>
          <Button size="small" variant="outlined" startIcon={<AddIcon />}>
            Add Hall
          </Button>
        </Link>
      </Box>
      <Box mt={1} />
      <TableContainer component={Paper} variant="outlined">
        <Table size="small">
          <TableHead>
            <TableRow>
              <StyledTableCell>Name</StyledTableCell>
              <StyledTableCell>Seat(s)</StyledTableCell>
              <StyledTableCell></StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {props.cinemasList.cinemas.map((cinema) => {
              return (
                <StyledTableRow>
                  <StyledTableCell>{cinema.name}</StyledTableCell>
                  <StyledTableCell>{cinema.num_of_seats}</StyledTableCell>
                  <StyledTableCell>
                    <Box display="flex">
                      <IconButton
                        size="small"
                        color="primary"
                        onClick={() =>
                          history.push(`/cinemas/${cinema.id}/edit`)
                        }
                      >
                        <EditIcon />
                      </IconButton>
                      <Box mr={1} />
                      <IconButton
                        size="small"
                        color="primary"
                        onClick={() => deleteCinema(cinema.id)}
                      >
                        <RemoveCircleOutlineIcon />
                      </IconButton>
                    </Box>
                  </StyledTableCell>
                </StyledTableRow>
              );
            })}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[5, 10, 25]}
        component="div"
        count={props.cinemasList.size}
        rowsPerPage={limit}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleLimitChange}
      />
    </div>
  );
};
const mapStateToProps = (state) => {
  return {
    cinemasList: state.cinema.cinemasList,
    deletedCinema: state.cinema.deletedCinema,
    editedCinema: state.cinema.editedCinema,
  };
};
const mapDispatchToProps = (dispatch) => {
  return {
    fetchCinemas: (name, page, limit) =>
      dispatch(cinemasAction.fetchCinemas(name, page, limit)),
    deleteCinema: (id) => dispatch(cinemasAction.deleteCinema(id)),
    resetDeleteCinema: () => dispatch(cinemasAction.resetDeleteCinema()),
    resetEditCinema: () => dispatch(cinemaActions.resetEditCinema()),
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(Cinemas);
