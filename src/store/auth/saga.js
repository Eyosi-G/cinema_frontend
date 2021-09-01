import { all, call, takeLatest, delay, put } from "redux-saga/effects";
import config from "../../config";
import * as types from "./types";
import axios from "axios";
function* handleAttemptLogin(action) {
  try {
    yield put({
      type: types.LOGIN_ATTEMPT,
    });
    const response = yield axios.post(
      `${config.baseURL}/login`,
      action.payload,
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    yield call(
      [localStorage, localStorage.setItem],
      config.authStorage,
      JSON.stringify(response.data)
    );
    yield put({
      type: types.LOGIN_SUCCESS,
      payload: response.data,
    });
  } catch (error) {
    yield put({
      type: types.LOGIN_FAILURE,
      payload: "failed to signin",
    });
  }
}

function* handlePasswordChange(action) {
  try {
    yield put({
      type: types.CHANGE_PASSWORD_ATTEMPT,
    });
    const storageResponse = yield call(
      [localStorage, localStorage.getItem],
      config.authStorage
    );
    const storageData = JSON.parse(storageResponse);
    yield axios.patch(
      `${config.baseURL}/password`,
      action.payload,
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: storageData.token,
        },
      }
    );
    yield put({
      type: types.CHANGE_PASSWORD_SUCCESS,
      payload: "password changed successfully !"
    });
  } catch (error) {
    yield put({
      type: types.CHANGE_PASSWORD_FAILURE,
      payload: "failed to change password",
    });
  }
}

function* watchPasswordChange() {
  yield takeLatest(types.CHANGE_PASSWORD_ASYNC, handlePasswordChange);
}

function* watchLogin() {
  yield takeLatest(types.LOGIN_ASYNC, handleAttemptLogin);
}
function* authSaga() {
  yield all([call(watchLogin), call(watchPasswordChange)]);
}

export default authSaga;
