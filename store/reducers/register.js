import * as t from "../types";

const initialState = {
  loading: false,
  response: "",
  error: [],
};

export const authenticationReducer = (state = initialState, action) => {
  switch (action.type) {
    case t.AUTHENTICATING_USER:
      return {
        ...state,
        loading: true,
      };
    case t.AUTHENTICATION_SUCCESS:
      return {
        ...state,
        loading: false,
        error: [],
      };
    case t.AUTHENTICATIONS_ERROR:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    default:
      return state;
  }
};
