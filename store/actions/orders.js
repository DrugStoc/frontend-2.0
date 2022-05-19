import * as t from "../types";

export const ordersAction = (payload) => {
  return {
    type: t.FETCH_ORDERS,
    payload
  };
};
