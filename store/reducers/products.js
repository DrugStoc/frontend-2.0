import * as t from "../types";

let initialState = {
  popular_products: null,
  category_products: null,
  search_result: null
};

export const productsReducer = (state = initialState, action) => {
  switch (action.type) {
    case t.FETCH_POPULAR_PRODUCTS:
      return {
        ...state,
        popular_products: action.payload,
      };
    case t.FETCH_CATEGORY_PRODUCTS:
      return {
        ...state,
        category_products: action.payload,
      };
    case t.FETCH_PRODUCT_SEARCH_RESULT:
      return {
        ...state,
        search_result: action.payload,
      };
    default:
      return state;
  }
};
