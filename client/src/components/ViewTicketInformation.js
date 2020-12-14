import React from "react";

// Import Components
import Heading from "./Heading";

function ViewTicketInformation(props) {
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
  } = props.ticketInformation;
  return (
    <section className="view-ticket-information">
      <Heading title={name} />
      <div className="row">
        {/* View ticket information left side start */}
        <div className="view-ticket-information-left col-lg-6 no-padding">
          <p>
            <strong>Address: </strong>
            {address}
          </p>
          <p>
            <strong>Landline Number: </strong>
            {landline}
          </p>
          <p>
            <strong>Contact Number: </strong>
            {contactNumber}
          </p>
          <p>
            <strong>Requested Date: </strong>
            {requestedDate}
          </p>
        </div>
        {/* View ticket information left side end */}
        {/* View ticket information right side start */}
        <div className="view-ticket-information-right col-lg-6 no-padding">
          <p>
            <strong>Status: </strong>
            {status}
          </p>
          <p>
            <strong>Network: </strong>
            {network}
          </p>
          <p>
            <strong>Client Package: </strong>
            {clientPackage}
          </p>
          <p>
            <strong>Portability: </strong>
            {portability}
          </p>
        </div>
        {/* View ticket information right side end */}
      </div>
    </section>
  );
}

export default ViewTicketInformation;
