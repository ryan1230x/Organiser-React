import React from "react";

function ViewTicketInformation() {
  return (
    <section className="view-ticket-information">
      {/* View ticket information left side start */}
      <div className="view-ticket-information-left">
        <div className="row">
          <div className="col-lg-6">
            <p>
              <strong>Address:</strong>
              --address goes here--
            </p>
            <p>
              <strong>Landline Number:</strong>
              --Landline Number goes here--
            </p>
            <p>
              <strong>Contact Number:</strong>
              --Contact Number goes here--
            </p>
            <p>
              <strong>Requested Date:</strong>
              --Requested Date goes here--
            </p>
          </div>
        </div>
      </div>
      {/* View ticket information left side end */}
      {/* View ticket information right side start */}
      <div className="view-ticket-information-right">
        <div className="row">
          <div className="col-lg-6">
            <p>
              <strong>Status:</strong>
              --Status goes here--
            </p>
            <p>
              <strong>Network:</strong>
              --Network goes here--
            </p>
            <p>
              <strong>Client Package:</strong>
              --Package goes here--
            </p>
            <p>
              <strong>Portability:</strong>
              --Portability goes here--
            </p>
          </div>
        </div>
      </div>
      {/* View ticket information right side end */}
    </section>
  );
}

export default ViewTicketInformation;
