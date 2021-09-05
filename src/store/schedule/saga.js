import { all } from "@redux-saga/core/effects";
import axios from "axios";
import { call, put, takeLatest } from "redux-saga/effects";
import config from "../../config";
import * as types from "./types";

function* handleFetchSchedules(action) {
  try {
    const { page, limit } = action.payload;
    
    yield put({
      type: types.FETCH_SCHEDULES_LOADING,
    });
    const storageResponse = yield call(
      [localStorage, localStorage.getItem],
      config.authStorage
    );
    const storageData = JSON.parse(storageResponse);
    const response = yield axios.get(
      `${config.baseURL}/schedules?page=${page}&limit=${limit}`,
      {
        headers:{
          authorization: storageData.token
        }
      }
    );
    yield put({
      type: types.FETCH_SCHEDULES_SUCCESS,
      payload: response.data,
    });
  } catch (error) {
    yield put({
      type: types.FETCH_SCHEDULES_FAILURE,
      payload: "fetching schedules failed!",
    });
  }
}

function* handleDeleteSchedule(action) {
  try {
    const id = action.payload;
    const storageResponse = yield call(
      [localStorage, localStorage.getItem],
      config.authStorage
    );
    const storageData = JSON.parse(storageResponse);
    axios.delete(`${config.baseURL}/schedules/${id}`,{
      headers:{
        authorization: storageData.token
      }
    });
    yield put({
      type: types.DELETE_SCHEDULE_SUCCESS,
      payload: id,
    });
  } catch (error) {
    yield put({
      type: types.DELETE_SCHEDULE_FAILURE,
      payload: "deleting schedule failed",
    });
  }
}

function* handleCreateSchedule(action) {
  try {
    yield put({
      type: types.CREATE_SCHEDULE_STARTED,
    });
    const storageResponse = yield call(
      [localStorage, localStorage.getItem],
      config.authStorage
    );
    const storageData = JSON.parse(storageResponse);
    yield axios.post(`${config.baseURL}/schedules`, action.payload,{
      headers:{
        authorization: storageData.token
      }
    });
    yield put({
      type: types.CREATE_SCHEDULE_SUCCESS,
      payload: "Successfuly schedule created!",
    });
  } catch (error) {
    yield put({
      type: types.CREATE_SCHEDULE_FAILURE,
      payload: "Creating schedule failed!",
    });
  }
}
function* handleFetchDetailSchedule(action) {
  try {
    yield put({
      type: types.FETCH_DETAIL_SCHEDULE_LOADING,
    });
    const id = action.payload;
    const response = yield axios.get(`${config.baseURL}/schedules/${id}`);
    yield put({
      type: types.FETCH_DETAIL_SCHEDULE_SUCCESS,
      payload: response.data,
    });
  } catch (error) {
    yield put({
      type: types.FETCH_DETAIL_SCHEDULE_FAILURE,
      payload: "fetching schedule failed!",
    });
  }
}
function* handleReserveSeats(action) {
  try {
    const { scheduleId, selectedSeats } = action.payload;
    yield put({
      type: types.RESERVE_SEATS_LOADING,
    });
    const response = yield axios.put(
      `${config.baseURL}/schedules/${scheduleId}/checkout`,
      selectedSeats
    );
    const token = response.data.token;
    yield call(
      [localStorage, localStorage.setItem],
      config.storage,
      JSON.stringify({ token: token })
    );
    yield put({
      type: types.RESERVE_SEATS_SUCCESS,
    });
  } catch (error) {
    yield put({
      type: types.RESERVE_SEATS_FAILURE,
      payload: "reserve seats failed",
    });
  }
}

