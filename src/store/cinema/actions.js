import * as types from "./types";
export const createCinema = (cinema) => ({
  type: types.CREATE_CINEMA_ASYNC,
  payload: cinema,
});
export const resetCreateCinema = () => ({
  type: types.CREATE_CINEMA_RESET,
});

export const fetchCinemas = (name, page, limit) => ({
  type: types.FETCH_CINEMAS_ASYNC,
  payload: {
    name,
    page,
    limit,
  },
});

export const deleteCinema = (id) => ({
  type: types.DELETE_CINEMA_ASYNC,
  payload: id,
});

export const resetDeleteCinema = () => ({
  type: types.DELETE_CINEMA_RESET,
});

export const fetchSingleCinema = (id) => ({
  type: types.FETCH_SINGLE_CINEMA_ASYNC,
  payload: id,
});

export const resetFetchSingleCinema = () => ({
  type: types.FETCH_SINGLE_CINEMA_RESET,
});

export const editCinema = (cinema) => ({
  type: types.EDIT_CINEMA_ASYNC,
  payload: cinema,
});

export const resetEditCinema = () => ({
  type: types.EDIT_CINEMA_RESET,
});
