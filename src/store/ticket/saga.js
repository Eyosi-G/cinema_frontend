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
    const storageResponse = yield call(
      [localStorage, localStorage.getItem],
      config.authStorage
    );
    const storageData = JSON.parse(storageResponse);
    const response = yield axios.get(
      `${config.baseURL}/tickets?page=${page}&limit=${limit}&date=${date}`,
      {
        headers:{
          authorization: storageData.token
        }
      }
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
function* handleGetTicketByCode(action) {
  try {
    yield put({
      type: types.GET_TICKET_BY_CODE_STARTED,
    });
    const code = action.payload;
    const storageResponse = yield call(
      [localStorage, localStorage.getItem],
      config.authStorage
    );
    const storageData = JSON.parse(storageResponse);
    const response = yield axios.post(
      `${config.baseURL}/tickets`,
      { code },
      {
        headers: {
          authorization: storageData.token,
        },
      }
    );
    yield put({
      type: types.GET_TICKET_BY_CODE_SUCCESS,
      payload: response.data,
    });
  } catch (error) {
    yield put({
      type: types.GET_TICKET_BY_CODE_FAILURE,
      paylaod: "fetching ticket failed!",
    });
  }
}
function* handleApproveTicket(action) {
  try {
    yield put({
      type: types.APPROVE_TICKET_STARTED,
    });
    const id = action.payload;
    const storageResponse = yield call(
      [localStorage, localStorage.getItem],
      config.authStorage
    );
    const storageData = JSON.parse(storageResponse);
    console.log(storageData);
    const response = yield axios.patch(
      `${config.baseURL}/tickets/${id}/approve`,
      {},
      {
        headers: {
          authorization: storageData.token,
        },
      }
    );
    yield put({
      type: types.APPROVE_TICKET_SUCCESS,
      payload: response.data,
    });
  } catch (error) {
    yield put({
      type: types.APPROVE_TICKET_FAILURE,
      paylaod: "approving ticket failed!",
    });
  }
}
function* watchApproveTicket() {
  yield takeLatest(types.APPROVE_TICKET_ASYNC, handleApproveTicket);
}
function* watchGetTicketByCode() {
  yield takeLatest(types.GET_TICKET_BY_CODE_ASYNC, handleGetTicketByCode);
}
function* watchFetchTickets() {
  yield takeLatest(types.FETCH_TICKETS_ASYNC, fetchTicketsSaga);
}
function* ticketSaga() {
  yield all([
    call(watchFetchTickets),
    call(watchGetTicketByCode),
    call(watchApproveTicket),
  ]);
}

export default ticketSaga;
