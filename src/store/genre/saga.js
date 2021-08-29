import { all, call, put, takeLatest } from "redux-saga/effects";
import * as types from "./types";
import axios from "axios";
import config from "../../config";
function* handleFetchGenres(action) {
  try {
    const { page, limit } = action.payload;
    const response = yield axios.get(
      `${config.baseURL}/genres?page=${page}&limit=${limit}`
    );
    yield put({
      type: types.FETCH_GENRES_SUCCESS,
      payload: response.data,
    });
  } catch (error) {
    yield put({
      type: types.FETCH_GENRES_FAILURE,
      payload: "fetching genres failed",
    });
  }
}

function* handleDeleteGenre(action) {
  try {
    const id = action.payload;
    yield axios.delete(`${config.baseURL}/genres/${id}`);
    yield put({
      type: types.DELETE_GENRES_SUCCESS,
      payload: id,
    });
  } catch (error) {
    yield put({
      type: types.DELETE_GENRES_FAILURE,
      payload: "delete genre failed !",
    });
  }
}

function* handleCreateGenre(action) {
  try {
    const name = action.payload;
    yield axios.post(`${config.baseURL}/genres`,{name});
    yield put({
      type: types.CREATE_GENRE_SUCCESS,
    });
  } catch (error) {
    yield put({
      type: types.CREATE_GENRE_FAILURE,
      payload: "create genre failed !",
    });
  }
}

function* watchCreateGenre() {
  yield takeLatest(types.CREATE_GENRE_ASYNC, handleCreateGenre);
}
function* watchDeleteGenre() {
  yield takeLatest(types.DELETE_GENRES_ASYNC, handleDeleteGenre);
}
function* watchFetchGenres() {
  yield takeLatest(types.FETCH_GENRES_ASYNC, handleFetchGenres);
}
function* genreSaga() {
  yield all([
    call(watchFetchGenres),
    call(watchDeleteGenre),
    call(watchCreateGenre),
  ]);
}

export default genreSaga;
