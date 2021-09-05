import { all, call } from "redux-saga/effects";
import genreSaga from "./genre/saga";
import movieSaga from "./movie/saga";
import cinemaSaga from "./cinema/saga";
import scheduleSaga from "./schedule/saga";
import authSaga from "./auth/saga";
import dashboardSaga from "./dashboard/saga";
import ticketSaga from "./ticket/saga";
import userSaga from "./user/saga";
function* rootSaga() {
  yield all([
    call(movieSaga),
    call(genreSaga),
    call(cinemaSaga),
    call(scheduleSaga),
    call(authSaga),
    call(dashboardSaga),
    call(ticketSaga),
    call(userSaga),
  ]);
}
export default rootSaga;
