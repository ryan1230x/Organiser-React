// Import stylesheets
import "./css/App.css";

// Import dependencies
import React from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";

// Import Components
import Header from "./components/Header";

// Import Pages
import Home from "./pages/Home";
import CreateTicket from "./pages/CreateTicket";

function App() {
  return (
    <Router>
      {/* Here are all the components that belong
          on all pages
       */}
      <Header />
      
      <Switch>
        <Route path="/" exact>
          <Home />
        </Route>
        <Route path="/create">
          <CreateTicket />
        </Route>
      </Switch>

    </Router>
  );
}


export default App;
