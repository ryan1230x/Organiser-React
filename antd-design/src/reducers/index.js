import { combineReducers } from "redux";

// Import other reducers
import ticketReducer from "./ticketReducer";
import commentReducer from "./commentReducer";
import historyReducer from "./historyReducer";
import tagReducer from "./tagReducer";
import pageReducer from "./pageReducer";
import userReducer from "./userReducer";
import snippetReducer from "./snippetReducer";


export default combineReducers({
  // Reducers go here...
  tickets: ticketReducer,
  comments: commentReducer,
  histories: historyReducer,
  tags: tagReducer,
  pages: pageReducer,
  users: userReducer,
  snippets: snippetReducer
});
