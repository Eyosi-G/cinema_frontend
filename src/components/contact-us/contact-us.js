import {
  Box,
  Button,
  Card,
  Grid,
  makeStyles,
  TextField,
  Typography,
} from "@material-ui/core";
import React from "react";
import LocationOnIcon from "@material-ui/icons/LocationOn";
import PhoneIcon from "@material-ui/icons/Phone";
import MailIcon from "@material-ui/icons/Mail";

const useSyles = makeStyles((theme) => ({
    title:{
        fontWeight:"bold"
    },
    card: {
        padding: theme.spacing(1)
    }
}));
const ContactUs = () => {
  const classes = useSyles();
  return (
    <Card id="contact-us" className={classes.card} elevation="0">
      <Typography className={classes.title}>Send us a message</Typography>
      <TextField
        label="Enter your name"
        variant="outlined"
        margin="dense"
        fullWidth
      />
      <TextField
        label="Enter your email"
        variant="outlined"
        margin="dense"
        fullWidth
      />
      <TextField
        label="Enter your message"
        multiline
        minRows={4}
        variant="outlined"
        margin="dense"
        fullWidth
      />
      <Box justifyContent="flex-end" display="flex">
        <Button variant="contained"  size="small" color="primary">Send Now</Button>
      </Box>
    </Card>
  );
};

export default ContactUs;