function* handleFetchCheckouts(action) {
  try {
    yield put({
      type: types.FETCH_CHECKOUT_LOADING,
    });
    const dataStorage = yield call(
      [localStorage, localStorage.getItem],
      config.storage
    );
    const token = JSON.parse(dataStorage).token;
    const response = yield axios.get(`${config.baseURL}/checkouts`, {
      headers: {
        authorization: token,
      },
    });
    yield put({
      type: types.FETCH_CHECKOUT_SUCCESS,
      payload: response.data,
    });
  } catch (error) {
    yield put({
      type: types.FETCH_CHECKOUT_FAILURE,
      payload: "fetching seats failed",
    });
  }
}
function* handleSubmitPaymentInfo(action) {
  try {
    const { email } = action.payload;
    yield put({
      type: types.SUBMIT_PAYMENT_INFO_LOADING,
    });
    const dataStorage = yield call(
      [localStorage, localStorage.getItem],
      config.storage
    );
    const token = JSON.parse(dataStorage).token;
    const response = yield axios.post(
      `${config.baseURL}/invoices`,
      {
        email,
      },
      {
        headers: {
          authorization: token,
        },
      }
    );
    yield put({
      type: types.SUBMIT_PAYMENT_INFO_SUCCESS,
      payload: response.data,
    });
  } catch (error) {
    yield put({
      type: types.SUBMIT_PAYMENT_INFO_FAILURE,
      payload: "checkout failed",
    });
  }
}
function* handleEditSchedule(action) {
  try {
    yield put({
      type: types.EDIT_SCHEDULE_STARTED,
    });
    const storageResponse = yield call(
      [localStorage, localStorage.getItem],
      config.authStorage
    );
    const storageData = JSON.parse(storageResponse);
    yield axios.put(`${config.baseURL}/schedules`, action.payload,{
      headers:{
        authorization: storageData.token
      }
    });
    yield put({
      type: types.EDIT_SCHEDULE_SUCCESS,
      payload: "schedule successfully edited!",
    });
  } catch (error) {
    yield put({
      type: types.EDIT_SCHEDULE_FAILURE,
      payload: "editing schedule failed! ",
    });
  }
}
function* handleCancelReservation(action) {
  try {
    const dataStorage = yield call(
      [localStorage, localStorage.getItem],
      config.storage
    );
    const token = JSON.parse(dataStorage).token;
    yield axios.delete(`${config.baseURL}/schedules/reservation/cancel`, {
      headers: {
        authorization: token,
      },
    });
    yield call([localStorage, localStorage.removeItem], config.storage);
    yield put({
      type: types.CANCEL_RESERVATION_SUCCESS,
    });
  } catch (error) {}
}

function* watchCancelReservation() {
  yield takeLatest(types.CANCEL_RESERVATION_ASYNC, handleCancelReservation);
}
function* watchDeleteSchedule() {
  yield takeLatest(types.DELETE_SCHEDULE_ASYNC, handleDeleteSchedule);
}

function* watchSubmitPaymentInfo() {
  yield takeLatest(types.SUBMIT_PAYMENT_INFO_ASYNC, handleSubmitPaymentInfo);
}
function* watchFetchCheckouts() {
  yield takeLatest(types.FETCH_CHECKOUT_ASYNC, handleFetchCheckouts);
}
function* watchReserveSeats() {
  yield takeLatest(types.RESERVE_SEATS_ASYNC, handleReserveSeats);
}
function* watchFetchDetailSchedule() {
  yield takeLatest(
    types.FETCH_DETAIL_SCHEDULE_ASYNC,
    handleFetchDetailSchedule
  );
}
function* watchFetchSchedules() {
  yield takeLatest(types.FETCH_SCHEDULES_ASYNC, handleFetchSchedules);
}
function* watchCreateSchedule() {
  yield takeLatest(types.CREATE_SCHEDULE_ASYNC, handleCreateSchedule);
}
function* watchEditSchedule() {
  yield takeLatest(types.EDIT_SCHEDULE_ASYNC, handleEditSchedule);
}
function* scheduleSaga() {
  yield all([
    call(watchCreateSchedule),
    call(watchFetchSchedules),
    call(watchFetchDetailSchedule),
    call(watchReserveSeats),
    call(watchFetchCheckouts),
    call(watchSubmitPaymentInfo),
    call(watchDeleteSchedule),
    call(watchEditSchedule),
    call(watchCancelReservation),
  ]);
}

export default scheduleSaga;
