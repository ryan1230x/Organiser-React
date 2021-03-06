import * as constant from "../actions/constants";

const initialState = {
  histories: [],
  loading: true
};

export default function (state = initialState, action) {
  switch (action.type) {
    case constant.GET_HISTORY:
      return {
        ...state,
        histories: action.payload,
        loading: false
      };
    case constant.ADD_HISTORY:
      return {
        ...state,
        histories: [action.payload, ...state.histories],
        loading: false
      };
    default:
      return state;
  }
}
