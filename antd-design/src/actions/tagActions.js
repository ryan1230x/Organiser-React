import * as constant from "./constants";
import axios from "axios";

const BASE_URL = "http://localhost/2020-organiser/api/tag/";

/**
 * @description Get all tags
 * @method GET
 */
export const getAllTags = () => dispatch => {
  axios
    .get(`${BASE_URL}?status=all`)
    .then((res) =>
      dispatch({
        type: constant.GET_ALL_TAGS,
        payload: res.data.data
      })
    )
    .catch((error) => console.error(error));
};

/**
 * @description Get all tags for all open tickets
 * @method GET
 */
export const getAllTagsForOpenTickets = () => dispatch => {
  axios
    .get(`${BASE_URL}?status=open`)
    .then((res) =>
      dispatch({
        type: constant.GET_ALL_TAGS_FOR_OPEN_TICKETS,
        payload: res.data.data
      })
    )
    .catch((error) => console.error(error));
};

/**
 * @description Get all tags for all open tickets
 * @method GET
 */
export const getAllTagsForClosedTickets = () => dispatch => {
  axios
    .get(`${BASE_URL}?status=closed`)
    .then((res) =>
      dispatch({
        type: constant.GET_ALL_TAGS_CLOSED_TICKETS,
        payload: res.data.data
      })
    )
    .catch((error) => console.error(error));
};

/**
 * @description Get all tags for a ticket
 * @param {string} ticket id
 * @method GET
 */
export const getTags = (ticketId) => dispatch => {
  axios
    .get(`${BASE_URL}?ticket_id=${ticketId}`)
    .then((res) =>
      dispatch({
        type: constant.GET_TAGS,
      payload: res.data.data
      })
    )
    .catch((error) => console.error(error));
};

/**
 * @description add a new tag to a ticket
 * @param {object} tag Tag information
 * @method POST
 */
export const addTag = (tag) => dispatch => {
  const config = {
    header: {
      "Content-Type":"application/json"
    }
  };

  axios
    .post(BASE_URL, tag, config)
    .then((res) =>
      dispatch({
        type: constant.ADD_TAG,
      payload: res.data.data
      })
    )
    .catch((error) => console.error(error));
};

/**
 * @description Delete a tag
 * @method DELETE
 */
export const deleteTag = (id) => dispatch => {
  const config = {
    header: {
      "Content-Type": "application/json"
    }
  };

  axios
    .delete(`${BASE_URL}?id=${id}`, config)
    .then((res) =>
      dispatch({
        type: constant.DELETE_TAG,
        payload: id
      })
    )
    .catch((error) => console.error(error));
}
