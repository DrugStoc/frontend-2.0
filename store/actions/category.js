import * as t from "../types";

export const categoryAction = (payload) => {
  return {
    type: t.FETCH_PRODUCT_CATEGORY,
    payload
  };
};

export const manufacturerAction = (payload) => {
  return {
    type: t.FETCH_PRODUCT_MANUFACTURER,
    payload
  };
};