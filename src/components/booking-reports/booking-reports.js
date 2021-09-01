import React, { useState } from "react";
import {
  TableContainer,
  TableRow,
  Table,
  TableHead,
  Box,
  TablePagination,
  IconButton,
  Button,
  TextField,
  Typography,
  Paper,
  TableBody,
  TableCell,
  CircularProgress,
} from "@material-ui/core";
import { StyledTableCell, StyledTableRow } from "../../styles/table-styles";
import { connect } from "react-redux";
import * as ticketActions from "../../store/ticket/actions";
import { useEffect } from "react";
const BookingReports = (props) => {
  const [limit, setLimit] = useState(5);
  const [page, setPage] = useState(0);
  const [date, setDate] = useState(new Date().toLocaleDateString("en-ca"));
  const handlePageChange = (event, newPage) => {
    setPage(newPage);
  };

  const handleLimitChange = (event) => {
    setLimit(+event.target.value);
  };

  useEffect(() => {
    props.fetchTickets(page, limit, date);
  }, [limit, page, date]);

  return (
    <div>
      <Box mt={1} mb={2} display="flex">
        <TextField
          type="date"
          margin="dense"
          fullWidth
          value={date}
          onChange={(e) => setDate(e.target.value)}
        />
      </Box>
      <TableContainer component={Paper} variant="outlined">
        <Table size="small">
          <TableHead>
            <TableRow>
              <StyledTableCell>Movie</StyledTableCell>
              <StyledTableCell>Schedule</StyledTableCell>
              <StyledTableCell>Cinema Hall</StyledTableCell>
              <StyledTableCell>Seats</StyledTableCell>
              <StyledTableCell>Amount Paid</StyledTableCell>
            </TableRow>
          </TableHead>

          <TableBody>
            {props.ticketsList.loading && (
              <StyledTableRow>
                <StyledTableCell colSpan={5}>
                  <Box mt={2} mb={2} display="flex" justifyContent="center">
                    <CircularProgress />
                  </Box>
                </StyledTableCell>
              </StyledTableRow>
            )}
            {props.ticketsList.tickets.map((ticket) => {
              return (
                <StyledTableRow>
                  <StyledTableCell>{ticket.movie.title}</StyledTableCell>
                  <StyledTableCell>
                    {new Date(ticket.schedule_date_time).toLocaleString("en-us")}
                  </StyledTableCell>
                  <StyledTableCell>{ticket.cinema_hall_name}</StyledTableCell>
                  <StyledTableCell>{ticket.seats.map(seat => seat.seatName).toString()}</StyledTableCell>
                  <StyledTableCell>{ticket.amount_paid}&nbsp;ETB</StyledTableCell>
                </StyledTableRow>
              );
            })}
          </TableBody>

          <TableRow>
            <TableCell colSpan={3}></TableCell>
            <TableCell>Total</TableCell>
            <TableCell>{props.ticketsList.total} ETB</TableCell>
          </TableRow>
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[5, 10, 25]}
        component="div"
        count={props.ticketsList.size}
        rowsPerPage={limit}
        page={page}
        onPageChange={handlePageChange}
        onRowsPerPageChange={handleLimitChange}
      />
      <Box mt={2} />
    </div>
  );
};
const mapStateToProps = (state) => {
  return {
    ticketsList: state.ticket.ticketsList,
  };
};
const mapDispatchToProps = (dispatch) => {
  return {
    fetchTickets: (page, limit, date) =>
      dispatch(ticketActions.fetchTickets(page, limit, date)),
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(BookingReports);
