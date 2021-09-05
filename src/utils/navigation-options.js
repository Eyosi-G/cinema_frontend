import DashboardIcon from "@material-ui/icons/Dashboard";
import TheatersIcon from "@material-ui/icons/Theaters";
import MovieIcon from "@material-ui/icons/Movie";
import ScheduleIcon from "@material-ui/icons/Schedule";
import BubbleChartIcon from "@material-ui/icons/BubbleChart";
import SettingsIcon from "@material-ui/icons/Settings";
import GroupIcon from "@material-ui/icons/Group";
import roles from "./constants/roles";
import ConfirmationNumberIcon from "@material-ui/icons/ConfirmationNumber";
const drawerOptions = [
  {
    text: "Dashboard",
    icon: <DashboardIcon color="primary" />,
    link: "/dashboard",
    roles: [roles.admin],
  },
  {
    text: "Cinemas",
    icon: <TheatersIcon color="primary" />,
    link: "/cinemas",
    roles: [roles.admin],
  },
  {
    text: "Movies",
    icon: <MovieIcon color="primary" />,
    link: "/movies",
    roles: [roles.admin],
  },
  {
    text: "Schedules",
    icon: <ScheduleIcon color="primary" />,
    link: "/schedules",
    roles: [roles.admin],
  },
  {
    text: "Users",
    icon: <GroupIcon color="primary" />,
    link: "/users",
    roles: [roles.admin],
  },
  {
    text: "Booking Reports",
    icon: <BubbleChartIcon color="primary" />,
    link: "/booking-reports",
    roles: [roles.admin],
  },
  {
    text: "Tickets",
    icon: <ConfirmationNumberIcon color="primary" />,
    link: "/tickets",
    roles: [roles.ticketer],
  },
  {
    text: "Settings",
    icon: <SettingsIcon color="primary" />,
    link: "/settings",
    roles: [roles.admin, roles.ticketer],
  },
];

export default drawerOptions;
