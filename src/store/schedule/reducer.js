import * as types from "./types";
const initialState = {
  newSchedule: {
    success: null,
    loading: false,
    error: null,
  },
  deletedSchedule: {
    success: null,
    error: null,
  },
  editedSchedule: {
    success: null,
    loading: false,
    error: null,
  },
  schedulesList: {
    size: 0,
    schedules: [],
    loading: false,
    error: null,
  },
  scheduleDetail: {
    data: null,
    loading: false,
    error: null,
  },
  reservedSeats: {
    loading: false,
    success: false,
    error: null,
  },
  checkout: {
    data: {
      movie: {
        title: "",
        language: "",
      },
      checkout: {
        start_date: "",
        seats: [],
      },
      scheduleDate: "",
      screen: "",
      totalPrice: "",
    },
    loading: false,
    error: null,
  },
  paymentInfo: {
    loading: false,
    error: null,
    data: null,
  },
  canceledReservation: {
    success: false,
  },
};
const scheduleReducer = (state = initialState, action) => {
  switch (action.type) {
    case types.CREATE_SCHEDULE_STARTED: {
      return {
        ...state,
        newSchedule: {
          success: null,
          loading: true,
          error: null,
        },
      };
    }
    case types.CREATE_SCHEDULE_SUCCESS: {
      return {
        ...state,
        newSchedule: {
          success: action.payload,
          loading: false,
          error: null,
        },
      };
    }
    case types.CREATE_SCHEDULE_FAILURE: {
      return {
        ...state,
        newSchedule: {
          success: null,
          loading: false,
          error: action.payload,
        },
      };
    }
    case types.CREATE_SCHEDULE_RESET: {
      return {
        ...state,
        newSchedule: {
          success: null,
          loading: false,
          error: null,
        },
      };
    }
    case types.FETCH_SCHEDULES_LOADING: {
      return {
        ...state,
        schedulesList: {
          schedules: [],
          loading: true,
          error: null,
          size: 0,
        },
      };
    }
    case types.FETCH_SCHEDULES_SUCCESS: {
      const { schedules, size } = action.payload;
      return {
        ...state,
        schedulesList: {
          schedules: schedules,
          loading: false,
          error: null,
          size: size,
        },
      };
    }
    case types.FETCH_SCHEDULES_FAILURE: {
      return {
        ...state,
        schedulesList: {
          schedules: [],
          loading: false,
          error: action.payload,
          size: 0,
        },
      };
    }
    case types.FETCH_SCHEDULES_RESET: {
      return {
        ...state,
        schedulesList: {
          schedules: [],
          loading: false,
          error: null,
          size: 0,
        },
      };
    }
    case types.FETCH_DETAIL_SCHEDULE_SUCCESS: {
      return {
        ...state,
        scheduleDetail: {
          data: action.payload,
          loading: false,
          error: null,
        },
      };
    }
    case types.FETCH_DETAIL_SCHEDULE_LOADING: {
      return {
        ...state,
        scheduleDetail: {
          data: state.scheduleDetail.data,
          loading: true,
          error: null,
        },
      };
    }
    case types.FETCH_DETAIL_SCHEDULE_FAILURE: {
      return {
        ...state,
        scheduleDetail: {
          data: state.scheduleDetail.data,
          loading: false,
          error: action.payload,
        },
      };
    }
    case types.RESERVE_SEATS_LOADING: {
      return {
        ...state,
        reservedSeats: {
          loading: true,
          success: false,
          error: null,
        },
      };
    }
    case types.RESERVE_SEATS_SUCCESS: {
      return {
        ...state,
        reservedSeats: {
          loading: false,
          success: true,
          error: null,
        },
      };
    }
    case types.RESERVE_SEATS_RESET: {
      return {
        ...state,
        reservedSeats: {
          loading: false,
          success: false,
          error: null,
        },
      };
    }
    case types.RESERVE_SEATS_FAILURE: {
      return {
        ...state,
        reservedSeats: {
          loading: false,
          success: false,
          error: action.payload,
        },
      };
    }
    case types.FETCH_CHECKOUT_LOADING: {
      return {
        ...state,
        checkout: {
          ...state.checkout,
          loading: true,
          error: null,
        },
      };
    }
    case types.FETCH_CHECKOUT_SUCCESS: {
      return {
        ...state,
        checkout: {
          data: action.payload,
          loading: false,
          error: null,
        },
      };
    }
    case types.FETCH_CHECKOUT_FAILURE: {
      return {
        ...state,
        checkout: {
          ...state.checkout,
          loading: false,
          error: action.payload,
        },
      };
    }
    case types.SUBMIT_PAYMENT_INFO_SUCCESS: {
      const { code } = action.payload;
      return {
        ...state,
        paymentInfo: {
          loading: false,
          error: null,
          data: code,
        },
      };
    }
    case types.SUBMIT_PAYMENT_INFO_LOADING: {
      return {
        ...state,
        paymentInfo: {
          loading: true,
          error: null,
          data: null,
        },
      };
    }
    case types.SUBMIT_PAYMENT_INFO_FAILURE: {
      return {
        ...state,
        paymentInfo: {
          loading: false,
          error: action.payload,
          data: null,
        },
      };
    }
    case types.SUBMIT_PAYMENT_INFO_RESET: {
      return {
        ...state,
        paymentInfo: {
          loading: false,
          error: null,
          data: null,
        },
      };
    }
    case types.DELETE_SCHEDULE_SUCCESS: {
      const id = action.payload;
      const filteredSchedules = state.schedulesList.schedules.filter(
        (schedule) => schedule.id !== id
      );
      return {
        ...state,
        deletedSchedule: {
          success: "schedule deleted successfully !",
          error: null,
        },
        schedulesList: {
          size: state.schedulesList.size - 1,
          schedules: filteredSchedules,
          loading: false,
          error: null,
        },
      };
    }
    case types.DELETE_SCHEDULE_FAILURE: {
      return {
        ...state,
        deletedSchedule: {
          success: null,
          error: action.payload,
        },
      };
    }
    case types.DELETE_SCHEDULE_RESET: {
      return {
        ...state,
        deletedSchedule: {
          success: null,
          error: null,
        },
      };
    }
    case types.EDIT_SCHEDULE_STARTED: {
      return {
        ...state,
        editedSchedule: {
          success: null,
          loading: true,
          error: null,
        },
      };
    }
    case types.EDIT_SCHEDULE_SUCCESS: {
      return {
        ...state,
        editedSchedule: {
          success: action.payload,
          loading: false,
          error: null,
        },
      };
    }
    case types.EDIT_SCHEDULE_FAILURE: {
      return {
        ...state,
        editedSchedule: {
          success: null,
          loading: false,
          error: action.payload,
        },
      };
    }
    case types.EDIT_SCHEDULE_RESET: {
      return {
        ...state,
        editedSchedule: {
          success: null,
          loading: false,
          error: null,
        },
      };
    }
    case types.CANCEL_RESERVATION_SUCCESS: {
      return {
        ...state,
        canceledReservation: {
          success: true,
        },
      };
    }
    case types.CANCEL_RESERVATION_RESET: {
      return {
        ...state,
        canceledReservation: {
          success: false,
        },
      };
    }
  }
  return state;
};

export default scheduleReducer;
