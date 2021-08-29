import * as types from "./types";

export const createMovie = (movie) => ({
  type: types.CREATE_MOVIE_ASYNC,
  payload: movie,
});
export const resetCreateMovie = () => ({
  type: types.CREATE_MOVIE_RESET,
});

export const fetchMovies = (name, page, limit) => ({
  type: types.FETCH_MOVIES_ASYNC,
  payload: {
    name,
    page,
    limit,
  },
});
export const resetFetchMovies = () => ({
  type: types.FETCH_MOVIES_RESET,
});

export const fetchMovie = (id) => ({
  type: types.FETCH_MOVIE_ASYNC,
  payload: id,
});

export const deleteMovie = (id) => ({
  type: types.DELETE_MOVIE_ASYNC,
  payload: id,
});
export const resetDeletedMovie = () => ({
  type: types.DELETE_MOVIE_RESET,
});

export const editMovie = (movie) => ({
  type: types.EDIT_MOVIE_ASYNC,
  payload: movie,
});
export const resetEditMovie = () => ({
  type: types.EDIT_MOVIE_RESET,
});

export const fetchNowWatchingMovies = (page, limit) => ({
  type: types.FETCH_NOW_WATCHING_ASYNC,
  payload: {
    page,
    limit,
  },
});
export const resetNowWatchingMovies = () => ({
  type: types.FETCH_NOW_WATCHING_RESET,
});

export const fetchMovieDetail = (id) => ({
  type: types.MOVIE_DETAIL_ASYNC,
  payload: id,
});

export const fetchCommingSoonMovies = (page, limit) => ({
  type: types.FETCH_COMMING_SOON_ASYNC,
  payload: {
    page,
    limit,
  },
});

export const resetFetchCommingSoonMovies = () => ({
  type: types.FETCH_COMMING_SOON_RESET,
});
