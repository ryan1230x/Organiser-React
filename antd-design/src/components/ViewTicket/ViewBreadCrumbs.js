import React from "react";

// import component for routing
import { Link } from "react-router-dom";

// Import Icons
import { HomeOutlined, EditOutlined } from '@ant-design/icons';

// Import components
import { Breadcrumb } from "antd"

function ViewBreadCrumbs({ticketInformation}) {
  /**
   * Deconstruct name from ticket information pass
   * through props
   */
  const { name, reference } = ticketInformation;
  
  return (
    <Breadcrumb>
      <Breadcrumb.Item>
        <Link to="/">
          <HomeOutlined />
          <span style={{marginLeft: 8}}>Home</span>
        </Link>
        </Breadcrumb.Item>
        <Breadcrumb.Item>
          <EditOutlined />
          <span style={{marginLeft: 8}}>{`${reference} ${name}`}</span>
      </Breadcrumb.Item>
    </Breadcrumb>
  )
}

export default ViewBreadCrumbs;