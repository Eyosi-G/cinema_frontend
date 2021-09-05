import * as types from "./types";
export const fetchUsers = (page, limit, name) => ({
  type: types.FETCH_USERS_ASYNC,
  payload: {
    page,
    limit,
    name,
  },
});
export const createUser = (username, roles, password) => ({
  type: types.CREATE_USER_ASYNC,
  payload: {
    username,
    roles,
    password,
  },
});
export const resetCreateUser = () => ({
  type: types.CREATE_USER_RESET,
});
export const deleteUser = (id) => ({
  type: types.DELETE_USER_ASYNC,
  payload: id,
});
export const resetDeleteUser = () => ({
  type: types.DELETE_USER_RESET,
});

export const editUser = (id, roles) => ({
  type: types.EDIT_USER_ASYNC,
  payload: { id, roles },
});
export const resetEditUser = () => ({
  type: types.EDIT_USER_RESET,
});
