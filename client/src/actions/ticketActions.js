import * as constant from "./constants";
import axios from "axios";

const BASE_URL = "http://localhost/2020-organiser/api/ticket/";

export const getTickets = () => dispatch => {
    axios
        .get(BASE_URL)
        .then(res => dispatch({
            type: constant.GET_TICKETS,
            payload: res.data.data
        }))
        .catch(error => console.error(error));
}

export const addTicket = (ticketData) => dispatch => {
    const config = {
        header: {
            "Content-Type": "application/json"
        }
    };
    axios
        .post(BASE_URL, ticketData, config)
        .then(res => dispatch({
            type: constant.ADD_TICKET,
            payload: res.data.data
        }))
        .catch(error => console.error(error));
}
/**
 * 
 * @param {string} ticketId 
 */
export const getTicketInformation = (ticketId) => dispatch => {
    axios
        .get(`${BASE_URL}?ticket_id=${ticketId}`)
        .then(res => dispatch({
            type: constant.GET_TICKET_INFORMATION,
            payload: res.data.data
        }))
        .catch(error => console.error(error));
}