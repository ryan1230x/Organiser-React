import * as constant from "./constant";
import axios from "axios";

const BASE_URL = "http://localhost/2020-organiser/api/history/";

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
