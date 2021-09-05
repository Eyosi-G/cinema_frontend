import {
  TextField,
  FormControlLabel,
  Checkbox,
  Box,
  DialogActions,
  Button,
  DialogContent,
  InputAdornment,
  IconButton,
} from "@material-ui/core";
import { useFormik } from "formik";
import React, { useEffect, useState } from "react";
import VisibilityIcon from "@material-ui/icons/Visibility";
import VisibilityOffIcon from "@material-ui/icons/VisibilityOff";
import { connect } from "react-redux";
import * as userActions from "../../../store/user/actions";

const UserForm = (props) => {
  const [passwordVisibility, setPasswordVisibility] = useState(false);

  const formik = useFormik({
    initialValues: {
      username: "",
      password: "",
      roles: {
        ADMIN: false,
        TICKETER: false,
      },
    },
    validate: (values) => {
      const error = {};
      if (!props.edit && values.username.length < 4)
        error.username = "invalid username !";
      if (!props.edit && values.password.length < 6)
        error.password = "invalid password !";
      if (!Object.values(values.roles).includes(true))
        error.roles = "select atleast one role!";
      return error;
    },
    onSubmit: (values) => {
      const roles = Object.keys(values.roles).filter(
        (role) => values.roles[role]
      );
      formik.setValues({
        password: "",
        username: "",
        roles: {
          ADMIN: false,
          TICKETER: false,
        },
      });
      if (props.edit) {
        props.editUser(props.user.id, roles);
        props.setEdit(false);
        props.setOpenDialog(false);
        return;
      }
      props.createUser(values.username, roles, values.password);
      props.setOpenDialog(false);
    },
  });

  useEffect(() => {
    if (props.edit && props.user) {
      formik.setValues({
        roles: {
          ADMIN: props.user.roles.includes("ADMIN"),
          TICKETER: props.user.roles.includes("TICKETER"),
        },
      });
    }
  }, []);
  return (
    <div>
      <form onSubmit={formik.handleSubmit}>
        <DialogContent>
          {!props.edit && (
            <TextField
              label="username"
              name="username"
              value={formik.values.username}
              onChange={formik.handleChange}
              margin="dense"
              fullWidth
              variant="outlined"
              error={formik.touched.username && formik.errors.username}
            />
          )}
          {!props.edit && (
            <TextField
              label="passsword"
              name="password"
              type={passwordVisibility ? "text" : "password"}
              value={formik.values.password}
              onChange={formik.handleChange}
              margin="dense"
              fullWidth
              variant="outlined"
              InputProps={{
                endAdornment: (
                  <InputAdornment>
                    {passwordVisibility ? (
                      <IconButton
                        onClick={() => setPasswordVisibility(false)}
                        color="primary"
                      >
                        <VisibilityIcon />
                      </IconButton>
                    ) : (
                      <IconButton
                        onClick={() => setPasswordVisibility(true)}
                        color="primary"
                      >
                        <VisibilityOffIcon />
                      </IconButton>
                    )}
                  </InputAdornment>
                ),
              }}
              error={formik.touched.password && formik.errors.password}
            />
          )}
          <FormControlLabel
            control={
              <Checkbox
                checked={formik.values.roles.ADMIN}
                onChange={formik.handleChange}
                name="roles.ADMIN"
              />
            }
            label="Admin"
          />
          <FormControlLabel
            control={
              <Checkbox
                checked={formik.values.roles.TICKETER}
                onChange={formik.handleChange}
                name="roles.TICKETER"
              />
            }
            label="Ticketer"
          />
        </DialogContent>
        <DialogActions>
          <Button
            variant="outlined"
            size="small"
            onClick={() => {
              if (props.edit) {
                props.setEdit(false);
              }
              props.setOpenDialog(false);
            }}
          >
            Cancel
          </Button>
          <Button
            variant="contained"
            color="primary"
            size="small"
            type="submit"
            disabled={!(formik.dirty && formik.isValid)}
          >
            Save
          </Button>
        </DialogActions>
      </form>
    </div>
  );
};
const mapDispatchToProps = (dispatch) => {
  return {
    createUser: (username, roles, password) =>
      dispatch(userActions.createUser(username, roles, password)),
    editUser: (id, roles) => dispatch(userActions.editUser(id, roles)),
  };
};
export default connect(null, mapDispatchToProps)(UserForm);
