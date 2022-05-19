import * as t from "../types";

let initialState = {
  category: null,
  manufacturer: null
};

export const categoryReducer = (state = initialState, action) => {
  switch (action.type) {
    case t.FETCH_PRODUCT_CATEGORY:
      return {
        ...state,
        category: action.payload,
      };
    case t.FETCH_PRODUCT_MANUFACTURER:
      return {
        ...state,
        manufacturer: action.payload,
      };
    default:
      return state;
  }
};
