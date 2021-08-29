import {
  Box,
  Table,
  TableBody,
  TableContainer,
  TableHead,
  TablePagination,
  TableRow,
  Paper,
  IconButton,
  TextField,
  Button,
  Snackbar,
} from "@material-ui/core";
import { StyledTableCell, StyledTableRow } from "../../styles/table-styles";
import AddIcon from "@material-ui/icons/Add";
import DeleteIcon from "@material-ui/icons/Delete";
import { useEffect, useState } from "react";
import { useFormik } from "formik";
import { connect } from "react-redux";
import * as genreActions from "../../store/genre/actions";
import Confirm from "../confirm/confirm";
import { Alert } from "@material-ui/lab";
const Genres = (props) => {
  const [page, setPage] = useState(0);
  const [limit, setLimit] = useState(5);
  const [confirmDialog, setConfirmDialog] = useState({ open: false });


  useEffect(() => {
    props.fetchGenres(page, limit);
  }, [page, limit]);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleLimitChange = (event) => {
    setLimit(+event.target.value);
  };
  const handleDelete = (id) => {
    setConfirmDialog({
      open: true,
      message: "Do you want to delete this record ? ",
      title: "Are you sure ?",
      onConfirm: () => {
        props.deleteGenre(id);
      },
    });
  };
  const formik = useFormik({
    initialValues: {
      name: "",
    },
    onSubmit: (values) => {
      props.createGenre(values.name);
      formik.setValues({ name: "" });
    },
    validate: (values) => {
      const errors = {};
      if (values.name.length <= 0) {
        errors.name = "name can't be empty";
      }
      return errors;
    },
  });

  return (
    <div>
      <Confirm
        confirmDialog={confirmDialog}
        setConfirmDialog={setConfirmDialog}
      />
      <Snackbar
        autoHideDuration={1000}
        anchorOrigin={{ vertical: "top", horizontal: "right" }}
        open={props.deletedGenre.success}
        onClose={() => props.resetDeletedGenre()}
      >
        <Alert severity="success">genre deleted successfully !</Alert>
      </Snackbar>
      <Snackbar
        autoHideDuration={1000}
        anchorOrigin={{ vertical: "top", horizontal: "right" }}
        open={props.createdGenre.success}
        onClose={() => props.resetCreateGenre()}
      >
        <Alert severity="success">genre created successfully !</Alert>
      </Snackbar>
      <form onSubmit={formik.handleSubmit}>
        <Box display="flex" alignItems="center">
          <Box flexGrow={1}>
            <TextField
              variant="outlined"
              label="Genre"
              margin="dense"
              name="name"
              onChange={formik.handleChange}
              value={formik.values.name}
              fullWidth
            />
          </Box>
          <Box ml={2} />
          <Button
            variant="outlined"
            color="primary"
            type="submit"
            startIcon={<AddIcon />}
          >
            Add Genre
          </Button>
        </Box>
      </form>
      <Box mt={3} />
      <TableContainer component={Paper} variant="outlined">
        <Table size="small">
          <TableHead>
            <TableRow>
              <StyledTableCell>Title</StyledTableCell>
              <StyledTableCell></StyledTableCell>
              <StyledTableCell></StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {props.genres.data.map((genre) => {
              return (
                <StyledTableRow>
                  <StyledTableCell>{genre.name}</StyledTableCell>
                  <StyledTableCell></StyledTableCell>
                  <StyledTableCell>
                    <Box display="flex">
                      <IconButton
                        size="small"
                        color="primary"
                        onClick={() => handleDelete(genre.id)}
                      >
                        <DeleteIcon />
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
        count={props.genres.size}
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
    genres: state.genre.genres,
    deletedGenre: state.genre.deletedGenre,
    createdGenre: state.genre.createdGenre,
  };
};
const mapDispatchToProps = (dispatch) => {
  return {
    fetchGenres: (page, limit) =>
      dispatch(genreActions.fetchGenres(page, limit)),
    deleteGenre: (id) => dispatch(genreActions.deleteGenre(id)),
    resetDeletedGenre: () => dispatch(genreActions.resetDeletedGenre()),
    createGenre: (name) => dispatch(genreActions.createGenre(name)),
    resetCreateGenre: () => dispatch(genreActions.resetCreateGenre()),
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(Genres);
