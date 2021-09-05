import * as types from "./types";
const initialState = {
  usersList: {
    users: [],
    size: 0,
    error: null,
    loading: false,
  },
  newUser: {
    user: null,
    loading: false,
    error: null,
  },
  deletedUser: {
    user: null,
    error: null,
  },
  editedUser: {
    user: null,
    loading: false,
    error: null,
  },
};
const userReducer = (state = initialState, action) => {
  switch (action.type) {
    case types.FETCH_USERS_SUCCESS: {
      const { users, size } = action.payload;
      return {
        ...state,
        usersList: {
          users: users,
          size: size,
          error: null,
          loading: false,
        },
      };
    }
    case types.FETCH_USERS_STARTED: {
      return {
        ...state,
        usersList: {
          users: [],
          size: 0,
          error: null,
          loading: true,
        },
      };
    }
    case types.FETCH_USERS_FAILURE: {
      return {
        ...state,
        usersList: {
          users: [],
          size: 0,
          error: action.payload,
          loading: false,
        },
      };
    }
    case types.CREATE_USER_STARTED: {
      return {
        ...state,
        newUser: {
          user: null,
          loading: true,
          error: null,
        },
      };
    }
    case types.CREATE_USER_SUCCESS: {
      const user = action.payload;
      return {
        ...state,
        newUser: {
          user: user,
          loading: false,
          error: null,
        },
        usersList: {
          ...state.usersList,
          users: [...state.usersList.users, user],
          size: state.usersList.size + 1,
        },
      };
    }
    case types.CREATE_USER_FAILURE: {
      return {
        ...state,
        newUser: {
          user: null,
          loading: false,
          error: action.payload,
        },
      };
    }
    case types.CREATE_USER_RESET: {
      return {
        ...state,
        newUser: {
          user: null,
          loading: false,
          error: null,
        },
      };
    }
    case types.DELETE_USER_SUCCESS: {
      const _user = action.payload;
      const users = state.usersList.users.filter((user) => user.id != _user.id);
      return {
        ...state,
        deletedUser: {
          user: _user,
          error: null,
        },
        usersList: {
          ...state.usersList,
          users: users,
          size: state.usersList.size - 1,
        },
      };
    }
    case types.DELETE_USER_FAILURE: {
      return {
        ...state,
        deletedUser: {
          user: null,
          error: action.payload,
        },
      };
    }
    case types.DELETE_USER_RESET: {
      return {
        ...state,
        deletedUser: {
          user: null,
          error: null,
        },
      };
    }
    case types.EDIT_USER_STARTED: {
      return {
        ...state,
        editedUser: {
          user: null,
          loading: true,
          error: null,
        },
      };
    }
    case types.EDIT_USER_SUCCESS: {
      const user = action.payload;
      const users = state.usersList.users.map((_user) => {
        if (_user.id == user.id) return user;
        return _user;
      });
      return {
        ...state,
        editedUser: {
          user: user,
          loading: false,
          error: null,
        },
        usersList: {
          ...state.usersList,
          users: users,
        },
      };
    }
    case types.EDIT_USER_FAILURE: {
      return {
        ...state,
        editedUser: {
          user: null,
          loading: false,
          error: action.paylaod,
        },
      };
    }
    case types.EDIT_USER_RESET: {
      return {
        ...state,
        editedUser: {
          user: null,
          loading: false,
          error: null,
        },
      };
    }
  }
  return state;
};

export default userReducer;
