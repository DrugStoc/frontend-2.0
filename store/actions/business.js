import * as t from "../types";

export const businessAction = (payload) => {
  return {
    type: t.FETCH_BUSINESS_DATA,
    payload
  };
};

export const teamAction = (payload) => {
  return {
    type: t.FETCH_TEAM_DATA,
    payload
  }
}

export const destroy = () => {
  return {
    type: t.DESTROY_BUSINESS_DATA
  }
}