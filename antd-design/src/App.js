import React, { useState, useEffect, PureComponent } from "react";
import PropTypes from "prop-types";

// import stylesheets
import './App.css';
import 'antd/dist/antd.css';

// import logo
import logo from "./dtLogo.png";

// import components for routing
import {
  BrowserRouter as Router,
  Route,
  Switch,
  Link
} from "react-router-dom";

// import redux and actions
import { connect } from "react-redux"
import { login, logout } from "./actions/userActions";

import { auth } from "./firebase";

// Import Pages
import Home from "./pages/Home";
import CreateTicket from "./pages/CreateTicket";
import ViewTicket from "./pages/ViewTicket";
import Login from "./pages/Login";
import Archive from "./pages/Archive";
import TicketTable from "./pages/TicketTable";


// Import Icons
import { 
    HomeOutlined,
    EditOutlined,    
    ImportOutlined,
    ProjectOutlined,
    FileTextOutlined
} from "@ant-design/icons";

// Import Components
import { Layout, Menu } from "antd";
import LoginLoader from "./components/Loader/LoginLoader";
const { Sider, Content, Footer } = Layout;

function App({ 
  login, 
  logout, 
  users, 
  loadingUser
}) {

  /**
  * Once the App is rendered check if the user is 
  * authenticated with Firebase
  */
  useEffect(() => {
    auth.onAuthStateChanged(authUser => {
      if (authUser) {
        /**        
        * User logged in add the information through
        * the login action function
        */
        login({
          uuid: authUser.uid,
          email: authUser.email,
          displayName: authUser.displayName
        });
      } else {
        /**
        * User logged out
        * use the logout action function
        */
        logout();
      }
    })
  }, [])

  /**
  * Component state
  */
  const [collapsed, setCollapsed] = useState(false);

  /**
  * Helper function that toggles the sider collapse state
  */
  const handleCollapse = () => {
    setCollapsed(!collapsed);
  }

  return (  
    
    // If the user is logged in display the page Home page
    users === null ? (
      // If the user data is loading display the loginloader
      loadingUser ? (<LoginLoader />) : (<Login />)
    ) : (
    <Router>
      <Layout style={{minHeight:"100vh"}}>
        <Sider 
          style={{
            background: "white", 
            position: "fixed", 
            top: 0, 
            bottom: 0, 
            left: 0
          }} 
          collapsible 
          collapsed={collapsed} 
          onCollapse={handleCollapse}>
          <img
            className="side-logo"
            width={collapsed ? 80 : 200}
            src={logo} 
            alt="Logo"
          />
          <Menu 
            style={{height: "100vh"}} 
            defaultSelectedKeys={["0"]} 
            theme={"light"}
            mode="inline"
          > 
            <Menu.Item 
              key="1"
              icon={<HomeOutlined />}
            >
              <Link to="/">Home</Link>
            </Menu.Item>
            <Menu.Item
              key="2"
              icon={<EditOutlined />}
            >
              <Link to="/create">Create</Link>
            </Menu.Item>
            <Menu.Item
              key="3"
              icon={<FileTextOutlined />}
            >
              <Link to="/tickets">
                Tickets
              </Link>
            </Menu.Item>
            <Menu.Item 
              key="4" 
              icon={<ProjectOutlined />}
            >
              <Link to="/archive">
                Archive
              </Link>
            </Menu.Item>
            <Menu.Item 
              key="999"
              icon={<ImportOutlined />}
            >
              <Link onClick={() => auth.signOut()}>Logout</Link>
            </Menu.Item>            
          </Menu>
        </Sider>
        <Layout>
          <Content
            className="main-content"
            style={{
                paddingTop: 50,
                paddingLeft: collapsed ? 102 : 232,
                paddingRight: 32
            }}>
            <main>
              <Switch>
                <Route exact path="/">
                  <Home />
                </Route>
                <Route path="/tickets">
                  <TicketTable />
                </Route>
                <Route path="/create">
                  <CreateTicket />
                </Route>
	              <Route path="/archive">
                  <Archive />
	              </Route>
                <Route path="/ticket/:id" children={<ViewTicket />} />
              </Switch>
            </main>
          </Content>
          <Footer 
            style={{
              textAlign: "center", 
              background: "white"
            }}>
              Made By Ryan Harper &copy; 2020
            </Footer>
        </Layout> 
      </Layout>
    </Router>
    )
  );
}

const mapStateToProps = (state) => ({
  users: state.users.users,
  loadingUser: state.users.loading
})

App.propTypes = {
  login: PropTypes.func.isRequired,
  logout: PropTypes.func.isRequired,
  users: PropTypes.object.isRequired,
  loadingUser: PropTypes.bool.isRequired
}

export default connect(mapStateToProps, { login, logout })(App);
