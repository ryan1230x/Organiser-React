import * as constant from "../actions/constants";

const initialState = {
  theme: "light",
  loading: true,
};

export default function(state = initialState, action) {
  switch (action.type) {
      case constant.SET_LIGHT_THEME:
        return {
          ...state,
          theme: "light"
        }
      case constant.SET_DARK_THEME:
          return {
            ...state,
            theme: "dark"
          }
    default:
      return state;
  }
}
