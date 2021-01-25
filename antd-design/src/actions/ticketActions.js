import * as constant from "./constants";
import axios from "axios";

const BASE_URL = "/api/ticket/";

/**
 * @description Get all tickets open and closed
 * @method GET
 */
export const getAllTickets = () => (dispatch) => {
  axios
    .get(`${BASE_URL}?status=all`)
    .then((res) =>
      dispatch({
        type: constant.GET_ALL_TICKETS,
	      payload: res.data.data
      })
    )
    .catch((error) => console.error(error));
};

/**
 * @description Get all open tickets
 * @method GET
 */
export const getOpenTickets = () => (dispatch) => {
  axios
    .get(`${BASE_URL}?status=open`)
    .then((res) =>
      dispatch({
        type: constant.GET_OPEN_TICKETS,
        payload: res.data.data
      })
    )
    .catch((error) => console.error(error));
};

/**
 * @description Get all closed tickets
 * @method GET
 */
export const getClosedTickets = () => (dispatch) => {
  axios
    .get(`${BASE_URL}?status=closed`)
    .then((res) =>
      dispatch({
        type: constant.GET_CLOSED_TICKETS,
        payload: res.data.data
      })
    )
    .catch((error) => console.error(error));
};

/**
 * @description Created a new ticket
 * @param {object} ticketData ticket data object
 * @method POST
 */
export const addTicket = (ticketData) => (dispatch) => {
  const config = {
    header: {
      "Content-Type": "application/json"
    }
  };
  axios
    .post(BASE_URL, ticketData, config)
    .then((res) =>
      dispatch({
        type: constant.ADD_TICKET,
        payload: res.data.data
      })
    )
    .catch((error) => console.error(error));
};

/**
 * @description Get all the ticket information for a ticket
 * @param {string} ticketId ticketId unique hash
 * @method GET
 */
export const getTicketInformation = (ticketId) => (dispatch) => {
  axios
    .get(`${BASE_URL}?ticket_id=${ticketId}`)
    .then((res) =>
      dispatch({
        type: constant.GET_TICKET_INFORMATION,
        payload: res.data.data
      })
    )
    .catch((error) => console.error(error));
};

/**
 * @description Update the ticket status to closed
 * @param {Object} newStatus ticket status in JSON format
 * @param {String} ticketId ticket id
 * @method PUT
 */
export const putTicketStatusToClosed = (newStatus, ticketId) => (dispatch) => {
  const config = {
    header: {
      "Content-Type": "application/json"
    }
  };
  axios
    .put(`${BASE_URL}?ticket_id=${ticketId}`, newStatus, config)
    .then((res) =>
      dispatch({
        type: constant.CLOSE_TICKET,
        payload: res.data.data
      })
    )
    .catch((error) => console.error(error));
};

/**
 * @description Reopen ticket, change the status from closed to open
 * @param {object} newStatus ticket status in JSON format
 * @param {string} ticketId ticket id
 * @method PUT
 */
export const putTicketStatusToOpen = (newStatus, ticketId) => dispatch => {
  const config = {
    header: {
      "Content-Type":"application/json"
    }
  };

  axios
    .put(`${BASE_URL}?ticket_id=${ticketId}`, newStatus, config)
    .then((res) =>
      dispatch({
        type: constant.REOPEN_TICKET,
        payload: res.data.data
      })
    )
    .catch((error) => console.error(error))
};


/**
 * @description search the database for tickets that match the query
 * @param {String} UrlParam the ticketId from the URL
 */
export const searchForTicket = (UrlParam) => dispatch => {
  axios
    .get(`${BASE_URL}?q=${UrlParam}`)
    .then((res) =>
      dispatch({
        type: constant.SEARCH_FOR_TICKET,
        payload: res.data.data
      })
    )
    .catch((error) => console.error(error));
};

