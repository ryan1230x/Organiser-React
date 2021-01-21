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
    case constant.DELETE_COMMENT:
      return {
        ...state,
        comments: state.comments.filter(comment => comment.commentId !== action.payload),
        loading: false
      }
    default:
      return state;
  }
}
