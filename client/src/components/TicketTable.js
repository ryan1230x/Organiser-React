import React from "react";
import { Link } from "react-router-dom";

// Import Components
import Heading from "./Heading";

/**
 * This function component handles the head of
 * the table
 */
function TicketTableHead() {
  const TicketTableHeaders = [
    "Name",
    "Address",
    "Package",
    "Network",
    "Status",
    "Action"
  ];

  const width = 100 / TicketTableHeaders.length;

  return (
    <thead>
      <tr>
        {TicketTableHeaders.map((item, index) => (
          <th style={{width: width + "%"}} key={index}>{item}</th>
        ))}
      </tr>
    </thead>
  );
}

/**
 * This functional component handles the body
 * of the Ticket table
 */
function TicketTableBody(props) {
  const {tickets} = props.tickets
  return (
    <tbody>
      {tickets.map((ticket, index) => (
        <tr key={index}>
          <td>{ticket.name}</td>
          <td>{ticket.address}</td>
          <td>{ticket.clientPackage}</td>
          <td>{ticket.network}</td>
          <td>{ticket.status}</td>
          <td className="d-flex">
            <Link
              className="btn btn-primary btn-icon"
              to={`/ticket/${ticket.ticketId}`}
            >
              <ion-icon name="eye"></ion-icon>
              <span className="ml-1">Open</span>
            </Link>
          </td>
        </tr>
      ))}
    </tbody>
  );
}

/**
 * The Whole TicketTable
 */
function TicketTable(props) {
  const { tickets} = props;  
  return (
    <section>
      <Heading
        title="Pending Installations"
        subtitle={`Currently ${tickets.tickets.length} Open`}
      />
      <table className="ticket-table striped">
        <TicketTableHead />
        <TicketTableBody tickets={tickets} />
      </table>
    </section>
  );
}

export default TicketTable;
