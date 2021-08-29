import * as types from "./types";
const intitalState = {
  genres: {
    data: [],
    size: 0,
    loading: false,
    error: null,
  },
  deletedGenre: {
    loading: false,
    error: null,
    success: false,
  },
  createdGenre: {
    loading: false,
    error: null,
    success: false,
  },
};
const genreReducer = (state = intitalState, action) => {
  switch (action.type) {
    case types.FETCH_GENRES_SUCCESS: {
      const { genres, size } = action.payload;
      return {
        ...state,
        genres: {
          ...state.genres,
          data: genres,
          size: size,
          loading: false,
          error: null,
        },
      };
    }
    case types.DELETE_GENRES_SUCCESS: {
      const id = action.payload;
      const filteredGenres = state.genres.data.filter(
        (genre) => genre.id != id
      );
      return {
        ...state,
        genres: {
          ...state.genres,
          data: filteredGenres,
        },
        deletedGenre: {
          loading: false,
          error: null,
          success: true,
        },
      };
    }
    case types.DELETE_GENRES_RESET: {
      return {
        ...state,
        deletedGenre: {
          loading: false,
          error: null,
          success: false,
        },
      };
    }
    case types.CREATE_GENRE_SUCCESS: {
      return {
        ...state,
        createdGenre: {
          loading: false,
          error: null,
          success: true,
        },
      };
    }
    case types.CREATE_GENRE_RESET: {
        return {
          ...state,
          createdGenre: {
            loading: false,
            error: null,
            success: false,
          },
        };
      }
  }
  return state;
};

export default genreReducer;
