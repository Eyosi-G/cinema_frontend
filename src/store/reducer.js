import { combineReducers } from "redux";
import genreReducer from "./genre/reducers";
import movieReducer from "./movie/reducer";
import cinemaReducer from "./cinema/reducer";
import scheduleReducer from "./schedule/reducer";
import authReducer from './auth/reducer'
import dashboardReducer from "./dashboard/reducer";
import ticketReducer from "./ticket/reducer";
const reducer = combineReducers({
    movie: movieReducer,
    genre: genreReducer,
    cinema: cinemaReducer,
    schedule: scheduleReducer,
    auth: authReducer,
    dashboard: dashboardReducer,
    ticket: ticketReducer
});

export default reducer;
