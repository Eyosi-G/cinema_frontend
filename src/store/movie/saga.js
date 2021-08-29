import axios from "axios";
import { all, call, delay, put, takeLatest } from "redux-saga/effects";
import config from "../../config";
import * as types from "./types";

function* handleEditMovie(action) {
  try {
    yield put({
      type: types.EDIT_MOVIE_STARED,
    });
    const {
      title,
      genres,
      casts,
      duration,
      release_date,
      language,
      cover_image,
      summary,
      movieId,
      comming_soon,
    } = action.payload;
    const formData = new FormData();
    formData.append("title", title);
    formData.append("duration", duration);
    formData.append("release_date", release_date);
    formData.append("cover_image", cover_image);
    formData.append("summary", summary);
    formData.append("language", language);
    formData.append("movieId", movieId);
    formData.append("comming_soon", comming_soon);
    genres.forEach((genre) => {
      formData.append("genres", genre);
    });
    casts.forEach((cast) => {
      formData.append("casts", cast);
    });

    yield axios.put(`${config.baseURL}/movies`, formData);
    yield put({
      type: types.EDIT_MOVIE_SUCCESS,
      payload: "Movie edited successfully !",
    });
  } catch (e) {
    console.log(e);
    yield put({
      type: types.EDIT_MOVIE_FAILURE,
      payload: "Editing Movie Failed !",
    });
  }
}

function* handleDeleteMovie(action) {
  try {
    const id = action.payload;
    yield axios.delete(`${config.baseURL}/movies/${id}`);
    yield put({
      type: types.DELETE_MOVIE_SUCCESS,
      payload: id,
    });
  } catch (error) {
    yield put({
      type: types.DELETE_MOVIE_FAILURE,
      payload: "deleting movie failed",
    });
  }
}
function* handleFetchMovie(action) {
  try {
    yield put({
      type: types.FETCH_MOVIE_STARTED,
    });
    const id = action.payload;
    const response = yield axios.get(`${config.baseURL}/movies/${id}`);
    yield put({
      type: types.FETCH_MOVIE_SUCCESS,
      payload: response.data,
    });
  } catch (error) {
    yield put({
      type: types.FETCH_MOVIE_FAILURE,
      payload: "fetching movie failed",
    });
  }
}

function* handleFetchMovies(action) {
  try {
    yield put({
      type: types.FETCH_MOVIES_STARTED,
    });
    const { name, limit, page } = action.payload;
    const response = yield axios.get(
      `${config.baseURL}/movies?page=${page}&limit=${limit}&name=${name}`
    );
    yield put({
      type: types.FETCH_MOVIES_SUCCESS,
      payload: response.data,
    });
  } catch (error) {
    yield put({
      type: types.FETCH_MOVIES_FAILURE,
      payload: "fetching movies failed",
    });
  }
}

function* handleCreateMovie(action) {
  try {
    yield put({
      type: types.CREATE_MOVIE_STARTED,
    });
    const {
      title,
      genres,
      casts,
      duration,
      release_date,
      language,
      cover_image,
      summary,
      comming_soon,
    } = action.payload;
    const formData = new FormData();
    formData.append("title", title);
    formData.append("duration", duration);
    formData.append("release_date", release_date);
    formData.append("cover_image", cover_image);
    formData.append("summary", summary);
    formData.append("language", language);
    formData.append("comming_soon", comming_soon);
    genres.forEach((genre) => {
      formData.append("genres", genre);
    });
    casts.forEach((cast) => {
      formData.append("casts", cast);
    });
    yield axios.post(`${config.baseURL}/movies`, formData);
    yield put({
      type: types.CREATE_MOVIE_SUCCESS,
    });
  } catch (e) {
    console.log(e);
    yield put({
      type: types.CREATE_MOVIE_FAILURE,
      payload: "Creating Movie Failed !",
    });
  }
}

function* handleFetchNowWatchingMovies(action) {
  try {
    yield put({
      type: types.FETCH_NOW_WATCHING_LOADING,
    });
    const { limit, page } = action.payload;
    const response = yield axios.get(
      `${config.baseURL}/schedules/movies/now-watching?page=${page}&limit=${limit}`
    );
    yield put({
      type: types.FETCH_NOW_WATCHING_SUCCESS,
      payload: response.data,
    });
  } catch (error) {
    yield put({
      type: types.FETCH_NOW_WATCHING_FAILURE,
      payload: "fetching movies failed",
    });
  }
}
function* handleFetchMovieDetail(action) {
  try {
    yield put({
      type: types.MOVIE_DETAIL_LOADING,
    });
    const id = action.payload;
    const response = yield axios.get(`${config.baseURL}/movies/${id}/detail`);
    yield put({
      type: types.MOVIE_DETAIL_SUCCESS,
      payload: response.data,
    });
  } catch (error) {
    yield put({
      type: types.MOVIE_DETAIL_FAILURE,
      payload: "Loading movie failed!",
    });
  }
}

function* handleFetchCommingSoonMovies(action) {
  try {
    yield put({
      type: types.FETCH_COMMING_SOON_LOADING,
    });
    const { limit, page } = action.payload;
    const response = yield axios.get(
      `${config.baseURL}/movies?page=${page}&limit=${limit}&released=true`
    );
    yield put({
      type: types.FETCH_COMMING_SOON_SUCCESS,
      payload: response.data,
    });
  } catch (error) {
    yield put({
      type: types.FETCH_COMMING_SOON_FAILURE,
      payload: "fetching movies failed",
    });
  }
}

function* watchEditMovie() {
  yield takeLatest(types.EDIT_MOVIE_ASYNC, handleEditMovie);
}
function* watchDeleteMovie() {
  yield takeLatest(types.DELETE_MOVIE_ASYNC, handleDeleteMovie);
}
function* watchFetchMovie() {
  yield takeLatest(types.FETCH_MOVIE_ASYNC, handleFetchMovie);
}
function* watchFetchMovies() {
  yield takeLatest(types.FETCH_MOVIES_ASYNC, handleFetchMovies);
}
function* watchCreateMovie() {
  yield takeLatest(types.CREATE_MOVIE_ASYNC, handleCreateMovie);
}
function* watchFetchNowWatchingMovies() {
  yield takeLatest(
    types.FETCH_NOW_WATCHING_ASYNC,
    handleFetchNowWatchingMovies
  );
}
function* watchFetchMovieDetail() {
  yield takeLatest(types.MOVIE_DETAIL_ASYNC, handleFetchMovieDetail);
}
function* watchFetchCommingSoonMovies() {
  yield takeLatest(
    types.FETCH_COMMING_SOON_ASYNC,
    handleFetchCommingSoonMovies
  );
}
function* movieSaga() {
  yield all([
    call(watchCreateMovie),
    call(watchFetchMovies),
    call(watchFetchMovie),
    call(watchDeleteMovie),
    call(watchEditMovie),
    call(watchFetchNowWatchingMovies),
    call(watchFetchMovieDetail),
    call(watchFetchCommingSoonMovies),
  ]);
}
export default movieSaga;
