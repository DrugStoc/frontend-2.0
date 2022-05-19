import * as t from "../types";

let initialState = {
  orders: null,
};

export const ordersReducer = (state = initialState, action) => {
  switch (action.type) {
    case t.FETCH_ORDERS:
      return {
        ...state,
        orders: action.payload,
      };
    default:
      return state;
  }
};
