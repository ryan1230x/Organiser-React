import * as constant from "../actions/constants";

const initialState = {
  comments: [],
  loading: true
};

export default function (state = initialState, action) {
  switch (action.type) {
    case constant.GET_COMMENTS:
      return {
        ...state,
        comments: action.payload,
        loading: false
      };
    case constant.ADD_COMMENT:
      return {
        ...state,
        comments: [action.payload, ...state.comments],
        loading: false
      };
    default:
      return state;
  }
}
