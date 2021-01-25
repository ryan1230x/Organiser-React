import * as constant from "../actions/constants";

const initialState = {
  snippets:[],
  loading:true
};

export default function(state = initialState, action) {
  switch(action.type) {
    case constant.GET_ALL_SNIPPETS_FOR_USER:
      return {
        ...state,
        snippets: action.payload,
        loading: false
      };
    case constant.ADD_SNIPPET_FOR_USER:
      return {
        ...state,
        snippets:[action.payload, ...state.snippets],
        loading: false
      };
    case constant.DELETE_SNIPPET:
      return {
        ...state,
        snippets: state.snippets.filter(snippet => snippet.snippetId !== action.payload),
        loading: false
      };
    default:
      return state;
  }
}