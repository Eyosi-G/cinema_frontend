import * as types from "./types";
const initialState = {
  dashboard: {
    datas: {
      cinemas: 0,
      bookings: 0,
      movies: 0,
    },
    loading: false,
    error: null,
  },
};
const dashboardReducer = (state = initialState, action) => {
  switch (action.type) {
    case types.FETCH_DASHBOARD_SUCCESS: {
      return {
        ...state,
        dashboard: {
          datas: action.payload,
          loading: false,
          error: null,
        },
      };
    }
    case types.FETCH_DASHBOARD_STARTED: {
      return {
        ...state,
        dashboard: {
          datas: state.dashboard.datas,
          loading: true,
          error: null,
        },
      };
    }
    case types.FETCH_DASHBOARD_FAILURE: {
      return {
        ...state,
        dashboard: {
          datas: state.dashboard.datas,
          loading: false,
          error: action.payload,
        },
      };
    }
  }
  return state;
};
export default dashboardReducer;
