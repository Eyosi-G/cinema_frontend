import React, { useEffect, useState } from "react";
import { StyledTableCell, StyledTableRow } from "../../../styles/table-styles";
import {
  TableContainer,
  Table,
  TableHead,
  TableRow,
  TablePagination,
  IconButton,
  Paper,
  TableBody,
  Box,
  Button,
  TableCell,
  CircularProgress,
  TextField,
  InputAdornment,
  Dialog,
  DialogContent,
  DialogActions,
  Snackbar,
} from "@material-ui/core";
import RemoveCircleOutlineIcon from "@material-ui/icons/RemoveCircleOutline";
import AddIcon from "@material-ui/icons/Add";
import { connect } from "react-redux";
import * as userActions from "../../../store/user/actions";
import { useFormik } from "formik";
import CachedIcon from "@material-ui/icons/Cached";
import SearchIcon from "@material-ui/icons/Search";
import UserForm from "../user-form/user-form";
import { Alert } from "@material-ui/lab";
import Confirm from "../../confirm/confirm";
import EditIcon from "@material-ui/icons/Edit";

const ManageUsers = (props) => {
  const [openDialog, setOpenDialog] = useState(false);
  const [confirmDialog, setConfirmDialog] = useState({
    open: false,
  });
  const [limit, setLimit] = useState(5);
  const [page, setPage] = useState(0);
  const searchFormik = useFormik({
    initialValues: {
      name: "",
    },
  });
  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };
  const handleLimitChange = (event) => {
    setLimit(+event.target.value);
  };

  useEffect(() => {
    props.fetchUsers(page, limit, searchFormik.values.name);
  }, [limit, page, searchFormik.values.name]);

  const [edit, setEdit] = useState(false);
  const [user, setUser] = useState(null);
  return (
    <div>
      <Confirm
        confirmDialog={confirmDialog}
        setConfirmDialog={setConfirmDialog}
      />
      {/* edit user */}
      <Dialog open={props.editedUser.loading}>
        <DialogContent>
          <CircularProgress disableShrink />
        </DialogContent>
      </Dialog>
      <Snackbar
        autoHideDuration={2000}
        anchorOrigin={{ vertical: "top", horizontal: "right" }}
        open={props.editedUser.error}
        onClose={() => props.resetEditUser()}
      >
        <Alert severity="error">{props.editedUser.error}</Alert>
      </Snackbar>
      <Snackbar
        autoHideDuration={2000}
        anchorOrigin={{ vertical: "top", horizontal: "right" }}
        open={props.editedUser.user}
        onClose={() => props.resetEditUser()}
      >
        <Alert severity="success">user edited successfully !</Alert>
      </Snackbar>
      {/* delete user */}
      <Snackbar
        autoHideDuration={2000}
        anchorOrigin={{ vertical: "top", horizontal: "right" }}
        open={props.deletedUser.error}
        onClose={() => props.resetDeleteUser()}
      >
        <Alert severity="error">{props.deletedUser.error}</Alert>
      </Snackbar>
      <Snackbar
        autoHideDuration={2000}
        anchorOrigin={{ vertical: "top", horizontal: "right" }}
        open={props.deletedUser.user}
        onClose={() => props.resetDeleteUser()}
      >
        <Alert severity="success">user deleted successfully !</Alert>
      </Snackbar>

      {/* create user */}
      <Dialog open={props.newUser.loading}>
        <DialogContent>
          <CircularProgress disableShrink />
        </DialogContent>
      </Dialog>
      <Snackbar
        autoHideDuration={2000}
        anchorOrigin={{ vertical: "top", horizontal: "right" }}
        open={props.newUser.error}
        onClose={() => props.resetCreateUser()}
      >
        <Alert severity="error">{props.newUser.error}</Alert>
      </Snackbar>
      <Snackbar
        autoHideDuration={2000}
        anchorOrigin={{ vertical: "top", horizontal: "right" }}
        open={props.newUser.user}
        onClose={() => props.resetCreateUser()}
      >
        <Alert severity="success">user created successfully !</Alert>
      </Snackbar>

      <Dialog open={openDialog}>
        <UserForm
          openDialog={openDialog}
          setOpenDialog={setOpenDialog}
          edit={edit}
          user={user}
          setEdit={setEdit}
          setUser={setUser}
        />
      </Dialog>

      <Box display="flex" my={2} justifyContent="flex-end">
        <Button
          startIcon={<AddIcon />}
          variant="outlined"
          onClick={() => setOpenDialog(true)}
        >
          create user
        </Button>
      </Box>
      <TextField
        name="name"
        value={searchFormik.values.name}
        onChange={searchFormik.handleChange}
        variant="outlined"
        fullWidth
        margin="dense"
        label="search"
        InputProps={{
          endAdornment: (
            <InputAdornment>
              <SearchIcon />
            </InputAdornment>
          ),
        }}
      />
      <Box mt={1} />
      <TableContainer component={Paper} variant="outlined">
        <Table size="small">
          <TableHead>
            <TableRow>
              <StyledTableCell>User Name</StyledTableCell>
              <StyledTableCell>Roles</StyledTableCell>
              <StyledTableCell></StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {props.usersList.loading && (
              <TableRow>
                <TableCell colSpan={3}>
                  <Box my={2} display="flex" justifyContent="center">
                    <CircularProgress />
                  </Box>
                </TableCell>
              </TableRow>
            )}
            {props.usersList.error && (
              <TableRow>
                <TableCell colSpan={3}>
                  <Box my={2} display="flex" justifyContent="center">
                    <Button
                      variant="outlined"
                      startIcon={<CachedIcon />}
                      onClick={() =>
                        props.fetchUsers(page, limit, searchFormik.values.name)
                      }
                    >
                      reload
                    </Button>
                  </Box>
                </TableCell>
              </TableRow>
            )}
            {props.usersList.users.map((user) => {
              return (
                <StyledTableRow>
                  <StyledTableCell>{user.username}</StyledTableCell>
                  <StyledTableCell>{user.roles.toString()}</StyledTableCell>
                  <StyledTableCell>
                    <Box display="flex">
                      <IconButton
                        color="primary"
                        onClick={() => {
                          setUser(user);
                          setEdit(true);
                          setOpenDialog(true);
                        }}
                      >
                        <EditIcon />
                      </IconButton>
                      <IconButton
                        size="small"
                        color="primary"
                        onClick={() => {
                          setConfirmDialog({
                            open: true,
                            onConfirm: () => props.deleteUser(user.id),
                            title: "Are you sure ?",
                            message:
                              "Are you sure you want to delete this user ?",
                          });
                        }}
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
        count={props.usersList.size}
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
    usersList: state.user.usersList,
    newUser: state.user.newUser,
    deletedUser: state.user.deletedUser,
    editedUser: state.user.editedUser,
  };
};
const mapDispatchToProps = (dispatch) => {
  return {
    fetchUsers: (page, limit, name) =>
      dispatch(userActions.fetchUsers(page, limit, name)),
    resetCreateUser: () => dispatch(userActions.resetCreateUser()),
    deleteUser: (id) => dispatch(userActions.deleteUser(id)),
    resetDeleteUser: () => dispatch(userActions.resetDeleteUser()),
    resetEditUser: ()=>dispatch(userActions.resetEditUser())
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(ManageUsers);
