import {
  Box,
  Breadcrumbs,
  Button,
  Card,
  Chip,
  FormControl,
  makeStyles,
  TextField,
  InputAdornment,
  Snackbar,
  Dialog,
  DialogContent,
  CircularProgress,
  IconButton,
  Typography,
  Link,
  FormControlLabel,
  Switch
} from "@material-ui/core";
import React, { useEffect, useRef, useState } from "react";
import AddAPhotoIcon from "@material-ui/icons/AddAPhoto";
import ImagePreview from "../../image-preview/image-preview";
import AddIcon from "@material-ui/icons/Add";
import { Alert } from "@material-ui/lab";
import { useFormik } from "formik";
import { connect } from "react-redux";
import * as movieActions from "../../../store/movie/actions";
import { useHistory, useParams } from "react-router-dom";
import config from "../../../config";
import Confirm from "../../confirm/confirm";
import { Link as RouterLink } from "react-router-dom";

const useStyles = makeStyles((theme) => ({
  card: {
    padding: theme.spacing(2),
  },
  formControl: {
    marginTop: theme.spacing(1),
  },
  chips: {
    display: "flex",
    flexWrap: "wrap",
  },
  chip: {
    marginLeft: 2,
    marginRight: 2,
  },
}));

const MovieForm = (props) => {
  const classes = useStyles();
  const imgRef = useRef(null);
  const history = useHistory();
  const params = useParams();
  const [confirmDialog, setConfirmDialog] = useState({
    open: false,
  });
  useEffect(() => {
    if (props.edit) {
      const id = params.id;
      props.fetchMovie(id);
    }
  }, []);

  useEffect(() => {
    if (props.createMovie.success) {
      formik.setValues({
        title: "",
        release_date: new Date().toLocaleDateString("en-CA"),
        summary: "",
        duration: "",
        language: "",
        cover_image: null,
        casts: [],
        genres: [],
        comming_soon: false
      });
      formik.setTouched({});
    }
  }, [props.createMovie.success]);

  const fillOutMovies = async () => {
    if (props.edit && props.movie.data) {
      const { cover_image } = props.movie.data;
      const response = await fetch(`${config.baseURL}/images/${cover_image}`);
      const blob = await response.blob();
      const image = new File([blob], cover_image);
      formik.setValues({
        ...props.movie.data,
        release_date: new Date(
          props.movie.data.release_date
        ).toLocaleDateString("en-CA"),
        cover_image: image,
      });
    }
  };
  useEffect(() => {
    fillOutMovies();
  }, [props.movie]);

  const formik = useFormik({
    initialValues: {
      title: "",
      release_date: new Date().toLocaleDateString("en-CA"),
      summary: "",
      language: "",
      duration: "",
      cover_image: null,
      casts: [],
      genres: [],
      genre: "",
      cast: "",
      comming_soon:false
    },
    onSubmit: (values) => {
      const movie = {
        ...values,
      };
      delete movie.cast;
      delete movie.genre;
      if (props.edit) {
        setConfirmDialog({
          open: true,
          title: "Are you sure ?",
          message: "Are you sure you want to edit this movie ?",
          onConfirm: () => {
            movie.movieId = props.movie.data.id;
            props.attemptEditMovie(movie);
          },
        });
      } else {
        setConfirmDialog({
          open: true,
          title: "Are you sure ?",
          message: "Are you sure you want to create this movie ?",
          onConfirm: () => {
            props.attemptCreateMovie(movie);
          },
        });
      }
    },
    validate: (values) => {
      const errors = {};
      if (values.cover_image == null) {
        errors.cover_image = "please upload cover image.";
      }
      if (values.duration.length <= 0) {
        errors.duration = "please spacify duration.";
      }
      if (values.language.length <= 0) {
        errors.language = "language can't be empty. ";
      }
      if (values.release_date.length <= 0) {
        errors.release_date = "please spacify release date.";
      }
      if (values.summary.length <= 0) {
        errors.summary = "please spacify summary.";
      }
      if (values.title.length <= 0) {
        errors.title = "please spacify title.";
      }
      if (values.casts.length <= 0) {
        errors.casts = "please add atleast one cast.";
      }
      if (values.genres.length <= 0) {
        errors.genres = "please add atleast one genre.";
      }
      return errors;
    },
  });

  const addImage = () => {
    imgRef.current.click();
  };
  const onImageChange = (e) => {
    const file = e.target.files[0];

    formik.setValues({
      ...formik.values,
      cover_image: file,
    });
  };

  const handleGenreAdd = (e) => {
    formik.setValues({
      ...formik.values,
      genres: [...formik.values.genres, formik.values.genre],
      genre: "",
    });
  };
  const handleGenreRemove = (genre) => {
    const filtered = formik.values.genres.filter((_genre) => _genre !== genre);
    formik.setValues({
      ...formik.values,
      genres: filtered,
    });
  };
  const handleGenreChange = (e) => {
    formik.setValues({
      ...formik.values,
      genre: e.target.value,
    });
  };
  const handleCastSubmit = (e) => {
    formik.setValues({
      ...formik.values,
      casts: [...formik.values.casts, formik.values.cast],
      cast: "",
    });
  };
  const handleCastChange = (e) => {
    formik.setValues({
      ...formik.values,
      cast: e.target.value,
    });
  };
  const removeCast = (cast) => {
    const filtered = formik.values.casts.filter((_cast) => _cast !== cast);
    formik.setValues({
      ...formik.values,
      casts: filtered,
    });
  };
  const removeCover = () => {
    formik.setValues({
      ...formik.values,
      cover_image: null,
    });
  };

  return (
    <div>
      <Confirm
        confirmDialog={confirmDialog}
        setConfirmDialog={setConfirmDialog}
      />
      {/* load movie on edit mode  */}
      <Dialog open={props.movie.loading}>
        <DialogContent>
          <CircularProgress disableShrink />
        </DialogContent>
      </Dialog>
      {/* edit movie */}

      <Dialog open={props.editedMovie.loading}>
        <DialogContent>
          <CircularProgress disableShrink />
        </DialogContent>
      </Dialog>
      <Snackbar
        autoHideDuration={2000}
        anchorOrigin={{ vertical: "top", horizontal: "right" }}
        open={props.editedMovie.success}
        onClose={() => props.resetEditMovie()}
      >
        <Alert severity="success">{props.editedMovie.success}</Alert>
      </Snackbar>
      <Snackbar
        autoHideDuration={2000}
        anchorOrigin={{ vertical: "top", horizontal: "right" }}
        open={props.editedMovie.error}
        onClose={() => props.resetEditMovie()}
      >
        <Alert severity="error">{props.editedMovie.error}</Alert>
      </Snackbar>

      {/* create movie */}
      <Dialog open={props.createMovie.loading}>
        <DialogContent>
          <CircularProgress disableShrink />
        </DialogContent>
      </Dialog>
      <Snackbar
        autoHideDuration={2000}
        anchorOrigin={{ vertical: "top", horizontal: "right" }}
        open={props.createMovie.success}
        onClose={() => props.resetCreateMovie()}
      >
        <Alert severity="success">movie created successfully !</Alert>
      </Snackbar>
      <Snackbar
        autoHideDuration={2000}
        anchorOrigin={{ vertical: "top", horizontal: "right" }}
        open={props.createMovie.error}
        onClose={() => props.resetCreateMovie()}
      >
        <Alert severity="error">{props.createMovie.error}</Alert>
      </Snackbar>
      <Box display="flex" justifyContent="flex-end">
        <Breadcrumbs>
          <p>
            <Link to="/movies" component={RouterLink}>
              movies
            </Link>
          </p>
          <p>{props.edit ? "edit movie" : "new movie"}</p>
        </Breadcrumbs>
      </Box>
      <Card variant="outlined" className={classes.card}>
        <form onSubmit={formik.handleSubmit}>
          <Box
            display="flex"
            justifyContent="flex-end"
            className={classes.formControl}
          >
            <Button
              variant="outlined"
              startIcon={<AddAPhotoIcon />}
              onClick={addImage}
            >
              cover
            </Button>
          </Box>
          <input
            type="file"
            style={{ display: "none" }}
            ref={imgRef}
            onChange={onImageChange}
          />
          <Typography color="error">{formik.errors.cover_image}</Typography>
          <Box display="flex" flexWrap="wrap" className={classes.formControl}>
            {formik.values.cover_image && (
              <ImagePreview
                imageCover={formik.values.cover_image}
                removeCover={removeCover}
              />
            )}
          </Box>
          <TextField
            margin="dense"
            label="title"
            variant="outlined"
            fullWidth
            className={classes.formControl}
            onChange={formik.handleChange}
            name="title"
            value={formik.values.title}
            error={formik.touched.title && formik.errors.title}
          />
          <Typography color="error">
            {formik.touched.title && formik.errors.title}
          </Typography>
          <Box mt={1} />
          <TextField
            margin="dense"
            label="date released"
            variant="outlined"
            type="date"
            fullWidth
            InputLabelProps={{ shrink: true }}
            className={classes.formControl}
            onChange={formik.handleChange}
            name="release_date"
            value={formik.values.release_date}
            error={formik.touched.release_date && formik.errors.release_date}
          />
          <Typography color="error">
            {formik.touched.release_date && formik.errors.release_date}
          </Typography>
          <Box mt={1} />
          <TextField
            margin="dense"
            label="duration in minutes"
            variant="outlined"
            fullWidth
            className={classes.formControl}
            onChange={formik.handleChange}
            name="duration"
            value={formik.values.duration}
            error={formik.touched.duration && formik.errors.duration}
          />
          <Typography color="error">
            {formik.touched.duration && formik.errors.duration}
          </Typography>
          <Box mt={1} />
          <TextField
            margin="dense"
            label="language"
            variant="outlined"
            fullWidth
            className={classes.formControl}
            onChange={formik.handleChange}
            name="language"
            value={formik.values.language}
            error={formik.touched.language && formik.errors.language}
          />
          <Typography color="error">
            {formik.touched.language && formik.errors.language}
          </Typography>
          <Box mt={1} />
          <TextField
            margin="dense"
            label="genres"
            variant="outlined"
            fullWidth
            value={formik.values.genre}
            onChange={handleGenreChange}
            error={formik.touched.genres && formik.errors.genres}
            InputProps={{
              endAdornment: (
                <IconButton variant="outlined" onClick={handleGenreAdd}>
                  <AddIcon />
                </IconButton>
              ),
            }}
          />
          <Typography color="error">
            {formik.touched.genres && formik.errors.genres}
          </Typography>

          <Box mt={1} mb={1}>
            {formik.values.genres.map((genre) => {
              return (
                <Chip
                  className={classes.chip}
                  label={genre}
                  onDelete={() => {
                    handleGenreRemove(genre);
                  }}
                  variant="default"
                />
              );
            })}
          </Box>
          <TextField
            margin="dense"
            label="summary"
            variant="outlined"
            minRows={5}
            multiline
            fullWidth
            className={classes.formControl}
            name="summary"
            value={formik.values.summary}
            onChange={formik.handleChange}
            error={formik.touched.summary && formik.errors.summary}
          />
          <Typography color="error">
            {formik.touched.summary && formik.errors.summary}
          </Typography>
          <Box mt={1} />
          <TextField
            error={formik.touched.casts && formik.errors.casts}
            label="add casts"
            variant="outlined"
            margin="dense"
            fullWidth
            value={formik.values.cast}
            onChange={handleCastChange}
            className={classes.formControl}
            InputProps={{
              endAdornment: (
                <IconButton variant="outlined" onClick={handleCastSubmit}>
                  <AddIcon />
                </IconButton>
              ),
            }}
          />
          <Typography color="error">
            {formik.touched.casts && formik.errors.casts}
          </Typography>
          <Box mt={1} mb={1}>
            {formik.values.casts.map((cast) => {
              return (
                <Chip
                  className={classes.chip}
                  label={cast}
                  onDelete={() => {
                    removeCast(cast);
                  }}
                  variant="default"
                />
              );
            })}
          </Box>
          <Box display="flex" justifyContent="flex-end">
            <FormControlLabel
              label="comming soon ?"
              control={
                <Switch
                  checked={formik.values.comming_soon}
                  name="comming_soon"
                  onChange={formik.handleChange}
                />
              }
            />
          </Box>
          <Box display="flex" justifyContent="flex-end" mt={3}>
            <Button
              variant="outlined"
              onClick={() => {
                history.goBack();
              }}
            >
              Cancel
            </Button>
            <Box mr={2} />
            <Button variant="contained" type="submit" color="primary">
              Submit
            </Button>
          </Box>
        </form>
      </Card>
    </div>
  );
};
const mapStateToProps = (state) => {
  return {
    createMovie: state.movie.createMovie,
    movie: state.movie.movie,
    editedMovie: state.movie.editedMovie,
  };
};
const mapDispatchToProps = (dispatch) => {
  return {
    attemptCreateMovie: (movie) => dispatch(movieActions.createMovie(movie)),
    resetCreateMovie: () => dispatch(movieActions.resetCreateMovie()),
    fetchMovie: (id) => dispatch(movieActions.fetchMovie(id)),
    attemptEditMovie: (movie) => dispatch(movieActions.editMovie(movie)),
    resetEditMovie: () => dispatch(movieActions.resetEditMovie()),
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(MovieForm);
