import * as types from "./types";
const initialState = {
  newCinema: {
    loading: false,
    error: null,
    success: null,
  },
  cinemasList: {
    size: 0,
    cinemas: [],
    loading: false,
    error: null,
  },
  singleCinema: {
    data: null,
    loading: false,
    error: null,
  },
  deletedCinema: {
    success: null,
    error: null,
  },
  editedCinema: {
    loading: false,
    success: null,
    error: null,
  },
};
const cinemaReducer = (state = initialState, action) => {
  switch (action.type) {
    case types.CREATE_CINEMA_ATTEMPT: {
      return {
        ...state,
        newCinema: {
          loading: true,
          error: null,
          success: null,
        },
      };
    }
    case types.CREATE_CINEMA_SUCCESS: {
      return {
        ...state,
        newCinema: {
          loading: false,
          error: null,
          success: action.payload,
        },
      };
    }
    case types.CREATE_CINEMA_FAILURE: {
      return {
        ...state,
        newCinema: {
          loading: false,
          error: action.payload,
          success: null,
        },
      };
    }
    case types.CREATE_CINEMA_RESET: {
      return {
        ...state,
        newCinema: {
          loading: false,
          error: null,
          success: null,
        },
      };
    }
    case types.FETCH_CINEMAS_LOADING: {
      return {
        ...state,
        cinemasList: {
          size: 0,
          cinemas: [],
          loading: true,
          error: null,
        },
      };
    }
    case types.FETCH_CINEMAS_SUCCESS: {
      const { cinemas, size } = action.payload;
      return {
        ...state,
        cinemasList: {
          size: size,
          cinemas: cinemas,
          loading: false,
          error: null,
        },
      };
    }
    case types.FETCH_CINEMAS_FAILURE: {
      return {
        ...state,
        cinemasList: {
          size: 0,
          cinemas: [],
          loading: false,
          error: action.payload,
        },
      };
    }
    case types.DELETE_CINEMA_SUCCESS: {
      const id = action.payload;
      const filteredCinema = state.cinemasList.cinemas.filter(
        (cinema) => cinema.id != id
      );
      return {
        ...state,
        deletedCinema: {
          success: "cinema deleted successfully !",
          error: null,
        },
        cinemasList: {
          size: state.cinemasList.size - 1,
          cinemas: filteredCinema,
          loading: false,
          error: null,
        },
      };
    }
    case types.DELETE_CINEMA_FAILURE: {
      return {
        ...state,
        deletedCinema: {
          success: null,
          error: action.payload,
        },
      };
    }
    case types.DELETE_CINEMA_RESET: {
      return {
        ...state,
        deletedCinema: {
          success: null,
          error: null,
        },
      };
    }
    case types.FETCH_SINGLE_CINEMA_STARTED: {
      return {
        ...state,
        singleCinema: {
          data: null,
          loading: true,
          error: null,
        },
      };
    }
    case types.FETCH_SINGLE_CINEMA_SUCCESS: {
      return {
        ...state,
        singleCinema: {
          data: action.payload,
          loading: false,
          error: null,
        },
      };
    }
    case types.FETCH_SINGLE_CINEMA_FAILURE: {
      return {
        ...state,
        singleCinema: {
          data: null,
          loading: false,
          error: action.payload,
        },
      };
    }
    case types.FETCH_SINGLE_CINEMA_RESET: {
      return {
        ...state,
        singleCinema: {
          data: null,
          loading: false,
          error: null,
        },
      };
    }
    case types.EDIT_CINEMA_STARTED: {
      return {
        ...state,
        editedCinema: {
          loading: true,
          success: null,
          error: null,
        },
      };
    }
    case types.EDIT_CINEMA_SUCCESS: {
      return {
        ...state,
        editedCinema: {
          loading: false,
          success: action.payload,
          error: null,
        },
      };
    }
    case types.EDIT_CINEMA_FAILURE: {
      return {
        ...state,
        editedCinema: {
          loading: false,
          success: null,
          error: action.payload,
        },
      };
    }
    case types.EDIT_CINEMA_RESET: {
      return {
        ...state,
        editedCinema: {
          loading: false,
          success: null,
          error: null,
        },
      };
    }
  }
  return state;
};
export default cinemaReducer;
