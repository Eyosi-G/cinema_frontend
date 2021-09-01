import Navigation from "./components/navigation/navigation";
import {
  BrowserRouter as Router,
  Redirect,
  Route,
  Switch,
} from "react-router-dom";
import Movies from "./components/movie/movies/movies";
import Dashboard from "./components/dashboard/dashboard";
import Cinemas from "./components/cinema/cinemas/cinemas";
import CinemaForm from "./components/cinema/cinema-form/cinema-form";
import MovieForm from "./components/movie/movie-form/movie-form";
import Schedules from "./components/schedule/schedules/schedules";
import ScheduleForm from "./components/schedule/schedule-form/schedule-form";
import Settings from "./components/settings/settings";
import Home from "./components/home/home";
import ConsumerNavigation from "./components/consumer-navigation/consumer-navigation";
import MovieDetail from "./components/movie/movie-detail/movie-detail";
import SelectSeat from "./components/select-seat/select-seat";
import Checkout from "./components/checkout/checkout";
import Search from "./components/search/search";
import Genres from "./components/genres/genres";
import SignIn from "./components/auth/login";
import ProtectedRoute from "./components/protected-route/protected-route";
import roles from "./utils/constants/roles";
import config from "./config";
import PageNotFound from "./components/404/404";
import BookingReports from "./components/booking-reports/booking-reports";
const RootApp = () => {
  const jsonData = localStorage.getItem(config.authStorage);
  if (jsonData == undefined) {
    return <Redirect to="/home" />;
  }
  return <Redirect to="/dashboard" />;
};

const App = () => {
  return (
    <Router>
      <Switch>
        <Route exact path="/">
          <RootApp />
        </Route>
        <Route exact path="/login">
          <SignIn />
        </Route>
        <Route exact path="/home">
          <ConsumerNavigation>
            <Home />
          </ConsumerNavigation>
        </Route>
        <Route exact path="/movies/:id/detail">
          <ConsumerNavigation>
            <MovieDetail />
          </ConsumerNavigation>
        </Route>
        <Route exact path="/schedules/:id/select-seats">
          <ConsumerNavigation>
            <SelectSeat />
          </ConsumerNavigation>
        </Route>
        <Route exact path="/checkouts">
          <ConsumerNavigation>
            <Checkout />
          </ConsumerNavigation>
        </Route>
        <Route exact path="/search">
          <ConsumerNavigation>
            <Search />
          </ConsumerNavigation>
        </Route>
        <ProtectedRoute roles={[roles.admin]} exact path="/dashboard">
          <Navigation>
            <Dashboard />
          </Navigation>
        </ProtectedRoute>
        <ProtectedRoute roles={[roles.admin]} exact path="/cinemas">
          <Navigation>
            <Cinemas />
          </Navigation>
        </ProtectedRoute>
        <ProtectedRoute roles={[roles.admin]} exact path="/cinemas/new">
          <Navigation>
            <CinemaForm />
          </Navigation>
        </ProtectedRoute>
        <ProtectedRoute roles={[roles.admin]} exact path="/cinemas/:id/edit">
          <Navigation>
            <CinemaForm edit />
          </Navigation>
        </ProtectedRoute>
        <ProtectedRoute roles={[roles.admin]} exact path="/movies">
          <Navigation>
            <Movies />
          </Navigation>
        </ProtectedRoute>
        <ProtectedRoute roles={[roles.admin]} exact path="/movies/new">
          <Navigation>
            <MovieForm />
          </Navigation>
        </ProtectedRoute>
        <ProtectedRoute roles={[roles.admin]} exact path="/movies/:id/edit">
          <Navigation>
            <MovieForm edit />
          </Navigation>
        </ProtectedRoute>
        <ProtectedRoute roles={[roles.admin]} exact path="/schedules/">
          <Navigation>
            <Schedules />
          </Navigation>
        </ProtectedRoute>
        <ProtectedRoute roles={[roles.admin]} exact path="/schedules/new">
          <Navigation>
            <ScheduleForm />
          </Navigation>
        </ProtectedRoute>
        <ProtectedRoute roles={[roles.admin]} exact path="/schedules/:id/edit">
          <Navigation>
            <ScheduleForm edit />
          </Navigation>
        </ProtectedRoute>
        <ProtectedRoute roles={[roles.admin]} exact path="/settings">
          <Navigation>
            <Settings />
          </Navigation>
        </ProtectedRoute>
        <ProtectedRoute roles={[roles.admin]} exact path="/booking-reports">
          <Navigation>
            <BookingReports />
          </Navigation>
        </ProtectedRoute>
        <Route path="/404" component={PageNotFound} />
        <Redirect from="*" to="/404" />
      </Switch>
    </Router>
  );
};

export default App;
