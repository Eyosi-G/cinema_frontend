import { Box, makeStyles, TextField } from "@material-ui/core";
import React from "react";
import SearchIcon from "@material-ui/icons/Search";
import Footer from "../footer/footer";

const useStyle = makeStyles((theme) => ({
  container: {
    height: "500px",
    display: "flex",
    flexDirection: "column",
  },
  footer: {
    marginTop: "auto",
  },
}));

const Search = () => {
  const classes = useStyle();
  return (
    <div>
      <div className={classes.container}>
        <TextField
          label="movie title"
          variant="outlined"
          margin="dense"
          fullWidth
          InputProps={{
            endAdornment: <SearchIcon />,
          }}
        />
        <Box>
          <TextField
            type="number"
            variant="outlined"
            margin="dense"
            InputProps={{
              inputProps: {
                max: 1999,
                min: 2099,
              },
            }}
            label="Year"
          />
          <Box mr={2} />
        </Box>
        <div className={classes.footer}>
          <Footer />
          <Box mb={2} />
        </div>
      </div>
    </div>
  );
};

export default Search;
