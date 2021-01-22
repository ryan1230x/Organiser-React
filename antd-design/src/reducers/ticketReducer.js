import * as constant from "../actions/constants";

const initialState = {
  tickets: [],
  ticketInformation: {},
  loading: true
};

export default function (state = initialState, action) {
  switch (action.type) {
    case constant.GET_OPEN_TICKETS:
      return {
        ...state,
        tickets: action.payload,
        loading: false
      };
    case constant.GET_CLOSED_TICKETS:
      return {
        ...state,
        tickets: action.payload,
        loading: false
      };
    case constant.GET_ALL_TICKETS:
      return {
        ...state,
	      tickets: action.payload,
	      loading: false
      };
    case constant.GET_TICKET_INFORMATION:
      return {
        ...state,
        ticketInformation: action.payload,
        loading: false
      };
    case constant.SEARCH_FOR_TICKET:
      return {
        ...state,
        tickets: action.payload,
        loading: false
      };
    case constant.CLOSE_TICKET:
      return {
        ...state,
        ticketInformation: action.payload,
        tickets: state.tickets.filter(ticket => ticket.ticketId !== action.payload.ticketId),
        loading: false
      };
    case constant.ADD_TICKET:
      return {
        ...state,
        tickets: [action.payload, ...state.tickets],
        loading: false
      };
    case constant.REOPEN_TICKET:
      return {
        ...state,
        ticketInformation: action.payload,
        loading: false
      }
    default:
      return state;
  }
}
