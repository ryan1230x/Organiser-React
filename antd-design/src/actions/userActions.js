import * as constant from "./constants";

export const login = (user) => dispatch => {
  dispatch({
    type: constant.USER_LOGGED_IN,
    payload: user
  });
};

export const logout = () => dispatch => {
  dispatch({
    type: constant.USER_LOGGED_OUT
  });
};