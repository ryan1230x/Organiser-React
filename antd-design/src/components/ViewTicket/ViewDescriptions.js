import React from "react";

// Import Components
import { Descriptions } from "antd";

function ViewDescriptions({ticketInformation}) {
  const {
    name,
    address,
    landline,
    contactNumber,
    requestedDate,
    status,
    clientPackage,
    network,
    portability
  } = ticketInformation;
  return(
    <Descriptions style={{marginBottom: 32}}>
      <Descriptions.Item labelStyle={{fontWeight: "bold"}} label="Name">{name}</Descriptions.Item>
      <Descriptions.Item labelStyle={{fontWeight: "bold"}} label="Address">{address}</Descriptions.Item>
      <Descriptions.Item labelStyle={{fontWeight: "bold"}} label="Landline">{landline}</Descriptions.Item>
      <Descriptions.Item labelStyle={{fontWeight: "bold"}} label="Contact Number">
        {contactNumber}
      </Descriptions.Item>
      <Descriptions.Item labelStyle={{fontWeight: "bold"}} label="Requested Date">
        {requestedDate}
      </Descriptions.Item>
      <Descriptions.Item labelStyle={{fontWeight: "bold"}} label="Status">{status}</Descriptions.Item>
      <Descriptions.Item labelStyle={{fontWeight: "bold"}} label="Network">{network}</Descriptions.Item>
      <Descriptions.Item labelStyle={{fontWeight: "bold"}} label="Client Package">
        {clientPackage}
      </Descriptions.Item>
      <Descriptions.Item labelStyle={{fontWeight: "bold"}} label="Portability">
        {portability}
      </Descriptions.Item>
    </Descriptions>
  )
}

export default ViewDescriptions;