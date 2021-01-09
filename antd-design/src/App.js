import './App.css';
import 'antd/dist/antd.css';

import React, { useState } from "react";
import {
  BrowserRouter as Router,
  Route,
  Switch,
  Link
} from "react-router-dom";
import { Provider } from "react-redux"
import store from "./store";

// Import Pages
import Home from "./pages/Home";
import CreateTicket from "./pages/CreateTicket";
import ViewTicket from "./pages/ViewTicket";

// Import Icons
import { 
    HomeOutlined,
    EditOutlined,
    BorderOutlined
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


function App() {

  const [collapsed, setCollapsed] = useState(false);

  const handleCollapse = () => {
    setCollapsed(!collapsed);
  }
  return (
    <Provider store={store}>
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
    </Provider>
  );
}

export default App;
