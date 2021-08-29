import axios from "axios";
import { all, call, put, takeLatest } from "redux-saga/effects";
import config from "../../config";
import * as types from "./types";
function* handleFetchDashBoard(action) {
  try {
    yield put({
      type: types.FETCH_DASHBOARD_STARTED,
    });
    const response = yield axios.get(`${config.baseURL}/dashboard`);
    yield put({
      type: types.FETCH_DASHBOARD_SUCCESS,
      payload: response.data,
    });
  } catch (error) {
    yield put({
      type: types.FETCH_DASHBOARD_FAILURE,
      payload: "Fetch dashoard failed",
    });
  }
}
function* watchFetchDashBoard() {
  yield takeLatest(types.FETCH_DASHBOARD_ASYNC, handleFetchDashBoard);
}
function* dashboardSaga() {
  yield all([call(watchFetchDashBoard)]);
}
export default dashboardSaga;
