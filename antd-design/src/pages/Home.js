import React from "react";

import {HomeOutlined} from "@ant-design/icons";
import {PageHeader, Breadcrumb} from "antd";

function Home() {
    return(
        <>
            {/* BreadCrumbs */}
            <Breadcrumb>
                <Breadcrumb.Item href="/">
                    <HomeOutlined />
                    <span>Home</span>
                </Breadcrumb.Item>
            </Breadcrumb>
            {/* Page Header */}
            <PageHeader
                title="Home Page"
                subTitle="Pending Installations"
            />
        </>
    )
}

export default Home;