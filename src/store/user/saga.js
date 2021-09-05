import * as types from "./types";
import { all, put, takeLatest, call } from "redux-saga/effects";
import axios from "axios";
import config from "../../config";
function* handleFetchUsers(action) {
  try {
    yield put({
      type: types.FETCH_USERS_STARTED,
    });
    const storageResponse = yield call(
      [localStorage, localStorage.getItem],
      config.authStorage
    );
    const storageData = JSON.parse(storageResponse);
    const { page, limit, name } = action.payload;
    const response = yield axios.get(
      `${config.baseURL}/users?page=${page}&limit=${limit}&name=${name}`,
      {
        headers: {
          authorization: storageData.token,
        },
      }
    );
    yield put({
      type: types.FETCH_USERS_SUCCESS,
      payload: response.data,
    });
  } catch (error) {
    yield put({
      type: types.FETCH_USERS_FAILURE,
      payload: "fetching users failed!",
    });
  }
}
function* handleCreateUser(action) {
  try {
    yield put({
      type: types.CREATE_USER_STARTED,
    });
    const storageResponse = yield call(
      [localStorage, localStorage.getItem],
      config.authStorage
    );
    const storageData = JSON.parse(storageResponse);
    const { username, password, roles } = action.payload;
    const response = yield axios.post(
      `${config.baseURL}/users`,
      {
        username,
        password,
        roles,
      },
      {
        headers: {
          authorization: storageData.token,
        },
      }
    );
    yield put({
      type: types.CREATE_USER_SUCCESS,
      payload: response.data,
    });
  } catch (error) {
    yield put({
      type: types.CREATE_USER_FAILURE,
      payload: "creating users failed!",
    });
  }
}

function* handleDeleteUser(action) {
  try {
    const id = action.payload;
    const storageResponse = yield call(
      [localStorage, localStorage.getItem],
      config.authStorage
    );
    const storageData = JSON.parse(storageResponse);
    const response = yield axios.delete(`${config.baseURL}/users/${id}`, {
      headers: {
        authorization: storageData.token,
      },
    });
    yield put({
      type: types.DELETE_USER_SUCCESS,
      payload: response.data,
    });
  } catch (error) {
    yield put({
      type: types.DELETE_USER_FAILURE,
      payload: "deleting users failed!",
    });
  }
}
function* handleEditUser(action) {
  try {
    yield put({
      type: types.EDIT_USER_STARTED,
    });
    const { id, roles } = action.payload;
    const storageResponse = yield call(
      [localStorage, localStorage.getItem],
      config.authStorage
    );
    const storageData = JSON.parse(storageResponse);
    const response = yield axios.patch(
      `${config.baseURL}/users/${id}/roles`,
      roles,
      {
        headers: {
          authorization: storageData.token,
        },
      }
    );
    yield put({
      type: types.EDIT_USER_SUCCESS,
      payload: response.data,
    });
  } catch (error) {
    yield put({
      type: types.EDIT_USER_FAILURE,
      payload: "changing roles failed!",
    });
  }
}
function* watchEditUser() {
  yield takeLatest(types.EDIT_USER_ASYNC, handleEditUser);
}
function* watchDeleteUser() {
  yield takeLatest(types.DELETE_USER_ASYNC, handleDeleteUser);
}
function* watchCreateUser() {
  yield takeLatest(types.CREATE_USER_ASYNC, handleCreateUser);
}
function* watchFetchUsers() {
  yield takeLatest(types.FETCH_USERS_ASYNC, handleFetchUsers);
}
function* userSaga() {
  yield all([
    call(watchFetchUsers),
    call(watchCreateUser),
    call(watchDeleteUser),
    call(watchEditUser),
  ]);
}
export default userSaga;
