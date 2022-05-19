import * as t from "../types";

const initialState = {
  cart: null,
};

export const shoppingReducer = (state = initialState, action) => {
  switch (action.type) {
    case t.FETCH_CART_PRODUCTS:
      return {
        ...state,
        cart: action.payload,
      };
    default:
      return state;
  }
};
