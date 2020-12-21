import React, { useState } from "react";
import { Link } from "react-router-dom";

function Header() {
  const [param, setParam] = useState("");

  const onSubmit = (e) => {
    const inputNameAttr = e.target.lastChild.name;
    const queryParams = new URLSearchParams(window.location.search);
    const queryParamter = queryParams.get(inputNameAttr);
  }
  
  return (
    <header className="d-flex align-items-center">
      <div className="container d-flex">
        <div className="d-flex align-items-center">
          <Link to="/">
            <img
              width="100px"
              src="https://direct-telecom.es/wp-content/uploads/2014/08/dt.png"
              className="img-fluid"
              alt="logo"
            />
          </Link>
        </div>
        <div className="navbar-nav d-flex">
          <ul className="d-flex">
            <li className="nav-item">
              <Link className="nav-link" to="/">
                Home
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/history">
                History
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/create">
                Create Ticket
              </Link>
            </li>
          </ul>
          <form 
            method="get" 
            className="d-flex align-items-center ml-auto" 
            onSubmit={onSubmit}
            action="/search"
          >
            <div className="d-flex" style={{ position: "relative", left: 30 }}>
              <ion-icon 
                style={{ fontSize: "1.4rem", color:"white" }} 
                name="search">
              </ion-icon>
            </div>
            <input
              className="form-inline"
              type="text"
              placeholder="Search..."
              name="q"
              onChange={(e) => setParam(e.target.value)}
              value={param}
            />
          </form>
        </div>
      </div>
    </header>
  );
}

export default Header;
