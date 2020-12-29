import React, {useState} from "react";

import {Link} from "react-router-dom";

// Import Icons
import {HomeOutlined, EditOutlined} from "@ant-design/icons";

// Import Components
import {Layout, Menu} from "antd";
const {Sider, Content, Footer} = Layout;


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

function CustomLayout(props) {
    const [collapsed, setCollapsed] = useState(false);

    const handleCollapse = () => {
        setCollapsed(!collapsed);
    }

    return(
        <Layout style={{minHeight:"100vh"}}>
            <Sider collapsible collapsed={collapsed} onCollapse={handleCollapse}>
                <img 
                    src="" 
                    alt="Logo"
                 />
                <Menu theme="dark" defaultSelectedKeys={["1"]} mode="inline">
                    {menuItems.map((item, index) => (
                        <Menu.Item key={index} icon={item.icon}>
                            <Link to={item.to}>{item.value}</Link>
                        </Menu.Item>
                    ))}
                </Menu>
            </Sider>
            <Layout>
                <Content style={{margin:"0 16px", paddingTop: 50}}>
                    <main>{props.children}</main>
                </Content>
                <Footer>Made By Ryan Harper &copy; 2020</Footer>
            </Layout> 
        </Layout>
    )
}

export default CustomLayout;