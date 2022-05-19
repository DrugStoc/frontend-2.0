import * as t from "../types";

export const authenticate = () => {
  return {
    type: t.AUTHENTICATING_USER,
  };
};