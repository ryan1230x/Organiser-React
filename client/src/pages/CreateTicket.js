import React from "react";

// import components
import Heading from "../components/Heading";
import CreateTicketForm from "../components/CreateTicketForm";

function CreateTicket() {
    return (
        <main className="container">
            <Heading title="Create a Ticket" subtitle="Fill the form below to create a ticket" />
            <CreateTicketForm />
        </main>
    )
}

export default CreateTicket;