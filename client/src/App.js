// Import stylesheets
import "./css/App.css";

// Import dependencies
import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

// Import Components
import Header from "./components/Header";

// Import Pages
import Home from "./pages/Home";
import CreateTicket from "./pages/CreateTicket";
import ViewTicket from "./pages/ViewTicket";
import Search from "./pages/Search"

// Import redux
import {Provider} from "react-redux";
import store from "./store";


function App() {

  return (
    <Provider store={store}>
      <Router>

        <Header />
        
        <Switch>
          <Route path="/" exact>
            <Home />
          </Route>
          <Route path="/create">
            <CreateTicket />
          </Route>
          <Route path="/ticket/:id" children={<ViewTicket />} />
          <Route path="/search/:param" children={<Search />} />
        </Switch>
      </Router>
    </Provider>
  );
}

export default App;
