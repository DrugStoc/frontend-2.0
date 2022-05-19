import * as t from "../types";

export const profile = (payload) => {
  return {
    type: t.FETCH_USER_DATA,
    payload
  };
};