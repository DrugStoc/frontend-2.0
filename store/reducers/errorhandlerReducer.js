import * as t from "../types";

let initialState = {
  loading: false,
  hasError: false,
  error: [],
};

export const errorhandlerReducer = (state = initialState, action) => {
  switch (action.type) {
    case t.HANDLE_FETCHING:
      return {
        ...state,
        loading: true,
      };
    case t.HANDLE_SUCCESS:
      return {
        ...state,
        loading: false,
      };
    case t.HANDLE_ERROR:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    default:
      return state;
  }
};
