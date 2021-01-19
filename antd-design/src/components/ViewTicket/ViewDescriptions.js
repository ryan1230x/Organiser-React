import React from "react";

// Import Components
import { Descriptions } from "antd";

function ViewDescriptions({ ticketInformation }) {
  
  /**
   * Deconstruct all information from ticketInformation
   * that is being pass through via props
   */
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

  /**
   * Descriptions information
   */
  const descriptions = [
    {label: "Name", value: name},
    {label: "Address", value: address},
    {label: "Landline", value: landline},
    {label: "Contact Number", value: contactNumber},
    {label: "Requested Date", value: requestedDate},
    {label: "Status", value: status},
    {label: "Network", value: network},
    {label: "Client Package", value: clientPackage},
    {label: "Portability", value: portability},
  ];

  return(
    <Descriptions layout="vertical" style={{marginBottom: 32}}>
      {descriptions.map((description, index) => (
        <Descriptions.Item
          key={index}
          labelStyle={{fontWeight: "bold"}} 
          label={description.label}
        >
          {description.value}
        </Descriptions.Item>
      ))}
    </Descriptions>
  );
};

export default ViewDescriptions;