import * as constant from "./constants";
import axios from "axios";

const BASE_URL = "/api/history/";

/**
 * @description Get all history for a ticket
 * @param {String} ticketId ticket id
 * @method GET
 */
export const getHistory = (ticketId) => (dispatch) => {
  axios
    .get(`${BASE_URL}?ticket_id=${ticketId}`)
    .then((res) =>
      dispatch({
        type: constant.GET_HISTORY,
        payload: res.data.data
      })
    )
    .catch((error) => console.error(error));
};

/**
 * @description add a history entry
 * @param {String} history history object
 * @method POST
 */
export const addHistory = (history) => (dispatch) => {
  const config = {
    header: {
      "Content-Type": "application/json"
    }
  };
  axios
    .post(BASE_URL, history, config)
    .then((res) =>
      dispatch({
        type: constant.ADD_HISTORY,
        payload: res.data.data
      })
    )
    .catch((error) => console.error(error));
};
