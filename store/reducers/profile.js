import * as t from "../types";

let initialState = {
    user: null
}

export const userReducer = (state = initialState, action) => {
    switch(action.type) {
        case t.FETCH_USER_DATA:
            return {
                ...state, user: action.payload
            }
        default:
            return state;
    }
}