import * as t from "../types";

const initialState = {
  wallet: null,
  transaction: null,
};

export const transactionReducer = (state = initialState, action) => {
  switch (action.type) {
    case t.FETCH_ACCOUNT_BALANCE:
      return {
        ...state,
        wallet: action.payload,
      };
    case t.FETCH_ACCOUNT_TRANSACTIONS:
      return {
        ...state,
        transaction: action.payload,
      };
    default:
      return state;
  }
};
