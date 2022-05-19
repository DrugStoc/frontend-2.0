import * as t from "../types";

export const balanceAction = (payload) => {
  return {
    type: t.FETCH_ACCOUNT_BALANCE,
    payload
  };
};

export const transactionsAction = (payload) => {
  return {
    type: t.FETCH_ACCOUNT_TRANSACTIONS,
    payload
  };
};