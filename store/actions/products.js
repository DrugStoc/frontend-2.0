import * as t from "../types";

export const popularProductsAction = (payload) => {
  return {
    type: t.FETCH_POPULAR_PRODUCTS,
    payload
  };
};
export const categoryProductsAction = (payload) => {
  return {
    type: t.FETCH_CATEGORY_PRODUCTS,
    payload
  };
};

export const searchProductsAction = (payload) => {
  return {
    type: t.FETCH_PRODUCT_SEARCH_RESULT,
    payload
  };
};