import { createTheme } from "@material-ui/core/styles";
import { orange, amber } from "@material-ui/core/colors";

const theme = createTheme({
  palette: {
    primary: {
      main: "#000000",
    },
    secondary:amber
  },
  typography: {
    button: {
      textTransform: "none",
      color:amber
    },
    fontFamily: "'IBM Plex Sans Arabic', sans-serif;",
  },
});

export default theme;
