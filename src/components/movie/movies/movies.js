import {
  Box,
  Button,
  IconButton,
  Link,
  Paper,
  Table,
  TableBody,
  TableContainer,
  TableHead,
  TablePagination,
  TableRow,
  CircularProgress,
  Dialog,
  DialogContent,
  Snackbar,
} from "@material-ui/core";
import EditIcon from "@material-ui/icons/Edit";
import DeleteIcon from "@material-ui/icons/Delete";
import React, { useEffect, useState } from "react";
import AddIcon from "@material-ui/icons/Add";
import { Link as RouterLink, useHistory } from "react-router-dom";
import { StyledTableCell, StyledTableRow } from "../../../styles/table-styles";
import { connect } from "react-redux";
import * as moviesAction from "../../../store/movie/actions";
import Confirm from "../../confirm/confirm";
import { Alert } from "@material-ui/lab";
import RemoveCircleOutlineIcon from "@material-ui/icons/RemoveCircleOutline";

const Movies = (props) => {
  const history = useHistory();
  const [limit, setLimit] = useState(5);
  const [page, setPage] = useState(() => {
    return 0;
  });
  const [confirmDialog, setConfirmDialog] = useState({
    open: false,
  });

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeLimit = (event) => {
    setLimit(+event.target.value);
  };

  useEffect(() => {
    props.fetchMovies("", page, limit);
  }, [page, limit]);

  const handleEdit = (movie) => {
    history.push(`/movies/${movie.id}/edit`);
  };
  const handleDelete = (movie) => {
    setConfirmDialog({
      open: true,
      title: "Are you sure ?",
      message:
        "Are you sure you want to delete this record ? This action is irreverable.",
      onConfirm: () => {
        props.deleteMovie(movie.id);
      },
    });
  };
  return (
    <div>
      <Dialog open={props.deletedMovie.loading}>
        <DialogContent>
          <CircularProgress disableShrink />
        </DialogContent>
      </Dialog>
      <Snackbar
        autoHideDuration={2000}
        anchorOrigin={{ vertical: "top", horizontal: "right" }}
        open={props.deletedMovie.success}
        onClose={() => props.resetDeletedMovie()}
      >
        <Alert severity="success">movie deleted successfully !</Alert>
      </Snackbar>
      <Snackbar
        autoHideDuration={2000}
        anchorOrigin={{ vertical: "top", horizontal: "right" }}
        open={props.deletedMovie.error}
        onClose={() => props.resetDeletedMovie()}
      >
        <Alert severity="error">{props.deletedMovie.error}</Alert>
      </Snackbar>
      <Confirm
        confirmDialog={confirmDialog}
        setConfirmDialog={setConfirmDialog}
      />
      <Box display="flex" justifyContent="flex-end">
        <Button
          size="small"
          variant="outlined"
          startIcon={<AddIcon />}
          onClick={() => history.push("/movies/new")}
        >
          Add Movie
        </Button>
      </Box>
      <Box mt={1} />
      <TableContainer component={Paper} variant="outlined">
        <Table size="small">
          <TableHead>
            <TableRow>
              <StyledTableCell>Title</StyledTableCell>
              <StyledTableCell>Date Released</StyledTableCell>
              <StyledTableCell></StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {props.movies.data.map((movie) => (
              <StyledTableRow>
                <StyledTableCell>{movie.title}</StyledTableCell>
                <StyledTableCell>
                  {new Date(movie.release_date).toLocaleDateString("en-us")}
                </StyledTableCell>

                <StyledTableCell>
                  <Box display="flex">
                    <IconButton
                      size="small"
                      color="primary"
                      onClick={() => handleEdit(movie)}
                    >
                      <EditIcon />
                    </IconButton>
                    <Box mr={1} />
                    <IconButton
                      size="small"
                      color="primary"
                      onClick={() => handleDelete(movie)}
                    >
                      <RemoveCircleOutlineIcon />
                    </IconButton>
                  </Box>
                </StyledTableCell>
              </StyledTableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[5, 10, 25, 100]}
        component="div"
        count={props.movies.size}
        rowsPerPage={limit}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeLimit}
      />
    </div>
  );
};
const mapStateToProps = (state) => {
  return {
    movies: state.movie.movies,
    deletedMovie: state.movie.deletedMovie,
  };
};
const mapDispatchToProps = (dispatch) => {
  return {
    fetchMovies: (name, page, limit) =>
      dispatch(moviesAction.fetchMovies(name, page, limit)),
    deleteMovie: (id) => dispatch(moviesAction.deleteMovie(id)),
    resetDeletedMovie: () => dispatch(moviesAction.resetDeletedMovie()),
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(Movies);
