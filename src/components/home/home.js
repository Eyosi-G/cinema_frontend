import {
  Box,
  Button,
  Container,
  Grid,
  makeStyles,
  Typography,
} from "@material-ui/core";
import React, { useEffect, useState } from "react";
import ContactUs from "../contact-us/contact-us";
import Footer from "../footer/footer";
import MovieCard from "./movie-card/movie-card";
import { connect } from "react-redux";
import * as moviesActions from "../../store/movie/actions";

const useStyles = makeStyles((theme) => ({
  title: {
    fontWeight: "bold",
  },
  container: {
    height: "500px",
    display: "flex",
    flexDirection: "column",
  },
  footer: {
    marginTop: "auto",
  },
}));
const Home = (props) => {
  const classes = useStyles();
  const [nowWatchingPage, setNowWatchingPage] = useState(0);
  const [commingSoonPage, setCommingSoonPage] = useState(0);
  const limit = 10;

  useEffect(() => {
    props.fetchNowWatchingMovies(nowWatchingPage, limit);
  }, [nowWatchingPage]);
  useEffect(() => {
    props.fetchCommingSoonMovies(commingSoonPage, limit);
  }, [commingSoonPage]);

  useEffect(() => {
    return () => {
      props.resetNowWatchingMovies();
      props.resetFetchCommingSoonMovies();
    };
  }, []);
  const nowWatchingLoadingMore = () => {
    setNowWatchingPage(nowWatchingPage + 1);
  };
  const commingSoonLoadMore = () => {
    setCommingSoonPage(commingSoonPage + 1);
  };
  return (
    <div className={classes.container}>
      <Container>
        <div>
          <Typography className={classes.title}>Now Watching</Typography>
          <Box mb={1} />
          {props.nowWatching.loading && (
            <Box display="flex" justifyContent="center" mt={2} mb={2}>
              loading
            </Box>
          )}
          <Box display="flex" flexWrap="wrap">
            {props.nowWatching.movies.map((movie) => {
              return <MovieCard movie={movie} key={movie.id} loadMore />;
            })}
          </Box>
          {props.nowWatching.size > 0 && (
            <Button onClick={nowWatchingLoadingMore}>Load More</Button>
          )}
          <Box mb={4} />
          <Typography className={classes.title}>Comming Soon</Typography>
          <Box mb={1} />
          {props.commingSoon.loading && (
            <Box display="flex" justifyContent="center" mt={2} mb={2}>
              loading
            </Box>
          )}
          <Box display="flex" flexWrap="wrap">
            {props.commingSoon.movies.map((movie) => {
              return <MovieCard movie={movie} key={movie.id} />;
            })}
          </Box>
          {props.commingSoon.size > 0 && (
            <Button onClick={commingSoonLoadMore}>Load More</Button>
          )}
          <Box mt={2} />
          <ContactUs />
          <Box mt={2} />
          <div className={classes.footer}>
            <Footer />
            <Box mt={2} />
          </div>
        </div>
      </Container>
    </div>
  );
};
const mapStateToProps = (state) => {
  return {
    nowWatching: state.movie.nowWatching,
    commingSoon: state.movie.commingSoon,
  };
};
const mapDispatchToProps = (dispatch) => {
  return {
    fetchNowWatchingMovies: (page, limit) =>
      dispatch(moviesActions.fetchNowWatchingMovies(page, limit)),
    resetNowWatchingMovies: () =>
      dispatch(moviesActions.resetNowWatchingMovies()),
    fetchCommingSoonMovies: (page, limit) =>
      dispatch(moviesActions.fetchCommingSoonMovies(page, limit)),
    resetFetchCommingSoonMovies: () =>
      dispatch(moviesActions.resetFetchCommingSoonMovies()),
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(Home);
