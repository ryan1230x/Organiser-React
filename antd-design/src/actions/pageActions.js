import * as constant from "./constants";

export const setLightTheme = () => dispatch => {
  dispatch({
    type: constant.SET_LIGHT_THEME,
    payload: "light"
  });
};

export const setDarkTheme = () => dispatch => {
  dispatch({
    type: constant.SET_DARK_THEME,
    payload: "dark"
  })
}
