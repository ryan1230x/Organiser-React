import * as constant from "./constants";
import axios from "axios";

const BASE_URL = "http://localhost/2020-organiser/api/comment/";

export const getComments = (ticketId) => dispatch => {
    axios
        .get(`${BASE_URL}?ticket_id=${ticketId}`)
        .then(res => dispatch({
            type: constant.GET_COMMENTS,
            payload: res.data.data
        }))
        .catch(error => console.error(error));
};

export const addComment = (comment, ticketId) => dispatch => {
    const config = {
        header: {
            "Content-Type":"application/json"
        }
    };
    axios
        .post(`${BASE_URL}?ticket_id=${ticketId}`, comment, config)
        .then(res => dispatch({
            type: constant.ADD_COMMENT,
            payload: res.data.data
        }))
        .catch(error => console.error(error));
};