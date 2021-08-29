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
import ChevronLeftIcon from "@material-ui/icons/ChevronLeft";
import ChevronRightIcon from "@material-ui/icons/ChevronRight";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import navigationStyles from "./navigation-styles";
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
} from "@material-ui/core";
import ExitToAppIcon from "@material-ui/icons/ExitToApp";
import config from "../../config";

const Navigation = (props) => {
  const classes = navigationStyles();
  const theme = useTheme();
  const [open, setOpen] = React.useState(false);
  const history = useHistory()

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
        position="fixed"
        className={clsx(classes.appBar, {
          [classes.appBarShift]: open,
        })}
      >
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={handleDrawerOpen}
            edge="start"
            className={clsx(classes.menuButton, open && classes.hide)}
          >
            <MenuIcon />
          </IconButton>
          <Box flexGrow="1" />
          <Button
            style={{ color: "white" }}
            startIcon={<ExitToAppIcon style={{ fill: "white" }} />}
            onClick={()=>{
              localStorage.removeItem(config.authStorage)
              history.push('/')
            }}
          >
            logout
          </Button>
        </Toolbar>
      </AppBar>
      <Drawer
        className={classes.drawer}
        variant="persistent"
        anchor="left"
        open={open}
        classes={{
          paper: classes.drawerPaper,
        }}
      >
        <div className={classes.drawerHeader}>
          <IconButton onClick={handleDrawerClose}>
            {theme.direction === "ltr" ? (
              <ChevronLeftIcon />
            ) : (
              <ChevronRightIcon />
            )}
          </IconButton>
        </div>
        <Divider />
        <List>
          {drawerOptions.map((option, index) => (
            <ListItem button key={index}>
              <ListItemIcon>{option.icon}</ListItemIcon>
              <Link component={RouterLink} to={option.link}>
                <ListItemText primary={option.text} />
              </Link>
            </ListItem>
          ))}
        </List>
      </Drawer>
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

export default Navigation;
