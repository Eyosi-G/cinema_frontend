import * as types from "./types";
const initialState = {
  ticketsList: {
    tickets: [],
    size: 0,
    total: 0,
    loading: false,
    error: null,
  },
  getTicket: {
    ticket: null,
    loading: false,
    error: null,
  },
  approvedTicket: {
    ticket: null,
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
    case types.GET_TICKET_BY_CODE_STARTED: {
      return {
        ...state,
        getTicket: {
          ticket: null,
          loading: true,
          error: null,
        },
      };
    }
    case types.GET_TICKET_BY_CODE_SUCCESS: {
      console.log(action.payload);
      return {
        ...state,
        getTicket: {
          ticket: action.payload,
          loading: false,
          error: null,
        },
      };
    }
    case types.GET_TICKET_BY_CODE_FAILURE: {
      return {
        ...state,
        getTicket: {
          ticket: null,
          loading: false,
          error: action.payload,
        },
      };
    }
    case types.APPROVE_TICKET_STARTED: {
      return {
        ...state,
        approvedTicket: {
          ticket: null,
          loading: true,
          error: null,
        },
      };
    }
    case types.APPROVE_TICKET_SUCCESS: {
      const ticket = action.payload;
      return {
        ...state,
        approvedTicket: {
          ticket: ticket,
          loading: false,
          error: null,
        },
        getTicket: {
          ...state.getTicket,
          ticket: ticket,
        },
      };
    }
    case types.APPROVE_TICKET_FAILURE: {
      return {
        ...state,
        approvedTicket: {
          ticket: null,
          loading: false,
          error: action.payload,
        },
      };
    }
    case types.APPROVE_TICKET_RESET: {
      return {
        ...state,
        approvedTicket: {
          ticket: null,
          loading: false,
          error: null,
        },
      };
    }
  }
  return state;
};

export default ticketReducer;
