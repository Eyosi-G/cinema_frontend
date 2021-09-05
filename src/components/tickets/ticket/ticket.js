import React from "react";
import {
  Typography,
  Divider,
  TableRow,
  TableCell,
  Table,
  Card,
  makeStyles,
  Button,
  Box,
} from "@material-ui/core";
import CheckIcon from "@material-ui/icons/Check";
import * as ticketActions from "../../../store/ticket/actions";
import { connect } from "react-redux";
const useStyle = makeStyles((theme) => ({
  card: {
    padding: theme.spacing(1),
  },
  title: {
    fontWeight: "bold",
  },
  approved: {
    color: "#1b5e20",
  },
}));
const Ticket = (props) => {
  const classes = useStyle();
  return (
    <Box mt={2}>
      <Card className={classes.card} variant="outlined" elevation={0}>
        <Table>
          <TableRow>
            <TableCell>
              <Typography className={classes.title}>
                {props.ticket.movie.title}&nbsp;|&nbsp;{props.ticket.screen}
              </Typography>
            </TableCell>
            <TableCell></TableCell>
          </TableRow>
          <TableRow>
            <TableCell>Schedule</TableCell>
            <TableCell>
              {new Date(props.ticket.schedule_date_time).toLocaleString(
                "en-us",
                {
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                  hour: "2-digit",
                  minute: "2-digit",
                }
              )}
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell>Seats</TableCell>
            <TableCell>
              {props.ticket.seats.map((seat) => seat.seatName).toString()}
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell>Cinema Hall</TableCell>
            <TableCell>{props.ticket.cinema_hall_name}</TableCell>
          </TableRow>
        </Table>
        <Box display="flex" mt={1} justifyContent="flex-end">
          {props.ticket.approved && (
            <Button
              color="primary"
              startIcon={<CheckIcon />}
              className={classes.approved}
            >
              Approved
            </Button>
          )}
          {!props.ticket.approved && (
            <Button
              color="primary"
              variant="contained"
              size="small"
              onClick={() => props.approvedTicket(props.ticket.id)}
            >
              Approve
            </Button>
          )}
        </Box>
      </Card>
    </Box>
  );
};
const mapDispatchToProps = (dispatch) => {
  return {
    approvedTicket: (id) => dispatch(ticketActions.approveTicket(id)),
  };
};
export default connect(null, mapDispatchToProps)(Ticket);
