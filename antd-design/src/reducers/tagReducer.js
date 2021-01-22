import * as constant from "../actions/constants";

const intitalState = {
  tags: [],
  ticketTags:[],
  loading: true,
}

export default function(state = intitalState, action) {
  switch (action.type) {
    case constant.GET_TAGS:
      return {
        ...state,
        ticketTags: action.payload,
        loading: false,
      };
    case constant.GET_ALL_TAGS:
      return {
        ...state,
        tags: action.payload,
        loading:false
      };
    case constant.GET_ALL_TAGS_FOR_OPEN_TICKETS:
      return {
        ...state,
        tags: action.payload,
        loading: false
      };
    case constant.GET_ALL_TAGS_CLOSED_TICKETS:
      return {
        ...state,
        tags: action.payload,
        loading: false
      };
    case constant.ADD_TAG:
      return {
        ...state,
        ticketTags: [action.payload, ...state.ticketTags],
        tags: [action.payload, ...state.tags],
        loading: false
      }
    case constant.DELETE_TAG:
      return {
        ...state,
        ticketTags: state.ticketTags.filter(tag => tag.tag_id !== action.payload),
        tags: state.tags.filter(tag => tag.tag_id !== action.payload),
        loading: false
      };
    default:
      return state
  }
}