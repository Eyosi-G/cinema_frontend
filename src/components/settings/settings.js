import {
  Box,
  Card,
  makeStyles,
  TextField,
  Typography,
  InputAdornment,
  IconButton,
  Button,
  Dialog,
  DialogContent,
  CircularProgress,
  Snackbar
} from "@material-ui/core";
import React, { useState } from "react";
import EditIcon from "@material-ui/icons/Edit";
import { useFormik } from "formik";
import VisibilityIcon from "@material-ui/icons/Visibility";
import VisibilityOffIcon from "@material-ui/icons/VisibilityOff";
import { connect } from "react-redux";
import * as authActions from "../../store/auth/actions";
import { Alert } from "@material-ui/lab";
import Confirm from "../confirm/confirm";
const useStyles = makeStyles((theme) => ({
  card: {
    padding: theme.spacing(2),
  },
}));

const Settings = (props) => {
  const classes = useStyles();
  const [dialogOpen, setDialogOpen] = useState(false);
  const [confirmDialog, setConfirmDialog] = useState({
    open: false
  })
  const [visibility, setVisibility] = useState({
    oldPasswordVisibility: false,
    newPasswordVisibility: false,
  });
  const passwordForm = useFormik({
    initialValues: {
      oldPassword: "",
      newPassword: "",
    },
    onSubmit:(values)=>{
      setConfirmDialog({
        open:true,
        onConfirm: ()=>{
          setDialogOpen(false);
          props.updatePassword(values.oldPassword, values.newPassword);
          passwordForm.setValues({
            oldPassword:"",
            newPassword:""
          })
        },
        title:"Are you sure ?",
        message: "Are you sure you want to change your password ?"
      })
    }
  });
  return (
    <Card variant="outlined" className={classes.card}>
      <Confirm confirmDialog={confirmDialog} setConfirmDialog={setConfirmDialog} />
      <Dialog open={props.changePassword.isLoading}>
        <DialogContent>
          <CircularProgress disableShrink />
        </DialogContent>
      </Dialog>
      <Snackbar
        autoHideDuration={2000}
        anchorOrigin={{ vertical: "top", horizontal: "right" }}
        open={props.changePassword.success}
        onClose={() => props.resetChangePassword()}
      >
        <Alert severity="success">{props.changePassword.success}</Alert>
      </Snackbar>

      <Snackbar
        autoHideDuration={2000}
        anchorOrigin={{ vertical: "top", horizontal: "right" }}
        open={props.changePassword.error}
        onClose={() => props.resetChangePassword()}
      >
        <Alert severity="error">{props.changePassword.error}</Alert>
      </Snackbar>

      <Dialog open={dialogOpen} onClose={() => setDialogOpen(false)}>
        <DialogContent>
          <form onSubmit={passwordForm.handleSubmit}>
            <Box display="flex">
              <TextField
                label="old password"
                name="oldPassword"
                value={passwordForm.values.oldPassword}
                onChange={passwordForm.handleChange}
                type={visibility.oldPasswordVisibility ? "text" : "password"}
                InputProps={{
                  endAdornment: (
                    <InputAdornment>
                      {visibility.oldPasswordVisibility ? (
                        <IconButton
                          onClick={() =>
                            setVisibility({
                              ...visibility,
                              oldPasswordVisibility: false,
                            })
                          }
                        >
                          <VisibilityIcon color="primary" />
                        </IconButton>
                      ) : (
                        <IconButton
                          onClick={() =>
                            setVisibility({
                              ...visibility,
                              oldPasswordVisibility: true,
                            })
                          }
                        >
                          <VisibilityOffIcon color="primary" />
                        </IconButton>
                      )}
                    </InputAdornment>
                  ),
                }}
              />
              <Box mr={1} />
              <TextField
                label="new password"
                name="newPassword"
                value={passwordForm.values.newPassword}
                onChange={passwordForm.handleChange}
                type={visibility.newPasswordVisibility ? "text" : "password"}
                InputProps={{
                  endAdornment: (
                    <InputAdornment>
                      {visibility.newPasswordVisibility ? (
                        <IconButton
                          onClick={() =>
                            setVisibility({
                              ...visibility,
                              newPasswordVisibility: false,
                            })
                          }
                        >
                          <VisibilityIcon color="primary" />
                        </IconButton>
                      ) : (
                        <IconButton
                          onClick={() =>
                            setVisibility({
                              ...visibility,
                              newPasswordVisibility: true,
                            })
                          }
                        >
                          <VisibilityOffIcon color="primary" />
                        </IconButton>
                      )}
                    </InputAdornment>
                  ),
                }}
              />
            </Box>
            <Box display="flex" mt={1} justifyContent="flex-end">
              <Button
                variant="outlined"
                size="small"
                color="primary"
                onClick={() => setDialogOpen(false)}
              >
                cancel
              </Button>
              <Box mr={2} />
              <Button
                variant="contained"
                size="small"
                color="primary"
                type="submit"
              >
                change
              </Button>
            </Box>
          </form>
        </DialogContent>
      </Dialog>
      <form>
        <Typography style={{ fontWeight: "bold" }}>Account Basic</Typography>
        <Box mt={2} />
        <Typography>Password</Typography>
        <Box mt={1} />
        <Button
          variant="outlined"
          endIcon={<EditIcon />}
          onClick={() => setDialogOpen(true)}
        >
          Change Password
        </Button>
      </form>
    </Card>
  );
};
const mapStateToProps = (state) => {
  return {
    changePassword: state.auth.changePassword,
  };
};
const mapDispatchToProps = (dispatch) => {
  return {
    updatePassword: (oldPassword, newPassword) =>
      dispatch(authActions.updatePassword(oldPassword, newPassword)),
      resetChangePassword: ()=>dispatch(authActions.resetUpdatePassword())
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(Settings);
