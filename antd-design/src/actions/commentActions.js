import * as constant from "./constants";
import axios from "axios";

const BASE_URL = "http://localhost/2020-organiser/api/comment/";

/**
 * @description Get all the comments for a single ticket
 * @param {string} ticketId ticket id
 * @method GET
 */
export const getComments = (ticketId) => (dispatch) => {
  axios
    .get(`${BASE_URL}?ticket_id=${ticketId}`)
    .then((res) =>
      dispatch({
        type: constant.GET_COMMENTS,
        payload: res.data.data
      })
    )
    .catch((error) => console.error(error));
};

/**
 * @description Add a comment to a ticket
 * @param {Object} comment commment object
 * @param {string} ticketId ticket id
 * @method POST
 */
export const addComment = (comment, ticketId) => (dispatch) => {
  const config = {
    header: {
      "Content-Type": "application/json"
    }
  };
  axios
    .post(`${BASE_URL}?ticket_id=${ticketId}`, comment, config)
    .then((res) =>
      dispatch({
        type: constant.ADD_COMMENT,
        payload: res.data.data
      })
    )
    .catch((error) => console.error(error));
};
