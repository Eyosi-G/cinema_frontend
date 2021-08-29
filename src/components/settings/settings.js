import {
  Box,
  Card,
  makeStyles,
  TextField,
  Typography,
  InputAdornment,
  IconButton,
  Button,
} from "@material-ui/core";
import React from "react";
import EditIcon from "@material-ui/icons/Edit";

const useStyles = makeStyles((theme) => ({
  card: {
    padding: theme.spacing(2),
  },
}));

const Settings = () => {
  const classes = useStyles();
  return (
    <Card variant="outlined" className={classes.card}>
      <form>
        <Typography style={{ fontWeight: "bold" }}>Account Basic</Typography>
        <Box mt={2} />
        <Typography>Password</Typography>
        <Box mt={1} />
        <Button variant="outlined" endIcon={<EditIcon />}>
          Change Password
        </Button>
      </form>
    </Card>
  );
};

export default Settings;
