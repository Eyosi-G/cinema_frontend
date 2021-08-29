import * as types from "./types";
const initialState = {
  createMovie: {
    success: false,
    loading: false,
    error: null,
  },
  movies: {
    size: 0,
    data: [],
    loading: false,
    error: null,
  },
  movie: {
    data: null,
    loading: false,
    error: null,
  },
  deletedMovie: {
    success: false,
    loading: false,
    error: null,
  },
  editedMovie: {
    success: null,
    loading: false,
    error: null,
  },
  nowWatching: {
    movies: [],
    loading: false,
    error: null,
    size: 0,
  },
  commingSoon: {
    movies: [],
    loading: false,
    error: null,
    size: 0,
  },
  detail: {
    data: {
      schedules: [],
      genres: [],
      casts: [],
      title: "",
      release_date: "",
      summary: "",
      language: "",
      cover_image: "",
      duration: "",
    },
    loading: false,
    error: null,
  },
};
const movieReducer = (state = initialState, action) => {
  switch (action.type) {
    case types.CREATE_MOVIE_STARTED: {
      return {
        ...state,
        createMovie: {
          loading: true,
          success: false,
          error: null,
        },
      };
    }
    case types.CREATE_MOVIE_FAILURE: {
      return {
        ...state,
        createMovie: {
          loading: false,
          success: false,
          error: action.payload,
        },
      };
    }
    case types.CREATE_MOVIE_SUCCESS: {
      return {
        ...state,
        createMovie: {
          success: true,
          loading: false,
          error: null,
        },
      };
    }
    case types.CREATE_MOVIE_RESET: {
      return {
        ...state,
        createMovie: {
          success: false,
          loading: false,
          error: null,
        },
      };
    }
    case types.FETCH_MOVIES_STARTED: {
      return {
        ...state,
        movies: {
          ...state.movies,
          loading: true,
          error: null,
        },
      };
    }
    case types.FETCH_MOVIES_SUCCESS: {
      const { size, movies } = action.payload;
      return {
        ...state,
        movies: {
          ...state.movies,
          size: size,
          data: movies,
          loading: false,
          error: null,
        },
      };
    }
    case types.FETCH_MOVIES_FAILURE: {
      return {
        ...state,
        movies: {
          ...state.movies,
          loading: false,
          error: action.payload,
        },
      };
    }
    case types.FETCH_MOVIE_STARTED: {
      return {
        ...state,
        movie: {
          loading: true,
          error: null,
          data: null,
        },
      };
    }
    case types.FETCH_MOVIE_SUCCESS: {
      return {
        ...state,
        movie: {
          data: action.payload,
          loading: false,
          error: null,
        },
      };
    }
    case types.FETCH_MOVIE_FAILURE: {
      return {
        ...state,
        movie: {
          error: action.payload,
          loading: false,
          data: null,
        },
      };
    }
    case types.DELETE_MOVIE_SUCCESS: {
      const id = action.payload;
      const filtered = state.movies.data.filter((movie) => movie.id !== id);
      return {
        ...state,
        movies: {
          size: state.movies.size - 1,
          data: filtered,
          loading: false,
          error: null,
        },
        deletedMovie: {
          error: null,
          loading: false,
          success: true,
        },
      };
    }
    case types.DELETE_MOVIE_RESET: {
      return {
        ...state,
        deletedMovie: {
          error: null,
          loading: false,
          success: false,
        },
      };
    }
    case types.DELETE_MOVIE_FAILURE: {
      return {
        ...state,
        deletedMovie: {
          error: action.payload,
          loading: false,
          success: false,
        },
      };
    }
    case types.EDIT_MOVIE_STARED: {
      return {
        ...state,
        editedMovie: {
          error: null,
          loading: true,
          success: null,
        },
      };
    }
    case types.EDIT_MOVIE_SUCCESS: {
      return {
        ...state,
        editedMovie: {
          error: null,
          loading: false,
          success: action.payload,
        },
      };
    }
    case types.EDIT_MOVIE_FAILURE: {
      return {
        ...state,
        editedMovie: {
          error: action.payload,
          loading: false,
          success: null,
        },
      };
    }
    case types.EDIT_MOVIE_RESET: {
      return {
        ...state,
        editedMovie: {
          error: null,
          loading: false,
          success: null,
        },
      };
    }
    case types.FETCH_NOW_WATCHING_SUCCESS: {
      const { movies, count } = action.payload;
      const updatedMovies = [...state.nowWatching.movies, ...movies];
      return {
        ...state,
        nowWatching: {
          movies: updatedMovies,
          loading: false,
          error: null,
          size: count,
        },
      };
    }
    case types.FETCH_NOW_WATCHING_LOADING: {
      return {
        ...state,
        nowWatching: {
          movies: state.nowWatching.movies,
          loading: true,
          error: null,
          size: state.nowWatching.size,
        },
      };
    }
    case types.FETCH_NOW_WATCHING_FAILURE: {
      return {
        ...state,
        nowWatching: {
          movies: [],
          loading: false,
          error: action.payload,
          size: 0,
        },
      };
    }
    case types.FETCH_NOW_WATCHING_RESET: {
      return {
        ...state,
        nowWatching: {
          movies: [],
          loading: false,
          error: null,
          size: 0,
        },
      };
    }
    case types.MOVIE_DETAIL_LOADING: {
      return {
        ...state,
        detail: {
          ...state.detail,
          loading: true,
          error: null,
        },
      };
    }
    case types.MOVIE_DETAIL_SUCCESS: {
      return {
        ...state,
        detail: {
          data: action.payload,
          loading: false,
          error: null,
        },
      };
    }
    case types.MOVIE_DETAIL_FAILURE: {
      return {
        ...state,
        detail: {
          data: state.detail.data,
          loading: false,
          error: action.payload,
        },
      };
    }

    case types.FETCH_COMMING_SOON_SUCCESS: {
      const { movies, count } = action.payload;
      const updatedMovies = [...state.commingSoon.movies, ...movies];
      return {
        ...state,
        commingSoon: {
          movies: updatedMovies,
          loading: false,
          error: null,
          size: count,
        },
      };
    }
    case types.FETCH_COMMING_SOON_LOADING: {
      return {
        ...state,
        commingSoon: {
          movies: state.commingSoon.movies,
          loading: true,
          error: null,
          size: state.commingSoon.size,
        },
      };
    }
    case types.FETCH_COMMING_SOON_FAILURE: {
      return {
        ...state,
        commingSoon: {
          movies: [],
          loading: false,
          error: action.payload,
          size: 0,
        },
      };
    }
    case types.FETCH_COMMING_SOON_RESET: {
      return {
        ...state,
        commingSoon: {
          movies: [],
          loading: false,
          error: null,
          size: 0,
        },
      };
    }
  }
  return state;
};

export default movieReducer;
