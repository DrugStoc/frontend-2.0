import * as t from "../types";

const initialState = {
  shipping: null,
};

export const shippingAddressReducer = (state = initialState, action) => {
  switch (action.type) {
    case t.FETCH_SHIPPING_ADDRESSES:
      return {
        ...state,
        shipping: action.payload,
      };
    default:
      return state;
  }
};
