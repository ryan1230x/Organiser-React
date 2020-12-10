import React, { useEffect, useState } from "react";
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

    return(
        <thead>
            <tr>
                {TicketTableHeaders.map((item, index) => (
                    <th key={index}>{item}</th>
                ))}
            </tr>
        </thead>
    )
}

/**
 * This functional component handles the body
 * of the Ticket table
 */
function TicketTableBody(props) {

    return(
        <tbody>
            {props.tickets.map((ticket, index) => (
                <tr key={index}>
                    <td>{ticket.name}</td>
                    <td>{ticket.address}</td>
                    <td>{ticket.package}</td>
                    <td>{ticket.network}</td>
                    <td>{ticket.status}</td>
                    <td className="d-flex">
                        <Link className="btn btn-primary d-flex align-items-center" to={`/ticket/${ticket.ticketId}`}>
                            <ion-icon name="eye"></ion-icon>
                            <span className="ml-1">Open</span>
                        </Link>
                    </td>
                </tr>
            ))}
        </tbody>
    )
}

/**
 * The Whole TicketTable
 */
function TicketTable() {

    const[tickets, setTicket] = useState([]);

    useEffect(() => {
        fetch("http://localhost/2020-organiser/api/ticket/")
            .then(res => res.json())
            .then(data => setTicket(data.data));
    }, []);
    
    return(
        <section>
            <Heading title="Pending Installations" subtitle={`Currently ${tickets.length} Open`} />
            <table className="ticket-table striped">
                <TicketTableHead />
                <TicketTableBody tickets={tickets} />
            </table>
        </section>
    )

    
}

export default TicketTable;