import * as constant from "./constants";
import axios from "axios";

const BASE_URL = "http://localhost/2020-organiser/api/tag/";

/**
 * @description Get all tags
 * @method GET
 */
export const getAllTags = () => dispatch => {
  axios
    .get(BASE_URL)
	.then((res) =>
	  dispatch({
	    type: constant.GET_ALL_TAGS,
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
}

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
export const deleteTag = () => dispatch => {
  const config = {
    header: {
      "Content-Type": "application/json"
    }
  };

  axios
    .delete(BASE_URL, config)
		.then((res) =>
	  	dispatch({
	    	type: constant.DELETE_TAG,
				payload: res.data.data
	  	})
		)
		.catch((error) => console.error(error));
}
