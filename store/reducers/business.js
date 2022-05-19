import * as t from "../types";

let initialState = {
  business: null,
  team: null
};

export const businessReducer = (state = initialState, action) => {
  switch (action.type) {
    case t.FETCH_BUSINESS_DATA:
      return {
        ...state,
        business: action.payload,
      };
    case t.FETCH_TEAM_DATA:
      return {
        ...state, team: action.payload,
      }
    case t.DESTROY_BUSINESS_DATA:
      return {
        ...state,
        business: null,
        team: null
      };
    default:
      return state;
  }
};
