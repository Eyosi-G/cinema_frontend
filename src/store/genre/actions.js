import * as types from "./types";
export const fetchGenres = (page, limit) => ({
  type: types.FETCH_GENRES_ASYNC,
  payload: {
    page,
    limit,
  },
});

export const deleteGenre = (id) => ({
  type: types.DELETE_GENRES_ASYNC,
  payload: id,
});

export const resetDeletedGenre = () => ({
  type: types.DELETE_GENRES_RESET,
});

export const createGenre = (name) => ({
  type: types.CREATE_GENRE_ASYNC,
  payload: name,
});

export const resetCreateGenre = () => ({
  type: types.CREATE_GENRE_RESET,
});
