import {
  Box,
  Button,
  TextField,
  Fab,
  Typography,
  Divider,
  TableRow,
  TableCell,
  Table,
  Card,
  CircularProgress,
  Snackbar,
  Dialog,
  DialogContent,
  DialogActions,
} from "@material-ui/core";
import React, { useState } from "react";
import SearchIcon from "@material-ui/icons/Search";
import CropFreeIcon from "@material-ui/icons/CropFree";
import CheckIcon from "@material-ui/icons/Check";
import Ticket from "../ticket/ticket";
import { useFormik } from "formik";
import { connect } from "react-redux";
import * as ticketActions from "../../../store/ticket/actions";
import { Alert } from "@material-ui/lab";
import QrReader from "react-qr-scanner";
const ApproveTicket = (props) => {
  const [openScanner, setOpenScanner] = useState(false);
  const formik = useFormik({
    initialValues: {
      search: "",
    },
    onSubmit: (values) => {
      props.getTicketByCode(values.search);
      formik.setValues({ search: "" });
    },
  });
  const previewStyle = {
    height: 240,
    width: 320,
  };
  return (
    <div>
      {/* approve ticket  */}
      <Dialog open={props.approvedTicket.loading}>
        <DialogContent>
          <CircularProgress disableShrink />
        </DialogContent>
      </Dialog>
      <Snackbar
        autoHideDuration={2000}
        anchorOrigin={{ vertical: "top", horizontal: "right" }}
        open={props.approvedTicket.ticket}
        onClose={() => props.resetApproveTicket()}
      >
        <Alert severity="success">ticket approved !</Alert>
      </Snackbar>
      <Snackbar
        autoHideDuration={2000}
        anchorOrigin={{ vertical: "top", horizontal: "right" }}
        open={props.approvedTicket.error}
        onClose={() => props.resetApproveTicket()}
      >
        <Alert severity="error">{props.approvedTicket.error}</Alert>
      </Snackbar>

      <form onSubmit={formik.handleSubmit}>
        <Box display="flex" mt={4} alignItems="center">
          <TextField
            placeholder="Ticket Code"
            fullWidth
            variant="outlined"
            margin="dense"
            name="search"
            value={formik.values.search}
            onChange={formik.handleChange}
          />
          <Box mr={1} />
          <Button
            variant="contained"
            type="submit"
            color="primary"
            startIcon={<SearchIcon />}
          >
            search
          </Button>
        </Box>
      </form>
      {props.getTicket.loading && (
        <Box my={5} display="flex" justifyContent="center" alignItems="center">
          <CircularProgress disableShrink />
        </Box>
      )}
      {props.getTicket.ticket && <Ticket ticket={props.getTicket.ticket} />}
      <Snackbar
        autoHideDuration={2000}
        anchorOrigin={{ vertical: "top", horizontal: "right" }}
        open={props.getTicket.error}
        onClose={() => props.resetGetTicket()}
      >
        <Alert severity="error">{props.getTicket.error}</Alert>
      </Snackbar>
      <Dialog open={openScanner}>
        <DialogContent>
          <QrReader
            style={previewStyle}
            onError={(error) => {
                console.log(error)
            }}
            onScan={(result) => {
              console.log(result);
            }}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenScanner(false)}>close</Button>
        </DialogActions>
      </Dialog>

      <Box style={{ position: "absolute", bottom: "10px", right: "25px" }}>
        <Fab color="primary" aria-label="add">
          <CropFreeIcon onClick={() => setOpenScanner(true)} />
        </Fab>
      </Box>
    </div>
  );
};
const mapStateToProps = (state) => {
  return {
    getTicket: state.ticket.getTicket,
    approvedTicket: state.ticket.approvedTicket,
  };
};
const mapDispatchToProps = (dispatch) => {
  return {
    getTicketByCode: (code) => dispatch(ticketActions.getTicket(code)),
    resetGetTicket: () => dispatch(ticketActions.resetGetTicket()),
    resetApproveTicket: () => dispatch(ticketActions.resetApproveTicket()),
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(ApproveTicket);
