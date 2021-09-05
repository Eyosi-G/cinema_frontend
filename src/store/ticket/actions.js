import * as types from "./types";
export const fetchTickets = (page, limit, date) => ({
  type: types.FETCH_TICKETS_ASYNC,
  payload: {
    page,
    limit,
    date,
  },
});
export const resetFetchTickets = () => ({
  type: types.FETCH_TICKETS_RESET,
});

export const getTicket = (code) => ({
  type: types.GET_TICKET_BY_CODE_ASYNC,
  payload: code,
});
export const resetGetTicket = () => ({
  type: types.GET_TICKET_BY_CODE_RESET,
});

export const approveTicket = (id) => ({
  type: types.APPROVE_TICKET_ASYNC,
  payload: id,
});
export const resetApproveTicket = () => ({
  type: types.APPROVE_TICKET_RESET,
});
