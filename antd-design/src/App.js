import React, { useState, useEffect } from "react";
import './App.css';
import 'antd/dist/antd.css';

import {
  BrowserRouter as Router,
  Route,
  Switch,
  Link
} from "react-router-dom";
import { connect } from "react-redux"
import { login, logout } from "./actions/userActions";

import { auth } from "./firebase";

// Import Pages
import Home from "./pages/Home";
import CreateTicket from "./pages/CreateTicket";
import ViewTicket from "./pages/ViewTicket";
import Login from "./pages/Login";

// Import Icons
import { 
    HomeOutlined,
    EditOutlined,
    BorderOutlined,
    ImportOutlined
} from "@ant-design/icons";

// Import Components
import { Layout, Menu } from "antd";
const { Sider, Content, Footer } = Layout;


// Menu Items
const menuItems = [
  {   
    to: "/",
    value: "Home",
    icon: <HomeOutlined />
  },
  {   
    to: "/create",
    value: "Create",
    icon: <EditOutlined />
  }
]

function App({ login, logout, users, loadingUser }) {

  /*
    https://www.youtube.com/watch?v=HF65cySUYao&ab_channel=CleverProgrammer
    time: 1:54:03
  */
  useEffect(() => {
    auth.onAuthStateChanged(authUser => {
      if (authUser) {
        // user logged in
        console.log(authUser)
        login({
          uuid: authUser.uid,
          photo: authUser.photoURL,
          email: authUser.email,
          displayName: authUser.displayName
        });
      } else {
        // user logged out
        logout();
      }
    })
  }, [])

  const [collapsed, setCollapsed] = useState(false);

  const handleCollapse = () => {
    setCollapsed(!collapsed);
  }
  return (
    users === null ? (
      loadingUser ? (
        "redirecting to home page..."
      ) : (
        <Login />
      )
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
            src="https://direct-telecom.es/wp-content/uploads/2014/08/dt.png" 
            alt="Logo"
          />
          <Menu 
            style={{height: "100vh"}} 
            defaultSelectedKeys={["0"]} 
            theme={"light"}
            mode="inline"
          >
            {menuItems.map((item, index) => (
              <Menu.Item 
                key={index} 
                icon={item.icon}
              >
                <Link to={item.to}>{item.value}</Link>
              </Menu.Item>
            ))}
            <Menu.Item 
              key="Layout"
              icon={<ImportOutlined />}
            >
              <Link onClick={() => auth.signOut()}>Logout</Link>
            </Menu.Item>
            {/*<Menu.Item 
              onClick={() => setTheme(!isLightTheme)} 
              icon={<BorderOutlined />}
            >
              {isLightTheme ? "Dark Theme" : "Light Theme" }
            </Menu.Item>*/}
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
                <Route path="/create">
                  <CreateTicket />
                </Route>
                <Route path="/ticket/:id" children={<ViewTicket />} />
              </Switch>
            </main>
          </Content>
          <Footer style={{textAlign: "center"}}>Made By Ryan Harper &copy; 2020</Footer>
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

export default connect(mapStateToProps, { login, logout })(App);
