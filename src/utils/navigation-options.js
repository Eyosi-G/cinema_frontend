import DashboardIcon from "@material-ui/icons/Dashboard";
import TheatersIcon from "@material-ui/icons/Theaters";
import MovieIcon from "@material-ui/icons/Movie";
import ScheduleIcon from "@material-ui/icons/Schedule";
import BubbleChartIcon from "@material-ui/icons/BubbleChart";
import SettingsIcon from "@material-ui/icons/Settings";
import { Category } from "@material-ui/icons";

const drawerOptions = [
  {
    text: "Dashboard",
    icon: <DashboardIcon color="primary" />,
    link: "/dashboard",
  },
  {
    text: "Cinemas",
    icon: <TheatersIcon color="primary" />,
    link: "/cinemas",
  },
  {
    text: "Movies",
    icon: <MovieIcon color="primary" />,
    link: "/movies",
  },
  {
    text: "Schedules",
    icon: <ScheduleIcon color="primary" />,
    link: "/schedules",
  },
  {
    text: "Booking Reports",
    icon: <BubbleChartIcon color="primary" />,
    link: "/booking-reports",
  },
  {
    text: "Settings",
    icon: <SettingsIcon color="primary" />,
    link: "/settings",
  },
];

export default drawerOptions;
