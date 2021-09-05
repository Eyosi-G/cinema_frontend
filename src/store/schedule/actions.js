import * as types from "./types";
export const createSchedule = (schedule) => ({
  type: types.CREATE_SCHEDULE_ASYNC,
  payload: schedule,
});
export const resetCreateSchedule = () => ({
  type: types.CREATE_SCHEDULE_RESET,
});

export const deleteSchedule = (id) => ({
  type: types.DELETE_SCHEDULE_ASYNC,
  payload: id,
});
export const resetDeleteSchedule = () => ({
  type: types.DELETE_SCHEDULE_RESET,
});

export const fetchSchedules = (page, limit) => ({
  type: types.FETCH_SCHEDULES_ASYNC,
  payload: {
    page,
    limit,
  },
});

export const resetFetchSchedules = () => ({
  type: types.FETCH_SCHEDULES_RESET,
});

export const fetchDetailSchedule = (id) => ({
  type: types.FETCH_DETAIL_SCHEDULE_ASYNC,
  payload: id,
});

export const resetFetchDetailSchedule = () => ({
  type: types.FETCH_DETAIL_SCHEDULE_RESET,
});

export const reserveSeats = (scheduleId, selectedSeats) => ({
  type: types.RESERVE_SEATS_ASYNC,
  payload: {
    scheduleId,
    selectedSeats,
  },
});
export const resetReserveSeats = () => ({
  type: types.RESERVE_SEATS_RESET,
});

export const fetchCheckout = () => ({
  type: types.FETCH_CHECKOUT_ASYNC,
});

export const submitPaymentInfo = (email) => ({
  type: types.SUBMIT_PAYMENT_INFO_ASYNC,
  payload: {
    email,
  },
});

export const resetSubmitPaymentInfo = () => ({
  type: types.SUBMIT_PAYMENT_INFO_RESET,
});

export const editSchedule = (schedule) => ({
  type: types.EDIT_SCHEDULE_ASYNC,
  payload: schedule,
});
export const resetEditSchedule = () => ({
  type: types.EDIT_SCHEDULE_RESET,
});

export const cancelReservation = () => ({
  type: types.CANCEL_RESERVATION_ASYNC,
});
export const resetCancelReservation = () => ({
  type: types.CANCEL_RESERVATION_RESET,
});
