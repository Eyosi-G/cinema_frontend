import * as types from "./types";
const initialState = {
  login: {
    isLoading: false,
    data: null,
    error: null,
  },
  changePassword: {
    isLoading: false,
    error: null,
    success:false
  },
};
const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case types.LOGIN_ATTEMPT: {
      return {
        ...state,
        login: {
          isLoading: true,
          error: null,
          data: null,
        },
      };
    }
    case types.LOGIN_SUCCESS: {
      console.log('here')
      return {
        ...state,
        login: {
          isLoading: false,
          error: null,
          data: action.payload,
        },
      };
    }
    case types.RESET_LOGIN:{
      return {
        ...state,
        login: {
          isLoading: false,
          error: null,
          data: null,
        },
      };
    }
    case types.LOGIN_FAILURE: {
      return {
        ...state,
        login: {
          isLoading: false,
          error: action.payload,
          data: null,
        },
      };
    }
    case types.CHANGE_PASSWORD_ATTEMPT:{
      return {
        ...state,
        changePassword:{
          isLoading: true,
          error:null,
          success:false
        }
      }
    }
    case types.CHANGE_PASSWORD_SUCCESS:{
      return {
        ...state,
        changePassword:{
          isLoading: false,
          error:null,
          success:true
        }
      }
    }
    case types.CHANGE_PASSWORD_FAILURE:{
      return {
        ...state,
        changePassword:{
          isLoading: false,
          error:action.payload,
          success:false
        }
      }
    }
    case types.CHANGE_PASSWORD_RESET:{
      return {
        ...state,
        changePassword:{
          isLoading: false,
          error:null,
          success:false
        }
      }
    }
  }
  return state;
};

export default authReducer;
