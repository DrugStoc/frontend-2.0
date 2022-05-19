import * as t from "../types";

export const cartItemAction = (payload) => {
  return {
    type: t.FETCH_CART_PRODUCTS,
    payload
  };
};