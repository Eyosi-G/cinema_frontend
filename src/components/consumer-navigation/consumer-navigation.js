import React from "react";
import clsx from "clsx";
import { useTheme } from "@material-ui/core/styles";
import Drawer from "@material-ui/core/Drawer";
import CssBaseline from "@material-ui/core/CssBaseline";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import List from "@material-ui/core/List";
import Divider from "@material-ui/core/Divider";
import IconButton from "@material-ui/core/IconButton";
import MenuIcon from "@material-ui/icons/Menu";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import drawerOptions from "../../utils/navigation-options";
import Link from "@material-ui/core/Link";
import { Link as RouterLink, useHistory } from "react-router-dom";
import {
  Avatar,
  Box,
  Breadcrumbs,
  Button,
  Menu,
  MenuItem,
  Typography,
} from "@material-ui/core";
import SearchIcon from "@material-ui/icons/Search";
import HomeIcon from "@material-ui/icons/Home";
import ContactMailIcon from "@material-ui/icons/ContactMail";
import { makeStyles } from "@material-ui/core/styles";
import ChevronLeftIcon from "@material-ui/icons/ChevronLeft";
import ChevronRightIcon from "@material-ui/icons/ChevronRight";
import logo from "../../assets/images/logo.png";
const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
  },
  appBar: {
    transition: theme.transitions.create(["margin", "width"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    backgroundColor: "white",
    // color: "white",
  },
  appBarShift: {
    transition: theme.transitions.create(["margin", "width"], {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  menuButton: {
    marginRight: theme.spacing(2),
    [theme.breakpoints.up("md")]: {
      display: "none",
    },
  },
  hide: {
    display: "none",
  },
  drawer: {
    width: 240,
    flexShrink: 0,
  },
  drawerPaper: {
    width: 240,
  },
  drawerHeader: {
    display: "flex",
    alignItems: "center",
    padding: theme.spacing(0, 1),
    // necessary for content to be below app bar
    ...theme.mixins.toolbar,
    justifyContent: "flex-end",
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(3),
    transition: theme.transitions.create("margin", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
  },
  contentShift: {
    transition: theme.transitions.create("margin", {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
    marginLeft: 0,
    merginRight: 0,
  },
}));

const ConsumerNavigation = (props) => {
  const classes = useStyles();
  const theme = useTheme();
  const history = useHistory();
  const [open, setOpen] = React.useState(false);

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  return (
    <div className={classes.root}>
      <CssBaseline />
      <AppBar
        elevation="0"
        position="fixed"
        className={clsx(classes.appBar, {
          [classes.appBarShift]: open,
        })}
      >
        <Toolbar>
          <Box flexGrow={1} />

          <img
            src={logo}
            height="60px"
            style={{ objectFit: "cover", fill: "white" }}
            onClick={() => history.push("/home")}
          />
        </Toolbar>
      </AppBar>

      <main
        className={clsx(classes.content, {
          [classes.contentShift]: open,
        })}
      >
        <div className={classes.drawerHeader} />
        {props.children}
      </main>
    </div>
  );
};

export default ConsumerNavigation;
