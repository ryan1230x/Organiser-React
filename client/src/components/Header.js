import React from "react";
import { Link } from "react-router-dom";

class Header extends React.Component {
    
    render() {
        return(
            <header className="d-flex align-items-center">
                <div className="d-flex align-items-center">
                    <Link to="/">
                        <img 
                            width="125px"
                            src="https://direct-telecom.es/wp-content/uploads/2014/08/dt.png" 
                            className="img-fluid"
                        />
                    </Link>
                </div>
                <div className="navbar-nav d-flex">
                    <ul className="d-flex">
                        <li className="nav-item">
                            <Link className="nav-link" to="/">Home</Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link" to="/history">History</Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link" to="/create">Create Ticket</Link>
                        </li>
                    </ul>
                    <form className="d-flex align-items-center ml-auto">
                        <div className="d-flex" style={{position:"relative", left:30}}>
                            <ion-icon style={{fontSize: "1.4rem"}} name="search"></ion-icon>
                        </div>
                        <input 
                            className="form-inline" 
                            type="text" 
                            placeholder="Search..." 
                        />
                    </form>
                </div>    
            </header>
        )
    }
}

export default Header;