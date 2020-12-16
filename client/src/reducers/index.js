import { combineReducers } from "redux";

// Import other reducers
import ticketReducer from "./ticketReducer";
import commentReducer from "./commentReducer";
import historyReducer from "./historyReducer";

export default combineReducers({
  // Reducers go here...
  tickets: ticketReducer,
  comments: commentReducer,
  histories: historyReducer
});
