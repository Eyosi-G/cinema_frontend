import axios from "axios";
import { all, call, put, takeLatest } from "redux-saga/effects";
import config from "../../config";
import * as types from "./types";

function* handleCreateCinema(action) {
  try {
    yield put({
      type: types.CREATE_CINEMA_ATTEMPT,
    });
    const storageResponse = yield call(
      [localStorage, localStorage.getItem],
      config.authStorage
    );
    const storageData = JSON.parse(storageResponse);
    yield axios.post(`${config.baseURL}/cinemas`, action.payload, {
      headers:{
        authorization: storageData.token
      }
    });
    yield put({
      type: types.CREATE_CINEMA_SUCCESS,
      payload: "cinema created successfully !",
    });
  } catch (error) {
    yield put({
      type: types.CREATE_CINEMA_FAILURE,
      payload: "creating cinema failed !",
    });
  }
}

function* handleFetchCinemas(action) {
  try {
    yield put({
      type: types.FETCH_CINEMAS_LOADING,
    });
    const storageResponse = yield call(
      [localStorage, localStorage.getItem],
      config.authStorage
    );
    const storageData = JSON.parse(storageResponse);
    const { page, limit, name } = action.payload;
    const response = yield axios.get(
      `${config.baseURL}/cinemas?page=${page}&limit=${limit}&name=${name}`,{
        headers:{
          authorization:storageData.token
        }
      },
    );
    yield put({
      type: types.FETCH_CINEMAS_SUCCESS,
      payload: response.data,
    });
  } catch (error) {
    yield put({
      type: types.FETCH_CINEMAS_FAILURE,
      payload: "Fetching cinemas failed ",
    });
  }
}

function* handleDeleteCinema(action) {
  try {
    const id = action.payload;
    const storageResponse = yield call(
      [localStorage, localStorage.getItem],
      config.authStorage
    );
    const storageData = JSON.parse(storageResponse);
    axios.delete(`${config.baseURL}/cinemas/${id}`,{
      headers:{
         authorization: storageData.token
      }
    });
    yield put({
      type: types.DELETE_CINEMA_SUCCESS,
      payload: id,
    });
  } catch (error) {
    yield put({
      type: types.DELETE_CINEMA_SUCCESS,
      payload: "deleting cinema failed ",
    });
  }
}

function* handleFetchSingleCinema(action) {
  try {
    yield put({
      type: types.FETCH_SINGLE_CINEMA_STARTED,
    });
    const id = action.payload;
    const storageResponse = yield call(
      [localStorage, localStorage.getItem],
      config.authStorage
    );
    const storageData = JSON.parse(storageResponse);
    const response = yield axios.get(`${config.baseURL}/cinemas/${id}`,{
      headers:{
        authorization: storageData.token
      }
    });
    yield put({
      type: types.FETCH_SINGLE_CINEMA_SUCCESS,
      payload: response.data,
    });
  } catch (error) {
    yield put({
      type: types.FETCH_SINGLE_CINEMA_FAILURE,
      payload: "deleting cinema failed ",
    });
  }
}
function* handleEditCinema(action) {
  try {
    yield put({
      type: types.EDIT_CINEMA_STARTED,
    });
    const storageResponse = yield call(
      [localStorage, localStorage.getItem],
      config.authStorage
    );
    const storageData = JSON.parse(storageResponse);
    yield axios.put(`${config.baseURL}/cinemas`, action.payload,{
      headers:{
        authorization: storageData.token
      }
    });
    yield put({
      type: types.EDIT_CINEMA_SUCCESS,
      payload: "cinema edited successfully !",
    });
  } catch (error) {
    yield put({
      type: types.EDIT_CINEMA_FAILURE,
      payload: "editing cinema failed !",
    });
  }
}

function* watchFetchSingleCinema() {
  yield takeLatest(types.FETCH_SINGLE_CINEMA_ASYNC, handleFetchSingleCinema);
}
function* watchDeleteCinema() {
  yield takeLatest(types.DELETE_CINEMA_ASYNC, handleDeleteCinema);
}
function* watchFetchCinemas() {
  yield takeLatest(types.FETCH_CINEMAS_ASYNC, handleFetchCinemas);
}
function* watchCreateCinema() {
  yield takeLatest(types.CREATE_CINEMA_ASYNC, handleCreateCinema);
}
function* watchEditCinema() {
  yield takeLatest(types.EDIT_CINEMA_ASYNC, handleEditCinema);
}
function* cinemaSaga() {
  yield all([
    call(watchCreateCinema),
    call(watchFetchCinemas),
    call(watchDeleteCinema),
    call(watchFetchSingleCinema),
    call(watchEditCinema),
  ]);
}

export default cinemaSaga;
