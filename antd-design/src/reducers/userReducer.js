import * as constant from "../actions/constants";

const intitalState = {
  users: null,
  loading: true
}

export default function(state = intitalState, action) {
  switch (action.type) {
    case constant.USER_LOGGED_IN:
      return {
        ...state,
        users: action.payload,
        loading: false
      }
    case constant.USER_LOGGED_OUT:
      return {
        ...state,
        users: null,
        loading: false
      }
    default:
      return state
  }
}