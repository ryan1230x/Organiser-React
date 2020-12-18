import * as constant from "./constants";
import axios from "axios";

const BASE_URL = "http://localhost/2020-organiser/api/history/";

/**
 * @description Get all history for a ticket
 * @param {String} Ticket id
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
