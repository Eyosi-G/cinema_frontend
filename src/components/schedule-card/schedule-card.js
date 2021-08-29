import {
  Box,
  Card,
  IconButton,
  makeStyles,
  Typography,
} from "@material-ui/core";
import React from "react";
import CalendarTodayIcon from "@material-ui/icons/CalendarToday";
import ScheduleIcon from "@material-ui/icons/Schedule";
import LaunchIcon from "@material-ui/icons/Launch";
import VideoLabelIcon from "@material-ui/icons/VideoLabel";
import { useHistory } from "react-router-dom";

const useStyles = makeStyles((theme) => ({
  card: {
    padding: theme.spacing(2),
    marginBottom: theme.spacing(2),
  },
}));

const ScheduleCard = (props) => {
  const classes = useStyles();
  const history = useHistory();
  return (
    <Card className={classes.card} variant="outlined">
      <Box display="flex">
        <div>
          <Box display="flex">
            <CalendarTodayIcon />
            <Box mr={1} />
            <Typography>
              {new Date(props.schedule.start_date_time).toLocaleDateString(
                "en-us"
              )}
            </Typography>
          </Box>
          <Box mt={1} />
          <Box display="flex">
            <ScheduleIcon />
            <Box mr={1} />
            <Typography>
              {new Date(props.schedule.start_date_time).toLocaleTimeString(
                "en-us"
              )}
            </Typography>
          </Box>
          <Box mt={1} />
          <Box display="flex">
            <VideoLabelIcon />
            <Box mr={1} />
            <Typography>{props.schedule.screen}</Typography>
          </Box>
        </div>
        <Box flexGrow={1} />
        <Box display="flex" alignItems="center">
          <IconButton
            onClick={() =>
              history.push(`/schedules/${props.schedule.id}/select-seats`)
            }
          >
            <LaunchIcon />
          </IconButton>
        </Box>
      </Box>
    </Card>
  );
};

export default ScheduleCard;
