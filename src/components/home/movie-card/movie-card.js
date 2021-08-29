import {
  Box,
  Button,
  Card,
  CardMedia,
  makeStyles,
  Typography,
} from "@material-ui/core";
import ArrowForwardIcon from "@material-ui/icons/ArrowForward";
import React from "react";
import { useHistory } from "react-router-dom";
import config from "../../../config";

const useStyles = makeStyles((theme) => ({
  cover: {
    height: "100%",
    objectFit: "cover",
  },
  card: {
    display: "flex",
    height: "240px",
    padding: theme.spacing(1),
    margin: "2px",
  },
  container: {
    flexBasis: "33%",
    flexGrow: 1,
  },
  title: {
    fontWeight: "900",
    fontSize: "14px",
  },
  content: {
    color: "#616161",
    fontSize: "12px",
    textOverflow: "ellipsis",
    overflow: "hidden",
    maxHeight: "50px",
  },
  info: {
    display: "flex",
    flexDirection: "column",
    flexWrap: "wrap",
    flexGrow: 1,
  },
  button: {},
}));
const MovieCard = (props) => {
  const classes = useStyles();
  const history = useHistory();
  return (
    <div className={classes.container}>
      <Card className={classes.card} variant="outlined">
        <div>
          <img
            className={classes.cover}
            src={`${config.baseURL}/images/${props.movie.cover_image}`}
          />
        </div>
        <Box mr={1} />
        <div className={classes.info}>
          <Typography className={classes.title}>{props.movie.title}</Typography>
          <Box my={1}>
            <Typography className={classes.title}>Genres</Typography>
            <Typography className={classes.content}>
              {props.movie.genres.toString()}
            </Typography>
          </Box>
          <Box my={1}>
            <Typography className={classes.title}>Synopsis</Typography>
            <Typography
              className={classes.content}
              style={{ textAlign: "justify" }}
            >
              {props.movie.summary}
            </Typography>
          </Box>
          <Box flexGrow={1} />
          <Box display="flex" justifyContent="flex-end">
            {props.loadMore && (
              <Button
                size="small"
                className={classes.button}
                endIcon={<ArrowForwardIcon />}
                onClick={() => history.push(`/movies/${props.movie.id}/detail`)}
              >
                learn more
              </Button>
            )}
          </Box>
        </div>
      </Card>
    </div>
  );
};

export default MovieCard;
