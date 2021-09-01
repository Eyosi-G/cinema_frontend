import * as types from "./types";
import { call, put, all, takeLatest } from "redux-saga/effects";
import config from "../../config";
import axios from "axios";

function* fetchTicketsSaga(action) {
  try {
    yield put({
      type: types.FETCH_TICKETS_STARTED,
    });
    const { page, limit, date } = action.payload;
    const response = yield axios.get(
      `${config.baseURL}/tickets?page=${page}&limit=${limit}&date=${date}`
    );
    yield put({
      type: types.FETCH_TICKETS_SUCCESS,
      payload: response.data,
    });
  } catch (error) {
    yield put({
      type: types.FETCH_TICKETS_FAILURE,
      paylaod: "fetching tickets failed!",
    });
  }
}
function* watchFetchTickets() {
  yield takeLatest(types.FETCH_TICKETS_ASYNC, fetchTicketsSaga);
}
function* ticketSaga() {
  yield all([call(watchFetchTickets)]);
}

export default ticketSaga;
