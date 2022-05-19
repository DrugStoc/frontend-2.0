import * as t from "../types";

export const shippingAddressAction = (payload) => {
  return {
    type: t.FETCH_SHIPPING_ADDRESSES,
    payload
  };
};