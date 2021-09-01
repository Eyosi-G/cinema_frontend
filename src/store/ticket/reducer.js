import * as types from "./types";
const initialState = {
  ticketsList: {
    tickets: [],
    size: 0,
    total: 0,
    loading: false,
    error: null,
  },
};

const ticketReducer = (state = initialState, action) => {
  switch (action.type) {
    case types.FETCH_TICKETS_SUCCESS: {
      const { totalPrice, tickets, size } = action.payload;
      return {
        ...state,
        ticketsList: {
          tickets: tickets,
          size: size,
          total: totalPrice,
          loading: false,
          error: null,
        },
      };
    }
    case types.FETCH_TICKETS_STARTED: {
      return {
        ...state,
        ticketsList: {
          tickets: [],
          size: 0,
          total: 0,
          loading: true,
          error: null,
        },
      };
    }
    case types.FETCH_TICKETS_FAILURE: {
      return {
        ...state,
        ticketsList: {
          tickets: [],
          size: 0,
          total: 0,
          loading: false,
          error: action.payload,
        },
      };
    }
  }
  return state;
};

export default ticketReducer;
