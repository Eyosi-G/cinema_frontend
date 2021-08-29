import {
  Avatar,
  Box,
  Breadcrumbs,
  Button,
  Card,
  CardHeader,
  Chip,
  Grid,
  IconButton,
  Link,
  Paper,
  Snackbar,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TablePagination,
  TableRow,
  CircularProgress,
} from "@material-ui/core";
import { withStyles, makeStyles } from "@material-ui/core/styles";
import EditIcon from "@material-ui/icons/Edit";
import DeleteIcon from "@material-ui/icons/Delete";
import AddCircleIcon from "@material-ui/icons/AddCircle";
import React, { useEffect, useState } from "react";
import MoreVertIcon from "@material-ui/icons/MoreVert";
import RemoveCircleIcon from "@material-ui/icons/RemoveCircle";
import AddIcon from "@material-ui/icons/Add";
import { Link as RouterLink, useHistory } from "react-router-dom";
import { connect } from "react-redux";
import * as scheduleActions from "../../../store/schedule/actions";
import { Alert } from "@material-ui/lab";
import * as dateFormat from "../../../utils/date-time-format";
import Confirm from "../../confirm/confirm";
import RemoveCircleOutlineIcon from "@material-ui/icons/RemoveCircleOutline";

const StyledTableCell = withStyles((theme) => ({
  head: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  body: {
    fontSize: 14,
  },
}))(TableCell);

const StyledTableRow = withStyles((theme) => ({
  root: {
    "&:nth-of-type(odd)": {
      backgroundColor: theme.palette.action.hover,
    },
  },
}))(TableRow);

const Schedules = (props) => {
  const [page, setPage] = useState(0);
  const [limit, setLimit] = useState(10);
  const [confirmDialog, setConfirmDialog] = useState({
    open: false,
  });
  const history = useHistory();

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeLimit = (event) => {
    setLimit(+event.target.value);
  };

  useEffect(() => {
    props.fetchSchedules(page, limit);
  }, [page, limit]);

  return (
    <div>
      <Confirm
        confirmDialog={confirmDialog}
        setConfirmDialog={setConfirmDialog}
      />
      {/* delete schedule */}
      <Snackbar
        autoHideDuration={2000}
        anchorOrigin={{ vertical: "top", horizontal: "right" }}
        open={props.deletedSchedule.success}
        onClose={() => props.resetDeleteSchedule()}
      >
        <Alert severity="success">{props.deletedSchedule.success}</Alert>
      </Snackbar>

      <Snackbar
        autoHideDuration={2000}
        anchorOrigin={{ vertical: "top", horizontal: "right" }}
        open={props.deletedSchedule.error}
        onClose={() => props.resetDeleteSchedule()}
      >
        <Alert severity="error">{props.deletedSchedule.error}</Alert>
      </Snackbar>
      {/* fetch schedule */}
      <Snackbar
        autoHideDuration={2000}
        anchorOrigin={{ vertical: "top", horizontal: "right" }}
        open={props.schedulesList.error}
        onClose={() => props.resetFetchSchedules()}
      >
        <Alert severity="error">{props.schedulesList.error}</Alert>
      </Snackbar>

      <Box display="flex" justifyContent="flex-end">
        <Button
          size="small"
          variant="outlined"
          startIcon={<AddIcon />}
          onClick={() => history.push("/schedules/new")}
        >
          Add Schedule
        </Button>
      </Box>
      <Box mt={1} />
      <TableContainer component={Paper} variant="outlined">
        <Table size="small">
          <TableHead>
            <TableRow>
              <StyledTableCell>Movie</StyledTableCell>
              <StyledTableCell>Hall</StyledTableCell>
              <StyledTableCell>Show Date/Time</StyledTableCell>
              <StyledTableCell>Price</StyledTableCell>
              <StyledTableCell>Status</StyledTableCell>
              <StyledTableCell></StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {props.schedulesList.loading && (
              <StyledTableRow>
                <StyledTableCell colspan={6}>
                  <Box display="flex" justifyContent="center" mt={5}>
                    <CircularProgress disableShrink />
                  </Box>
                </StyledTableCell>
              </StyledTableRow>
            )}
            {props.schedulesList.schedules.map((schedule) => (
              <StyledTableRow>
                <StyledTableCell>{schedule.movie.title}</StyledTableCell>
                <StyledTableCell>{schedule.hall.name}</StyledTableCell>
                <StyledTableCell>
                  {new Date(`${schedule.start_date_time}`).toLocaleString(
                    "en-us",
                    {
                      month: "2-digit",
                      year: "numeric",
                      day: "2-digit",
                      hour: "2-digit",
                      minute: "2-digit",
                    }
                  )}
                </StyledTableCell>
                <StyledTableCell>
                  <Box display="flex">
                    <Chip
                      variant="outlined"
                      color="secondary"
                      label={`${schedule.price.vip} ETB`}
                      avatar={<Avatar>V</Avatar>}
                    />
                    <Box mr={1} />
                    <Chip
                      variant="outlined"
                      color="primary"
                      label={`${schedule.price.regular} ETB`}
                      avatar={<Avatar>R</Avatar>}
                    />
                  </Box>
                </StyledTableCell>
                <StyledTableCell>{schedule.status}</StyledTableCell>
                {schedule.status == "inactive" && (
                  <StyledTableCell>
                    <Box display="flex">
                      <IconButton
                        size="small"
                        color="primary"
                        onClick={() => {
                          history.push(`/schedules/${schedule.id}/edit`);
                        }}
                      >
                        <EditIcon />
                      </IconButton>
                      <Box mr={1} />
                      <IconButton
                        size="small"
                        color="primary"
                        onClick={() => {
                          setConfirmDialog({
                            open: true,
                            onConfirm: () => props.deleteSchedule(schedule.id),
                            title: "Are you sure ?",
                            message:
                              "Are you sure you want to delete this schedule ?",
                          });
                        }}
                      >
                        <RemoveCircleOutlineIcon />
                      </IconButton>
                    </Box>
                  </StyledTableCell>
                )}
                {schedule.status == "active" && (
                  <StyledTableCell></StyledTableCell>
                )}
              </StyledTableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[10, 25, 100]}
        component="div"
        count={props.schedulesList.size}
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
    schedulesList: state.schedule.schedulesList,
    deletedSchedule: state.schedule.deletedSchedule,
  };
};
const mapDispatchToProps = (dispatch) => {
  return {
    fetchSchedules: (page, limit) =>
      dispatch(scheduleActions.fetchSchedules(page, limit)),
    resetFetchSchedules: () => dispatch(scheduleActions.resetFetchSchedules()),
    deleteSchedule: (id) => dispatch(scheduleActions.deleteSchedule(id)),
    resetDeleteSchedule: () => dispatch(scheduleActions.resetDeleteSchedule()),
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(Schedules);
